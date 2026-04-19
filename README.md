# 🐬 FlipperFAP — Online .FAP Compiler

> Compile Flipper Zero apps from any GitHub or Gitea repo — straight from your phone. No toolchain, no PC required.

**[▶ Open FlipperFAP](https://joelewis012.github.io/flipper-fap-actions/)**

---

## What is it?

FlipperFAP is a free web app that compiles Flipper Zero `.fap` application files using GitHub Actions as a backend. Paste a repo URL, pick your firmware, tap compile — done. Works on iPhone, Android, and desktop.

No coding knowledge needed. No software to install.

---

## How to use

**1. Find a Flipper app on GitHub or Gitea**
Copy the full repo URL (e.g. `https://github.com/user/app`)

**2. Paste it into FlipperFAP**
Open the app, paste the URL into the repo field

**3. Pick your firmware**
Choose the firmware running on your Flipper — Official, Momentum, or Unleashed. Not sure? Check **Settings → About** on your Flipper.

**4. Tap Compile .FAP**
Wait ~30–60 seconds while GitHub Actions builds the file. A dolphin will keep you company. 🐬

**5. Download and copy to your Flipper**
Tap **↓ Download .fap** and transfer the file to the `apps/` folder on your Flipper SD card using [qFlipper](https://flipperzero.one/update) or the Flipper mobile app.

---

## Features

- ⚙️ **Compile any public GitHub or Gitea repo** — just paste the URL
- 📱 **Works on iPhone and Android** — installable as a PWA (Add to Home Screen)
- 🐬 **Dolphin compile animation** — pixel-art Flipper screen while your build runs
- 📚 **App Directory** — curated apps with one-tap quick compile and upvotes
- 🔥 **Daily most compiled** — see what the community is building today
- 🔥 **Compile streak** — tracks consecutive days the community keeps building
- ✅ **Already compiled detection** — warns if the same app + firmware was recently compiled
- 🔍 **Compile history search** — search through all past compiled apps instantly
- 📡 **Firmware news feed** — latest releases from Official, Momentum and Unleashed
- 👍 **App upvotes** — upvote your favourite apps in the directory
- 🔗 **Share compiled app link** — one tap to copy a pre-filled compile link
- ⏳ **Estimated wait time** — shows queue depth before you compile
- 🌙 **Dark & light mode**
- 🌍 **6 languages** — English, French, German, Spanish, Russian, Chinese
- 🔔 **Push notifications** — get notified when your .fap is ready
- 💬 **Feedback button** — report bugs or suggest features directly to the dev
- 🚩 **Report broken apps** — flag any app directory entry that won't compile
- 🔗 **Shareable links** — share a pre-filled compile URL with anyone
- 🪩 **Secret easter egg** — something happens when you tap the logo…

---

## Supported firmware

| Firmware | Channel |
|---|---|
| [Official](https://github.com/flipperdevices/flipperzero-firmware) | Release / Dev |
| [Momentum](https://github.com/Next-Flip/Momentum-Firmware) | Release / Dev |
| [Unleashed](https://github.com/DarkFlippers/unleashed-firmware) | Release / Dev |

---

## Self-hosting / Running your own instance

FlipperFAP needs three things to work:

### 1. Fork this repo
Fork `flipper-fap-actions` to your own GitHub account. Make sure **GitHub Actions** is enabled (Settings → Actions → Allow all actions).

### 2. Deploy the Cloudflare Worker
- Go to [workers.cloudflare.com](https://workers.cloudflare.com) and create a new Worker
- Paste the contents of `worker.js` and deploy
- Create a **KV namespace** (Workers & Pages → KV → Create namespace)
- Bind it to your worker: Settings → Variables → KV Namespace Bindings → Variable name: `KV`
- Add your GitHub token as a secret: Settings → Variables → Secrets → Name: `GH_TOKEN`, Value: your `ghp_...` token (needs `repo` + `workflow` scopes)

### 3. Update the worker URL in index.html
Open `index.html` and update line 844:
```js
const WORKER_URL = 'https://your-worker.your-subdomain.workers.dev';
```
Then push to GitHub Pages.

### GitHub token scopes needed
- `repo` — read repo info and artifacts
- `workflow` — trigger workflow dispatches

---

## Project structure

```
flipper-fap-actions/
├── index.html          # Frontend — single file app
├── manifest.json       # PWA manifest
├── sw.js               # Service worker (push notifications, offline)
├── worker.js           # Cloudflare Worker (GitHub API proxy + KV store)
├── icon.png            # 192×192 PWA icon
├── icon512.png         # 512×512 PWA icon
└── .github/
    └── workflows/
        └── compile.yml # GitHub Actions workflow — the actual compiler
```

---

## How it works under the hood

1. You paste a repo URL and tap Compile
2. The frontend calls the **Cloudflare Worker** (`/api/trigger`)
3. The worker validates the request and calls the **GitHub Actions API** to trigger `compile.yml`
4. `compile.yml` clones your repo, finds `application.fam`, and builds the `.fap` using [ufbt](https://github.com/flipperdevices/flipperzero-ufbt)
5. The built `.fap` is uploaded as a GitHub Actions artifact (kept for 30 days)
6. The frontend polls the worker every 8 seconds until the build finishes
7. When done, you tap Download — the worker proxies the artifact zip, and JSZip extracts the `.fap` in your browser

All compile history and stats are stored in **Cloudflare KV** with minimal reads/writes.

---

## Support

FlipperFAP is free and always will be. If it saves you time, consider buying me a coffee:

☕ [Buy Me a Coffee](https://buymeacoffee.com/Joelewis012) &nbsp;|&nbsp; ❤️ [Ko-fi](https://ko-fi.com/joelewis012)

---

## Disclaimer

This tool compiles third-party Flipper Zero apps. Always check what an app does before installing it on your Flipper. The author is not responsible for how compiled apps are used.

Some apps (e.g. RF Jammer) only work on custom firmware like Unleashed. Using certain radio features may be restricted in your region — use responsibly.

---

> 💡 **Psst** — try tapping the FlipperFAP logo a few times.

*Built with 🧡 for the Flipper Zero community*
