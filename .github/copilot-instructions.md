# Copilot / AI Agent Instructions for finance-web

This file contains concise, actionable guidance to help an AI coding agent be immediately productive in this repository.

Project overview
- React + Vite single-page app (entry: `src/main.jsx`, router in `src/App.jsx`).
- Pages live in `src/pages/` (e.g. `LoginRegister.jsx`, `Dashboard.jsx`, `AddTransaction.jsx`).
- No global state library: components use local `useState` / `useEffect`.

API & auth patterns
- HTTP client: `src/api/axios.js` — baseURL set to `http://localhost:8080/api`. Update this file when backend host/port changes.
- Auth token: stored in `localStorage` via `src/auth/auth.js` (functions: `saveToken`, `getToken`, `logout`, `isLoggedIn`).
- Axios interceptor adds `Authorization: Bearer <token>` header automatically.
- Endpoints used in pages: `POST /auth/login`, `POST /auth/register`, `GET /api/transactions`, `DELETE /api/transactions/:id`.

Routing & flows
- Routes are defined in `src/App.jsx`: `/` → `LoginRegister`, `/dashboard` → `Dashboard`, `/add` → `AddTransaction`.
- Login flow: `src/pages/LoginRegister.jsx` posts to `/auth/login`, stores token to `localStorage`, then navigates to `/dashboard`.
- Dashboard fetches transactions on mount; 401 responses trigger `logout()` and redirect to `/`.

Styling & tooling
- Tailwind CSS is used; config in `tailwind.config.js` (content paths: `./src/**/*.{js,jsx,ts,tsx}` and `./index.html`).
- Some components use inline styles for quick prototypes (see `src/pages/Dashboard.jsx`).
- Dev commands: `npm run dev` (Vite), `npm run build` (vite build), `npm run lint` (eslint .) — see `package.json`.
- Note: `vite` is overridden to `rolldown-vite@7.2.5` via `package.json` overrides.

Code patterns & conventions
- Keep logic in page components for this small app; add helpers under `src/` when sharing logic across pages.
- Network errors are surfaced by setting local `error` state and simple user-facing messages (see `Dashboard.jsx` and `LoginRegister.jsx`).
- Prefer using `api` (the axios instance) rather than raw `axios` to ensure auth header and baseURL are applied.

What to modify for common tasks
- Change API host/port: edit `src/api/axios.js` baseURL.
- Change auth persistence: edit `src/auth/auth.js` functions.
- Add new route/page: create `src/pages/MyPage.jsx` and add route in `src/App.jsx`.
- Update Tailwind scope: edit `tailwind.config.js` content array.

Tests & CI
- No tests or CI configuration detected in repo root. If adding tests, prefer lightweight React testing libraries and add `test` script to `package.json`.

PR and developer notes for AI agents
- Keep changes minimal and localized; preserve existing component structure.
- When adding new API calls, use the `api` instance and add error handling similar to existing pages.
- If running the app locally for end-to-end checks, ensure the backend (Go API) is running on `localhost:8080` or update `src/api/axios.js` accordingly.

Questions for maintainers (ask the user)
- What is the intended backend host/port in different environments (dev/staging/prod)?
- Would you prefer moving token storage to a cookie or secure store?

If anything in this summary is unclear or you want more detail in a section, tell me which area to expand.
