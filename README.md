# Markdown to PDF

This project now supports two ways to convert Markdown into PDF:

- a folder-based workflow for batch conversion
- a minimal frontend where users upload one or many Markdown files, choose a style, and download the PDFs

## Features

- Drag-and-drop multi-file Markdown upload UI
- Three selectable PDF themes: `Professional`, `Clean`, and `Compact`
- Visual style preview cards so users can compare themes before converting
- Guided customization controls for non-technical users, without exposing raw CSS
- Local Node server for reliable PDF generation
- Batch conversion from `md/` to `pdf/`

## Project structure

```text
.
|-- frontend/              # minimal web app
|-- styles/                # selectable PDF themes
|-- md/                    # batch input folder
|-- pdf/                   # batch output folder
|-- generate-pdf.ps1       # batch conversion script
|-- server.js              # local frontend + API server
|-- pdf-config.json        # shared PDF config
|-- package.json
```

## Requirements

- Node.js and npm
- Google Chrome or Microsoft Edge installed in the default Windows location

## Setup

```powershell
npm install
```

## Deployment-ready structure

- `frontend/` is the source for the static frontend
- `dist/` is the built frontend output for Vercel
- `server.js` is the backend API for Render
- `render.yaml` provides a starter Render blueprint
- `vercel.json` configures the Vercel static deployment

## Run the frontend

```powershell
npm start
```

Then open:

```text
http://localhost:3000
```

## Frontend workflow

1. Start the app with `npm start`
2. Drag and drop one or more `.md` files, or choose them manually
3. Select a style
4. Adjust optional customization controls like font, spacing, margins, colors, and table style
5. Click `Convert to PDF`
6. Downloads start automatically for each generated PDF

## Build the static frontend for Vercel

```powershell
$env:PUBLIC_API_BASE_URL="https://your-render-api.onrender.com"
npm run build:frontend
```

This creates a deployable static site in `dist/`.

## Deploy plan

### Frontend on Vercel

Set this environment variable in Vercel:

- `PUBLIC_API_BASE_URL`

Point it to your Render backend URL, for example:

```text
https://your-api-name.onrender.com
```

Vercel uses `vercel.json` with:

- build command: `npm run build:frontend`
- output directory: `dist`

### Backend on Render

Render can use the included `render.yaml`, or you can configure it manually.

Important environment variables for Render:

- `ALLOWED_ORIGINS`
  Example: `https://your-frontend.vercel.app`
- `PUPPETEER_NO_SANDBOX`
  Recommended value: `true`
- `PUPPETEER_EXECUTABLE_PATH`
  Optional. Only set this if you want to force a specific browser path.

The backend also exposes:

- `GET /healthz` for health checks
- `POST /api/convert` for PDF generation

## Local development versus deployment

- Local app: frontend and backend run together at `http://localhost:3000`
- Vercel deployment: serves the static frontend from `dist/`
- Render deployment: runs the PDF API and accepts cross-origin requests from Vercel

## Batch conversion workflow

If you want the original folder-based flow:

```powershell
npm run convert
```

The script converts every `.md` file inside `md/` and writes matching PDFs into `pdf/`.

Examples:

- `md/report.md` becomes `pdf/report.pdf`
- `md/notes.md` becomes `pdf/notes.pdf`

## Styles

- `Professional`: best for reports and polished business documents
- `Clean`: lighter editorial layout for docs and notes
- `Compact`: tighter spacing for longer technical content

You can edit these files to customize the output:

- `styles/professional.css`
- `styles/clean.css`
- `styles/compact.css`

## Notes

- Generated PDFs inside `pdf/` are ignored by Git
- Shared PDF options such as margins, header, and footer live in `pdf-config.json`
- The frontend currently returns the PDF directly instead of storing uploaded files on the server
