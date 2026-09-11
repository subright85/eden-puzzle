# 이든의 퍼즐 (Ethan's Puzzle)

광고 없는 아이용 직소 퍼즐 PWA. A real jigsaw puzzle for kids — zero ads, zero tracking.

**Live:** https://eden-puzzle.vercel.app

## Features

- 🧸 **Kids mode** — 6/12/24/48 pieces, chunky pieces, faint background hint, a free daily puzzle
- 🖼 **Gallery mode** (for grown-ups) — 24–150 pieces, classic masterpieces (Van Gogh, Monet, ukiyo-e…), no hints
- 📷 Photo puzzles from your own camera roll (processed on-device)
- ⭐ Star & 🌈 rainbow coin economy, per-picture progress, collection book
- 📴 Fully offline (service worker), no accounts, no data collection, no IAP

## Structure

- `index.html` — the whole app: inline CSS/JS, zero dependencies
- `sw.js` — offline cache (version bumped with every deploy)
- `assets/` — puzzle art. Kid-only assets carry a `.kid` filename tag; masterpieces are public-domain originals (Met, Wikimedia Commons, etc.), individually license-verified
- `ios/` — Capacitor iOS wrapper (`build-www.sh` builds the native web bundle)

## Deploy

```sh
# syntax check + smoke tests, then:
vercel deploy --prod
./build-www.sh && npx cap sync ios
```

Made with ❤️ for 이든.
