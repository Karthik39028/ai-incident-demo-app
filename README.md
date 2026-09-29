# Incident Lab Demo Application

## Overview

**Incident Lab Dashboard** is a tiny production‑style React application built with Vite and deployed on Netlify. It displays a few key pieces of information:

- Application status
- API health (via a Netlify Function)
- Current environment
- Last deployment timestamp
- Deployment status
- Incident simulation information

The purpose of this repository is to serve as a realistic target for an **AI Incident Response Agent**. It contains a deliberately breakable Netlify deployment configuration so the agent can detect, diagnose, and recommend a recovery action.

---

## Technology Stack

- **React 18** – UI library
- **Vite 5** – Fast development/build tool
- **Node.js** – Runtime
- **Netlify Functions** – Serverless health endpoint (`/.netlify/functions/health`)
- **Netlify** – Hosting and continuous deployment

---

## Local Development

```bash
# install dependencies
npm install

# start dev server (http://localhost:5173)
npm run dev
```

The dev server proxies requests to the Netlify function automatically, so the dashboard will show **API Health: healthy**.

---

## Netlify Deployment

1. Connect the repository to Netlify.
2. Netlify will detect the `netlify.toml` file.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Functions directory: `netlify/functions`

After a successful deploy, visiting the site root (`/`) shows the dashboard, and the health endpoint can be reached at:

```
/.netlify/functions/health
```

---

## Health Endpoint

Implemented as a Netlify Function (`netlify/functions/health.js`). It returns:

```json
{ "status": "healthy", "service": "incident-lab-api" }
```

The frontend fetches this endpoint on mount and displays the **API Health** status.

---

## Architecture (Normal / Healthy State)

- **src/** – React source code (`App.jsx`, `main.jsx`, `api.js`, `styles.css`).
- **netlify/** – Netlify‑specific configuration and Functions.
- **vite.config.js** – Vite configuration that outputs to `dist`.
- **netlify.toml** – Correct build command, publish directory, and functions location.
- **package.json** – Scripts for dev, build, and preview.

---

## Controlled Incident Scenario

The repository contains a *single* realistic deployment mis‑configuration that can be introduced deliberately:

1. **Open `netlify.toml`.**
2. Change the `publish` value from `"dist"` to an incorrect folder, e.g., `"public"`.
3. Commit and push the change.

Netlify will then build the site but publish the wrong directory, causing the dashboard to load a blank page (or 404) while the health function remains reachable. This mimics a common production incident where the build output path does not match the hosting configuration.

---

## Recovery Recommendation

The AI Incident Response Agent should suggest the following configuration change:

- **File:** `netlify.toml`
- **Change:** `publish = "dist"` (restore the correct output directory)

After the change is approved and redeployed, the dashboard and health endpoint both return HTTP 200 and the UI shows **Application: Healthy**, **API: Healthy**, **Deployment: Healthy**.

---

## Files of Interest

- `netlify.toml` – Deployment configuration (the root cause of the incident).
- `netlify/functions/health.js` – Health endpoint implementation.
- `src/App.jsx` – Dashboard UI that consumes the health endpoint.
- `vite.config.js` – Vite build settings (outputs to `dist`).

---

## Successful Recovery Verification

1. `GET /` → HTTP 200 and dashboard renders.
2. `GET /.netlify/functions/health` → `{ "status": "healthy", "service": "incident-lab-api" }`
3. Dashboard shows **Application Status: Healthy**, **API Health: healthy**, **Deployment Status: Healthy**.

---

## License

MIT – feel free to fork, experiment, and use this repo for incident‑response demos.
