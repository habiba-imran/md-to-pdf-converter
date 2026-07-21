[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$markdownDir = Join-Path $projectRoot "md"
$outputDir = Join-Path $projectRoot "pdf"
$cssPath = Join-Path $projectRoot "pdf-style.css"
$configPath = Join-Path $projectRoot "pdf-config.json"
$localCli = Join-Path $projectRoot "node_modules\.bin\md-to-pdf.cmd"

function Fail-Step {
  param([string]$Message)

  Write-Error $Message
  exit 1
}

function Get-ChromePath {
  $candidatePaths = @(
    "C:\Program Files\Google\Chrome\Application\chrome.exe",
    "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    "C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
  )

  foreach ($candidatePath in $candidatePaths) {
    if (Test-Path -LiteralPath $candidatePath) {
      return $candidatePath
    }
  }

  return $null
}

try {
  if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Fail-Step "Node.js is not available on PATH. Install Node.js and rerun this script."
  }

  if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Fail-Step "npm is not available on PATH. Install npm and rerun this script."
  }

  foreach ($requiredDirectory in @($markdownDir, $outputDir)) {
    if (-not (Test-Path -LiteralPath $requiredDirectory)) {
      New-Item -ItemType Directory -Path $requiredDirectory | Out-Null
    }
  }

  foreach ($requiredPath in @($cssPath, $configPath)) {
    if (-not (Test-Path -LiteralPath $requiredPath)) {
      Fail-Step "Required supporting file was not found: $requiredPath"
    }
  }

  if (-not (Test-Path -LiteralPath $localCli)) {
    Write-Host "Installing project dependencies..."
    $installArgs = @("install")
    $installProcess = Start-Process -FilePath "npm.cmd" -ArgumentList $installArgs -WorkingDirectory $projectRoot -NoNewWindow -Wait -PassThru
    if ($installProcess.ExitCode -ne 0 -or -not (Test-Path -LiteralPath $localCli)) {
      Fail-Step "Failed to install project dependencies."
    }
  }

  $markdownFiles = Get-ChildItem -Path $markdownDir -Filter "*.md" -File | Sort-Object Name
  if ($markdownFiles.Count -eq 0) {
    Fail-Step "No Markdown files were found in $markdownDir. Add one or more .md files and rerun the script."
  }

  $chromePath = Get-ChromePath
  if (-not $chromePath) {
    Fail-Step "Chrome or Edge was not found in a standard install location. Install one of them and rerun the script."
  }

  foreach ($markdownFile in $markdownFiles) {
    $outputPath = Join-Path $outputDir ($markdownFile.BaseName + ".pdf")

    if (Test-Path -LiteralPath $outputPath) {
      Remove-Item -LiteralPath $outputPath -Force
    }

    $fileConfig = Get-Content -LiteralPath $configPath -Raw | ConvertFrom-Json
    $fileConfig | Add-Member -MemberType NoteProperty -Name launch_options -Value ([pscustomobject]@{
      executablePath = $chromePath
    }) -Force
    $fileConfig | Add-Member -MemberType NoteProperty -Name dest -Value $outputPath -Force

    $tempConfigPath = Join-Path $env:TEMP ("md-to-pdf-config-" + [guid]::NewGuid().ToString() + ".json")
    try {
      $fileConfig | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $tempConfigPath -Encoding UTF8

      Write-Host "Generating PDF for $($markdownFile.Name)..."
      $convertArgs = @(
        $markdownFile.FullName,
        "--config-file",
        $tempConfigPath
      )
      $convertProcess = Start-Process -FilePath $localCli -ArgumentList $convertArgs -WorkingDirectory $projectRoot -NoNewWindow -Wait -PassThru
      if ($convertProcess.ExitCode -ne 0) {
        Fail-Step "md-to-pdf returned a non-zero exit code while converting $($markdownFile.Name)."
      }

      if (-not (Test-Path -LiteralPath $outputPath)) {
        Fail-Step "Conversion finished without creating the expected PDF file: $outputPath"
      }

      Write-Host "Created $outputPath"
    }
    finally {
      if (Test-Path -LiteralPath $tempConfigPath) {
        Remove-Item -LiteralPath $tempConfigPath -Force
      }
    }
  }

  Write-Host "PDF conversion completed successfully."
  exit 0
}
catch {
  Write-Error "PDF conversion failed: $($_.Exception.Message)"
  exit 1
}
