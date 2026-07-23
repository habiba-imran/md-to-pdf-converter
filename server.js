const fs = require('fs');
const http = require('http');
const path = require('path');
const { mdToPdf } = require('md-to-pdf');

const projectRoot = __dirname;
const frontendDir = path.join(projectRoot, 'frontend');
const configPath = path.join(projectRoot, 'pdf-config.json');
const stylesDir = path.join(projectRoot, 'styles');
const port = Number(process.env.PORT || 3000);
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim().replace(/\/+$/, ''))
  .filter(Boolean);

const styleOptions = {
  professional: path.join(stylesDir, 'professional.css'),
  clean: path.join(stylesDir, 'clean.css'),
  compact: path.join(stylesDir, 'compact.css'),
};

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
};

function getBrowserPath() {
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(payload));
}

function sanitizeFilename(filename) {
  const baseName = path.parse(filename || 'document.md').name || 'document';
  return baseName.replace(/[^a-z0-9-_]+/gi, '-').replace(/^-+|-+$/g, '') || 'document';
}

function loadPdfConfig(selectedStylePath, browserPath) {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  config.stylesheet = [selectedStylePath];
  config.launch_options = {};

  if (browserPath) {
    config.launch_options.executablePath = browserPath;
  }

  if (process.env.PUPPETEER_NO_SANDBOX === 'true' || process.env.RENDER === 'true') {
    config.launch_options.args = ['--no-sandbox', '--disable-setuid-sandbox'];
  }

  return config;
}

function applyCorsHeaders(request, response) {
  const requestOrigin = request.headers.origin;

  if (requestOrigin) {
    if (allowedOrigins.length === 0 || allowedOrigins.includes('*')) {
      response.setHeader('Access-Control-Allow-Origin', requestOrigin);
    } else if (allowedOrigins.includes(requestOrigin)) {
      response.setHeader('Access-Control-Allow-Origin', requestOrigin);
    }
  }

  response.setHeader('Vary', 'Origin');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function getCustomizations(payload) {
  const custom = payload && typeof payload.custom === 'object' && payload.custom ? payload.custom : {};

  return {
    fontFamily: typeof custom.fontFamily === 'string' ? custom.fontFamily : 'default',
    marginPreset: typeof custom.marginPreset === 'string' ? custom.marginPreset : 'normal',
    textTone: typeof custom.textTone === 'string' ? custom.textTone : 'dark',
    tableStyle: typeof custom.tableStyle === 'string' ? custom.tableStyle : 'bordered',
    titleSize: Number.isFinite(Number(custom.titleSize)) ? Number(custom.titleSize) : 26,
    bodySize: Number.isFinite(Number(custom.bodySize)) ? Number(custom.bodySize) : 10.5,
    lineHeight: Number.isFinite(Number(custom.lineHeight)) ? Number(custom.lineHeight) : 1.6,
    accentColor: typeof custom.accentColor === 'string' ? custom.accentColor : '#b8502d',
    showHeaderFooter: custom.showHeaderFooter !== false,
  };
}

function getMarginValues(preset) {
  if (preset === 'compact') {
    return { top: '12mm', right: '12mm', bottom: '14mm', left: '12mm' };
  }

  if (preset === 'wide') {
    return { top: '24mm', right: '20mm', bottom: '24mm', left: '20mm' };
  }

  return { top: '18mm', right: '16mm', bottom: '20mm', left: '16mm' };
}

function getFontStack(fontFamily) {
  if (fontFamily === 'modern') {
    return {
      body: '"Inter", "Segoe UI", sans-serif',
      heading: '"Inter", "Segoe UI", sans-serif',
      code: '"JetBrains Mono", "Courier New", monospace',
    };
  }

  if (fontFamily === 'editorial') {
    return {
      body: '"Source Serif 4", Georgia, serif',
      heading: '"Fraunces", Georgia, serif',
      code: '"Source Code Pro", "Courier New", monospace',
    };
  }

  if (fontFamily === 'technical') {
    return {
      body: '"IBM Plex Sans", "Segoe UI", sans-serif',
      heading: '"IBM Plex Sans", "Segoe UI", sans-serif',
      code: '"IBM Plex Mono", "Courier New", monospace',
    };
  }

  return {
    body: '',
    heading: '',
    code: '',
  };
}

function getToneColors(textTone) {
  if (textTone === 'soft') {
    return {
      text: '#4b4139',
      heading: '#2b231d',
      muted: '#6f6258',
    };
  }

  if (textTone === 'contrast') {
    return {
      text: '#111111',
      heading: '#000000',
      muted: '#333333',
    };
  }

  return {
    text: '#1f1a17',
    heading: '#18120f',
    muted: '#4a4039',
  };
}

function getTableCss(tableStyle) {
  if (tableStyle === 'minimal') {
    return `
      table { border-collapse: collapse !important; }
      th, td { border: none !important; border-bottom: 1px solid #d8d8d8 !important; background: transparent !important; }
      th { color: inherit !important; font-weight: 700 !important; }
    `;
  }

  if (tableStyle === 'shaded') {
    return `
      table { border-collapse: separate !important; border-spacing: 0 !important; }
      th { background: color-mix(in srgb, var(--accent-color) 14%, white) !important; color: var(--heading-color) !important; }
      td, th { border: 1px solid #d9d9d9 !important; }
      tbody tr:nth-child(even) td { background: #f7f7f7 !important; }
    `;
  }

  return `
    table { border-collapse: collapse !important; }
    th, td { border: 1px solid #d6d6d6 !important; }
    th { background: #f3f3f3 !important; color: var(--heading-color) !important; }
  `;
}

function buildCustomCss(customizations) {
  const fonts = getFontStack(customizations.fontFamily);
  const colors = getToneColors(customizations.textTone);

  const bodyFontCss = fonts.body ? `font-family: ${fonts.body} !important;` : '';
  const headingFontCss = fonts.heading ? `font-family: ${fonts.heading} !important;` : '';
  const codeFontCss = fonts.code ? `font-family: ${fonts.code} !important;` : '';

  return `
    :root {
      --accent-color: ${customizations.accentColor};
      --body-color: ${colors.text};
      --heading-color: ${colors.heading};
      --muted-color: ${colors.muted};
    }

    @page {
      margin: ${getMarginValues(customizations.marginPreset).top}
              ${getMarginValues(customizations.marginPreset).right}
              ${getMarginValues(customizations.marginPreset).bottom}
              ${getMarginValues(customizations.marginPreset).left};
    }

    body {
      ${bodyFontCss}
      font-size: ${customizations.bodySize}pt !important;
      line-height: ${customizations.lineHeight} !important;
      color: var(--body-color) !important;
    }

    p, li, blockquote, td, th {
      color: var(--body-color) !important;
      line-height: ${customizations.lineHeight} !important;
    }

    h1 {
      ${headingFontCss}
      font-size: ${customizations.titleSize}pt !important;
      color: var(--heading-color) !important;
      border-bottom-color: var(--accent-color) !important;
    }

    h2, h3, h4, h5, h6 {
      ${headingFontCss}
      color: var(--heading-color) !important;
    }

    h2, h3, blockquote, pre {
      border-left-color: var(--accent-color) !important;
    }

    a, blockquote strong {
      color: var(--accent-color) !important;
    }

    code, pre, tt {
      ${codeFontCss}
    }

    h1 + p,
    h1 + p + p,
    h1 + p + p + p {
      color: var(--muted-color) !important;
    }

    ${getTableCss(customizations.tableStyle)}
  `;
}

async function parseRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk.toString('utf8');
      if (body.length > 2 * 1024 * 1024) {
        reject(new Error('Request body is too large.'));
        request.destroy();
      }
    });

    request.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch (error) {
        reject(new Error('Invalid JSON payload.'));
      }
    });

    request.on('error', reject);
  });
}

async function handleConvert(request, response) {
  const browserPath = process.env.PUPPETEER_EXECUTABLE_PATH || getBrowserPath();

  let payload;
  try {
    payload = await parseRequestBody(request);
  } catch (error) {
    sendJson(response, 400, { error: error.message });
    return;
  }

  const filename = typeof payload.filename === 'string' ? payload.filename : 'document.md';
  const markdown = typeof payload.content === 'string' ? payload.content : '';
  const styleKey = typeof payload.style === 'string' ? payload.style : 'professional';
  const selectedStylePath = styleOptions[styleKey];
  const customizations = getCustomizations(payload);

  if (!markdown.trim()) {
    sendJson(response, 400, { error: 'Please upload a Markdown file with content.' });
    return;
  }

  if (!selectedStylePath) {
    sendJson(response, 400, { error: 'Selected style is not supported.' });
    return;
  }

  try {
    const pdfConfig = loadPdfConfig(selectedStylePath, browserPath);
    pdfConfig.css = buildCustomCss(customizations);
    pdfConfig.pdf_options = {
      ...pdfConfig.pdf_options,
      displayHeaderFooter: customizations.showHeaderFooter,
      margin: getMarginValues(customizations.marginPreset),
      headerTemplate: customizations.showHeaderFooter ? pdfConfig.pdf_options.headerTemplate : '<div></div>',
      footerTemplate: customizations.showHeaderFooter ? pdfConfig.pdf_options.footerTemplate : '<div></div>',
    };
    const result = await mdToPdf(
      { content: markdown },
      {
        ...pdfConfig,
        basedir: projectRoot,
        dest: null,
      }
    );

    if (!result || !result.content) {
      throw new Error('The PDF generator returned an empty result.');
    }

    const outputName = `${sanitizeFilename(filename)}.pdf`;
    response.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${outputName}"`,
    });
    response.end(result.content);
  } catch (error) {
    sendJson(response, 500, {
      error: error instanceof Error ? error.message : 'PDF conversion failed.',
    });
  }
}

function handleStatic(request, response) {
  const requestPath = request.url === '/' ? '/index.html' : request.url;
  const safePath = path.normalize(requestPath).replace(/^(\.\.[/\\])+/, '');
  const filePath = path.join(frontendDir, safePath);

  if (!filePath.startsWith(frontendDir)) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (error, fileBuffer) => {
    if (error) {
      response.writeHead(error.code === 'ENOENT' ? 404 : 500);
      response.end(error.code === 'ENOENT' ? 'Not found' : 'Server error');
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    response.writeHead(200, {
      'Content-Type': contentTypes[extension] || 'application/octet-stream',
    });
    response.end(fileBuffer);
  });
}

const server = http.createServer((request, response) => {
  if (!request.url) {
    response.writeHead(400);
    response.end('Bad request');
    return;
  }

  applyCorsHeaders(request, response);

  if (request.method === 'OPTIONS') {
    response.writeHead(204);
    response.end();
    return;
  }

  if (request.method === 'GET' && request.url === '/healthz') {
    sendJson(response, 200, { ok: true });
    return;
  }

  if (request.method === 'POST' && request.url === '/api/convert') {
    handleConvert(request, response);
    return;
  }

  if (request.method === 'GET') {
    handleStatic(request, response);
    return;
  }

  response.writeHead(405);
  response.end('Method not allowed');
});

server.listen(port, () => {
  console.log(`Markdown to PDF app running at http://localhost:${port}`);
});
