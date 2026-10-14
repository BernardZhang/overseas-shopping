# Verified delivery — 2026-10-14

Live: https://overseas-shopping.vercel.app/
Repository: https://github.com/BernardZhang/overseas-shopping
Vercel: https://vercel.com/everyday-edit/overseas-shopping

## Results from this deployment session

- Clean npm ci with a writable temporary cache, npm test and TypeScript/Vite production build passed.
- Domain assertions passed: price boundaries, combined filters, stable sorting, cart merging, 1–10 limits, integer subtotals and invalid storage.
- Real Chromium local/production browser: 12 products, local images, Home + Under $50 + VASE returns one result; empty results/reset and ascending sorting passed locally.
- Details and duplicate add passed; vase x2 subtotal $96.00; increase/decrease/delete and empty cart passed. Online reload preserved the cart and $48.00 subtotal.
- Local temporary QA fixture: invalid IDs, 0/11/fractional quantities discarded; broken JSON produces empty cart; blocked localStorage still permits adding and shows a nonblocking warning. Fixture removed after testing.
- Local 320px detail is 300px wide; Escape restores focus to its product trigger. Production 390/320px cart and document have no horizontal overflow. Viewports were simulated, not physical phones.
- Observed production browser console warnings/errors: none during the tested journey.
- Anonymous HTTPS request returned HTTP 200 and the expected page title. No login required for the production domain.
- Vercel showed Ready for initial commit 8f788df; Git integration is main production, Root Directory app, Vite, npm ci, npm run build, dist. Subsequent main commit 3d0cf24 automatically deployed successfully; Vercel commit status success confirmed.

## Limits

Demo only: no backend, inventory, account, real checkout, taxes or shipping. No Safari/Firefox, physical-phone, comprehensive accessibility or load-testing claim. Remote GitHub Actions run 38514226566 completed successfully, including npm ci, npm test and npm run build. Evidence: https://github.com/BernardZhang/overseas-shopping/actions/runs/38514226566
