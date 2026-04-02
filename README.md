# SmartMe

Walking audiobook transcripts on topics I want to understand better or just find interesting. Each topic has a text transcript (optimized for text-to-speech readers like Speechify) and an interactive version with live visualizations.

Live at **[smartme.dev](https://smartme.dev)**

## Topics

| Topic | Listen Time |
|-------|------------|
| Blockchain Explained | ~35 min |
| Why Is the Universe Just Right? (Fine-Tuning) | ~10 min |
| The Monty Hall Problem | ~12 min |
| The Double Slit Experiment | ~22 min |
| The Expert Blind Spot (Kahneman & Duke) | ~18 min |
| The Hard-to-Vary Criterion (David Deutsch) | ~16 min |
| The Power of the Group | ~20 min |
| How LLMs Work | ~25 min |

## Project Structure

```
pub/                    # Source content
  {topic}/
    {name}.jsx          # Self-contained interactive React component
    {name}.docx         # Audio script for text-to-speech

site/                   # React + Vite web application
  src/
    pages/              # Route components (transcript + interactive per topic)
    pages/transcripts/  # HTML generated from .docx via Pandoc
    components/         # Layout, TranscriptPage, GuideFooter
  public/downloads/     # .docx files served as static assets
  dist/                 # Production build output
```

## How It Works

Each topic lives in `pub/` as two files: a `.jsx` interactive guide and a `.docx` transcript. The site imports JSX components directly via a Vite path alias (`@pub`). Transcripts are converted from `.docx` to HTML with Pandoc and imported as raw strings.

Each topic gets two routes:
- `/topic` -- transcript view (read online or download .docx)
- `/topic/interactive` -- interactive guide with visualizations

## Tech Stack

- React 19, React Router, Vite
- Cloudflare Pages (smartme.dev)
- No external CSS -- all styles inline in components

## Development

```bash
cd site
npm install
npm run dev       # local dev server
npm run build     # build to dist/
```

## Adding a New Topic

1. Create `pub/{topic}/{name}.jsx` and `pub/{topic}/{name}.docx`
2. Convert transcript: `pandoc pub/{topic}/{name}.docx -t html --wrap=none -o site/src/pages/transcripts/{slug}.html`
3. Copy docx: `cp pub/{topic}/{name}.docx site/public/downloads/{slug}-transcript.docx`
4. Create page components in `site/src/pages/` (one for interactive, one for transcript)
5. Add routes in `App.jsx`, nav item in `Layout.jsx`, card in `Home.jsx`
6. Build and deploy

## Deploy

```bash
cd site
npm run build
npx wrangler pages deploy dist --project-name smartme
```
