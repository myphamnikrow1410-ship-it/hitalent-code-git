# HiTalent — Recruitment Operations Management

A static, English-language case-study website (HTML, CSS and JavaScript). The original visual design and all existing case-study content are retained, with the requested presentation changes, a full ERD viewer and the final SRS PDF.

## Preview locally

Extract the ZIP and open `index.html`, or serve the extracted folder with:

```bash
python -m http.server 8000
```

Visit `http://localhost:8000`. No npm install, build, backend or environment variables are required.

## GitHub and GitHub Pages

1. Create a repository and upload all extracted files and folders to its root (do not upload only the ZIP).
2. For GitHub Pages, open **Settings → Pages**, select **Deploy from a branch**, then choose the branch and `/ (root)`.
3. Share the published Pages URL. All local assets use relative paths, including the ERD and SRS.

## Vercel

1. Create a project and import the GitHub repository.
2. Select the **Other** framework preset, root directory `./`, with no build command. Leave the output directory at its default (the repository root).
3. Deploy and share the generated Vercel URL.

## Included materials

- Original case study, research charts, interview and persona cards, and BPMN workflows.
- Full-file Figma UI design embed and original design link. Story Map and UI Mockups require an internet connection and the owner must allow **Anyone with the link → Can view** for public sharing.
- `assets/erd/ERD.drawio.html`: supplied two-page draw.io viewer (internet required for its native viewer script; a local SVG preview is included as a fallback).
- `assets/erd/HiTalent_ERD.drawio`: editable source extracted from the supplied draw.io HTML; the diagram data is unchanged.
- `assets/erd/erd-full.svg`: local vector preview derived from the selected source page, including entity names, attributes, relationships and cardinalities. Use the original draw.io viewer for the canonical layout.
- `assets/documents/HiTalent_SRS.pdf`: exact supplied 52-page SRS, viewable or downloadable directly from the website.

All interview images are illustrative; the male Tech Lead portrait is reused for the renamed interview card. This is a project showcase, not a live recruitment backend.
