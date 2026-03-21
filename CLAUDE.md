# CLAUDE.md — Fabian Wong Portfolio

## Project Overview
Personal portfolio website for Fabian Wong — Product Designer, Product Manager, and AI Automation Engineer based in Singapore. Cream-toned aesthetic with editorial typography and fluid scroll animations.

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Build | Vite 5 |
| UI Framework | React 18 |
| Styling | Tailwind CSS v3 |
| Animation | framer-motion |
| Fonts | Space Grotesk, Inter (Google Fonts) |

## Design Language
- **Background**: `#F0EBE1` (warm cream)
- **Text**: `#16120E` (warm near-black)
- **Muted text**: `#6B6358`
- **Aesthetic**: Editorial, minimal, typographic-forward — inspired by SHADXW, LAB.WORKS, ASAP Rocky editorial sites
- **Fonts**: Space Grotesk (headings, labels) — no serif accent
- **Feel**: Clean, confident, premium without being corporate

## Project Structure
```
/
├── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   └── components/
│       └── Hero.jsx
├── public/
│   ├── favicon.svg
│   └── hero-portrait.mp4
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## Running Locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
```

## Hero Architecture
- **Video**: `public/hero-portrait.mp4` — autoplay, muted, loop. Portrait orientation (480×680px max).
- **Scroll animation**: `useScroll` + `useTransform` from framer-motion. On scroll, video scales from 1.0 → 0.78 and moves up 80px. Spring-smoothed for organic feel.
- **`SplitLetters`**: Per-character stagger animation — `y 60→0, opacity 0→1, rotateX -20→0`.
- **`FadeUp`**: Simple mount animation — `y 28→0, opacity 0→1`.
- **Sticky hero**: `min-h-[200vh]` with `sticky top-0 h-screen` inner container gives scroll room while keeping the hero pinned.
- **Name**: `clamp(72px, 14vw, 200px)` — responsive giant type at bottom.

## Styling Notes
- `overflow-x: hidden` on body only — never on sticky containers.
- `mix-blend-multiply` on navbar so it darkens gracefully over the cream background.
- Tailwind colors `cream`, `ink`, `ink-muted` are defined in `tailwind.config.js`.

## Owner Context
Fabian Wong — built Kelick (HR SaaS, ~$10K MRR), freelance AI automation engineer (n8n, LLM, voice AI), ex-ION Mobility + Aureus Group. Applying for PM, Product Designer, and AI Agent Engineer roles.
