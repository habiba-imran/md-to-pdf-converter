# Markdown to PDF

This project converts Markdown files from the `md` folder into PDF files inside the `pdf` folder.

## How it works

1. Put one or more `.md` files in the `md` folder.
2. Run the conversion command.
3. Find the generated PDFs in the `pdf` folder.

## Project structure

```text
.
|-- md/                 # place your Markdown files here
|-- pdf/                # generated PDFs are written here
|-- generate-pdf.ps1    # conversion script
|-- pdf-config.json     # md-to-pdf configuration
|-- pdf-style.css       # PDF styling
|-- package.json
```

## Requirements

- Node.js and npm
- Google Chrome or Microsoft Edge installed in the default Windows location

## Setup

```powershell
npm install
```

## Convert Markdown to PDF

```powershell
npm run convert
```

The script will convert every `.md` file inside `md` and create matching PDFs inside `pdf`.

Example:

- `md/report.md` becomes `pdf/report.pdf`
- `md/notes.md` becomes `pdf/notes.pdf`

## Notes

- Keep your input Markdown files inside `md`.
- The generated PDF files in `pdf` are build output, so they are ignored by Git.
- You can customize the PDF look by editing `pdf-style.css`.
- You can customize page size, margins, header, and footer in `pdf-config.json`.

## Suggested GitHub flow

If you push this as a reusable project, the README should be enough for other people to:

1. Clone the repo
2. Run `npm install`
3. Drop their Markdown files into `md`
4. Run `npm run convert`
5. Collect finished PDFs from `pdf`

That’s a clean setup for GitHub and easy for anyone else to use.
