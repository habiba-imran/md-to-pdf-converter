const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const sourceDir = path.join(projectRoot, 'frontend');
const outputDir = path.join(projectRoot, 'dist');
const apiBaseUrl = process.env.PUBLIC_API_BASE_URL || process.env.API_BASE_URL || 'http://localhost:3000';

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyDir(source, target) {
  ensureDir(target);
  const entries = fs.readdirSync(source, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      copyDir(sourcePath, targetPath);
      continue;
    }

    fs.copyFileSync(sourcePath, targetPath);
  }
}

ensureDir(outputDir);
copyDir(sourceDir, outputDir);

const configContents = `window.__APP_CONFIG__ = ${JSON.stringify({ apiBaseUrl }, null, 2)};\n`;
fs.writeFileSync(path.join(outputDir, 'config.js'), configContents, 'utf8');

console.log(`Built static frontend into ${outputDir}`);
console.log(`Configured apiBaseUrl=${apiBaseUrl}`);
