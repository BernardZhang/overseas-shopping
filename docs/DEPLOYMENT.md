# GitHub + Vercel deployment

Repository: https://github.com/BernardZhang/overseas-shopping

Import GitHub repository in Vercel. Personal Hobby plan. Root Directory: app. Framework: Vite. Node: 24.x. Install: npm ci. Build: npm run build. Output: dist. Production branch: main. No environment variables. This single-page application uses hash anchors, so no router rewrite is necessary.

Git pushes trigger builds and deployments; PRs receive previews. Run tests/build before push. GitHub Actions also validates installation, tests and build. Early buildable incomplete versions are allowed.

Check install/build logs, root directory, Node version and lockfile for failures. Roll back to a previously verified deployment on regression, then fix main. Never expose tokens as VITE_ variables or commit secrets.

Public verification: HTTPS without login, 12 products, combined search/filter, sorting, details, cart add/change/remove/subtotal, reload persistence, 390/320px layout, resource requests and console. Build success alone does not prove deployment.

References: [Vite](https://vercel.com/docs/frameworks/frontend/vite), [Git integration](https://vercel.com/docs/git).
