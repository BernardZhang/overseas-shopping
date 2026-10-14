# Deployment discussion

GitHub provides versioned source and automated validation; Vercel builds Vite assets on Git updates and hosts them over HTTPS. Deploying early exposes configuration problems while development continues.

Mock data and localStorage keep this demonstration focused on shopping interactions. Integer cents avoid floating-point subtotal errors. Invalid storage entries are discarded; unavailable storage retains in-memory functionality.

Validation combines type/build checks, business logic assertions, real Chromium interaction and public deployment checks. Diagnose logs first; use verified historical deployments to recover regressions.
