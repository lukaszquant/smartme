# SmartMe -- Claude Code Instructions

## Project Overview

Walking audiobook website at smartme.dev. Each topic has source content in `pub/` (JSX interactive guide + .docx transcript) and is served via a React/Vite SPA in `site/`.

## Build & Deploy

```bash
cd site
npm run build
npx wrangler pages deploy dist --project-name smartme
```

No auto-deploy from git -- always use wrangler manually.

## Content Pipeline

When updating or adding a topic:

1. **JSX guide** (`pub/{topic}/{name}.jsx`): Imported directly via `@pub` Vite alias. Changes are live after rebuild.
2. **Transcript** (`pub/{topic}/{name}.docx`):
   - Convert to HTML: `pandoc pub/{topic}/{name}.docx -t html --wrap=none -o site/src/pages/transcripts/{slug}.html`
   - Copy for download: `cp pub/{topic}/{name}.docx site/public/downloads/{slug}-transcript.docx`
3. **New topic** also requires: page components in `site/src/pages/`, routes in `App.jsx`, nav in `Layout.jsx`, card in `Home.jsx`.

## Existing Topics & Paths

| Slug | Pub folder | JSX file | Docx file |
|------|-----------|----------|-----------|
| blockchain | pub/blockchain | blockchain-guide.jsx | blockchain-transcript.docx |
| fine-tuning | pub/fine_tuning | why-is-the-universe-just-right.jsx | walk-narration-v2.docx |
| monty-hall | pub/montyhall | monty-hall.jsx | monty-hall-audiobook-transcript.docx |
| double-slit | pub/double_slit | double-slit.jsx | double-slit-walk.docx |
| clear-vs-strong | pub/clear_vs_strong | kahneman_visuals_v3.jsx | kahneman_walk_v3.docx |
| hard-to-vary | pub/explanation | hard-to-vary.jsx | hard-to-vary-walk.docx |
| group-power | pub/group_power | power-of-the-group.jsx | power-of-the-group-audio-script.docx |
| llm | pub/llm | llm-explainer.jsx | llm-walking-script.docx |

## Code Conventions

- **Guides are self-contained**: Each JSX guide has inline styles, no external CSS. Dark theme with `#0a0a0f` background.
- **Fonts**: Playfair Display (headings), DM Sans (UI), Source Serif 4 (article text), DM Mono (technical labels). Loaded via Google Fonts link in components.
- **Each topic has a color**: defined in the page component and Home.jsx ESSAYS array.
- **TranscriptPage component**: Reusable wrapper for all transcript pages. Takes `title`, `subtitle`, `html`, `interactivePath`, `downloadFile`, `color`.
- **GuideFooter/GuideTranscriptBar**: Navigation bar linking between interactive and transcript views.

## File Naming

- Pub folders use underscores: `double_slit`, `fine_tuning`
- URL slugs use hyphens: `double-slit`, `fine-tuning`
- Page components use PascalCase: `DoubleSlit.jsx`, `DoubleSlitTranscript.jsx`
- Transcript HTML uses slug: `double-slit.html`
- Download files use slug: `double-slit-transcript.docx`
