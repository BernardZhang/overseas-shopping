# Agent execution rules

The user explicitly authorized automatic development, verification and GitHub + Vercel deployment on 2026-10-14 without human Review. This supersedes the earlier review gate. Early incomplete but buildable versions may ship. Account authorization and terms follow browser safety requirements.

- Never change read-only sources/. Maintain the existing React, TypeScript and Vite implementation.
- English UI, USD, mock products, no real checkout or backend.
- Integer cents; combined filters; cart quantities 1–10; validate and tolerate failed localStorage.
- Verify desktop/mobile interactions and keyboard dialogs.
- Never commit credentials, node_modules, dist or recordings.
- main is production; Vercel root app, npm ci, npm run build, dist output.
- Report only real deployment URLs and distinguish failures and unverified results.
