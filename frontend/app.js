const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const browseButton = document.getElementById('browseButton');
const selectedFile = document.getElementById('selectedFile');
const fileList = document.getElementById('fileList');
const convertButton = document.getElementById('convertButton');
const statusText = document.getElementById('statusText');
const fontFamily = document.getElementById('fontFamily');
const marginPreset = document.getElementById('marginPreset');
const textTone = document.getElementById('textTone');
const tableStyle = document.getElementById('tableStyle');
const titleSize = document.getElementById('titleSize');
const titleSizeValue = document.getElementById('titleSizeValue');
const bodySize = document.getElementById('bodySize');
const bodySizeValue = document.getElementById('bodySizeValue');
const lineHeight = document.getElementById('lineHeight');
const lineHeightValue = document.getElementById('lineHeightValue');
const accentColor = document.getElementById('accentColor');
const accentColorValue = document.getElementById('accentColorValue');
const showHeaderFooter = document.getElementById('showHeaderFooter');
const resetCustomizations = document.getElementById('resetCustomizations');
const appConfig = window.__APP_CONFIG__ || {};
const apiBaseUrl = (appConfig.apiBaseUrl || '').replace(/\/+$/, '');

let activeFiles = [];
const customizationDefaults = {
  fontFamily: 'default',
  marginPreset: 'normal',
  textTone: 'dark',
  tableStyle: 'bordered',
  titleSize: '26',
  bodySize: '10.5',
  lineHeight: '1.6',
  accentColor: '#b8502d',
  showHeaderFooter: true,
};

function setStatus(message, isError = false) {
  statusText.textContent = message;
  statusText.style.color = isError ? '#9f2d13' : '#6d6258';
}

function formatFileSize(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function renderFileList(files) {
  fileList.innerHTML = '';

  files.slice(0, 6).forEach((file) => {
    const item = document.createElement('div');
    item.className = 'file-item';
    item.innerHTML = `
      <span class="file-item-name">${file.name}</span>
      <span class="file-item-size">${formatFileSize(file.size)}</span>
    `;
    fileList.appendChild(item);
  });

  if (files.length > 6) {
    const extra = document.createElement('div');
    extra.className = 'file-item';
    extra.innerHTML = `<span class="file-item-name">+ ${files.length - 6} more file(s)</span>`;
    fileList.appendChild(extra);
  }
}

function setFiles(fileCollection) {
  activeFiles = Array.from(fileCollection || []).filter((file) => /\.md$/i.test(file.name));

  if (activeFiles.length === 0) {
    selectedFile.textContent = 'No files selected';
    fileList.innerHTML = '';
    setStatus('Choose one or more Markdown files to continue.', true);
    return;
  }

  selectedFile.textContent = `${activeFiles.length} file${activeFiles.length === 1 ? '' : 's'} selected`;
  renderFileList(activeFiles);
  setStatus('Files loaded. Choose a style and convert.');
}

function getSelectedStyle() {
  const checked = document.querySelector('input[name="style"]:checked');
  return checked ? checked.value : 'professional';
}

function getApiUrl(path) {
  if (!apiBaseUrl) {
    return path;
  }

  return `${apiBaseUrl}${path}`;
}

function syncCustomizationLabels() {
  titleSizeValue.textContent = `${titleSize.value} px`;
  bodySizeValue.textContent = `${bodySize.value} pt`;
  lineHeightValue.textContent = Number(lineHeight.value).toFixed(2);
  accentColorValue.textContent = accentColor.value.toLowerCase();
}

function getCustomizationSettings() {
  return {
    fontFamily: fontFamily.value,
    marginPreset: marginPreset.value,
    textTone: textTone.value,
    tableStyle: tableStyle.value,
    titleSize: Number(titleSize.value),
    bodySize: Number(bodySize.value),
    lineHeight: Number(lineHeight.value),
    accentColor: accentColor.value,
    showHeaderFooter: showHeaderFooter.checked,
  };
}

function resetCustomizationSettings() {
  fontFamily.value = customizationDefaults.fontFamily;
  marginPreset.value = customizationDefaults.marginPreset;
  textTone.value = customizationDefaults.textTone;
  tableStyle.value = customizationDefaults.tableStyle;
  titleSize.value = customizationDefaults.titleSize;
  bodySize.value = customizationDefaults.bodySize;
  lineHeight.value = customizationDefaults.lineHeight;
  accentColor.value = customizationDefaults.accentColor;
  showHeaderFooter.checked = customizationDefaults.showHeaderFooter;
  syncCustomizationLabels();
}

async function readFileContent(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Unable to read the selected file.'));
    reader.readAsText(file);
  });
}

async function convertFile() {
  if (activeFiles.length === 0) {
    setStatus('Choose at least one Markdown file first.', true);
    return;
  }

  convertButton.disabled = true;
  const style = getSelectedStyle();
  const custom = getCustomizationSettings();

  try {
    for (let index = 0; index < activeFiles.length; index += 1) {
      const file = activeFiles[index];
      setStatus(`Converting ${index + 1} of ${activeFiles.length}: ${file.name}`);

      const content = await readFileContent(file);
      const response = await fetch(getApiUrl('/api/convert'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: file.name,
          content,
          style,
          custom,
        }),
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}));
        throw new Error(errorPayload.error || `Conversion failed for ${file.name}.`);
      }

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      const baseName = file.name.replace(/\.md$/i, '') || 'document';

      downloadLink.href = downloadUrl;
      downloadLink.download = `${baseName}.pdf`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
    }

    setStatus(`Done. Downloaded ${activeFiles.length} PDF file${activeFiles.length === 1 ? '' : 's'}.`);
  } catch (error) {
    setStatus(error instanceof Error ? error.message : 'Something went wrong during conversion.', true);
  } finally {
    convertButton.disabled = false;
  }
}

dropzone.addEventListener('click', () => fileInput.click());
browseButton.addEventListener('click', (event) => {
  event.stopPropagation();
  fileInput.click();
});

fileInput.addEventListener('change', (event) => {
  setFiles(event.target.files);
});

dropzone.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropzone.classList.add('is-dragover');
});

dropzone.addEventListener('dragleave', () => {
  dropzone.classList.remove('is-dragover');
});

dropzone.addEventListener('drop', (event) => {
  event.preventDefault();
  dropzone.classList.remove('is-dragover');

  setFiles(event.dataTransfer.files);
});

convertButton.addEventListener('click', convertFile);

[titleSize, bodySize, lineHeight, accentColor].forEach((input) => {
  input.addEventListener('input', syncCustomizationLabels);
});

resetCustomizations.addEventListener('click', () => {
  resetCustomizationSettings();
  setStatus('Custom options reset to defaults.');
});

syncCustomizationLabels();
