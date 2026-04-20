# Portfolio OS (Windows XP-inspired)

A portfolio site that feels like a tiny operating system: a desktop shell with draggable windows, app “shortcuts”, and playful micro-interactions.

## Tech

- React + TypeScript + Vite
- Zustand (global state + session persistence)
- `tech-stack-icons` (tech stack/logo chips)
- `react-icons` (UI glyphs)

## Getting started

Install and run:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

## Environment variables

This project uses Vite env vars (must be prefixed with `VITE_`).

Create a `.env` file (or copy from `.env.example`) and set:

- **`VITE_DEVELOPER_NAME`**: Used in landing screens + System Info “Name”.
- **`VITE_GITHUB_PORTFOLIO_URL`**: Used in System Info as a clickable GitHub link.

Optional:

- **`VITE_RESUME_URL`**: URL for the Resume app download.

## Notable features

- **Window manager**: focus, z-index stacking, snapping, session restore
- **Command palette**: Cmd/Ctrl + K
- **Recents**: quick reopen from the taskbar
- **System Info**: grouped tech stack chips + “device specs” style rows
- **Tooltips**: hover/focus tooltips that clamp to the viewport (no off-screen overflow)