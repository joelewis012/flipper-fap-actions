<div align="center">

<img src="icon512.png" width="120" alt="FlipperFAP"/>

# FlipperFAP

**Compile Flipper Zero `.fap` apps from any GitHub or Gitea URL**

Free · Works on iPhone · No server needed · Supports all major firmware

[![Live Site](https://img.shields.io/badge/Live%20Site-joelewis012.github.io%2Fflipper--fap--actions-FF6B00?style=for-the-badge)](https://joelewis012.github.io/flipper-fap-actions/)
[![GitHub Actions](https://img.shields.io/badge/Powered%20by-GitHub%20Actions-2088FF?style=for-the-badge&logo=github-actions)](https://github.com/features/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

### Support the project

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/YOUR_BMC_USERNAME)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-29ABE0?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/joelewis012)

</div>

---

## ✨ Features

- 🦊 **Gitea support** — compile from any Gitea or GitHub repo URL
- ⚡ **4 firmware targets** — Official, Momentum, Unleashed, Xtreme
- 🔄 **Auto firmware versions** — always fetches the latest release
- 📦 **Direct .fap download** — straight to your device, no zip files
- 📱 **iPhone home screen app** — works as a PWA
- 🌍 **6 languages** — EN, FR, DE, ES, RU, ZH
- 🔔 **Push notifications** — notified when your compile finishes
- 📚 **App directory** — curated apps with firmware compatibility badges
- 🔥 **Community popular apps** — auto-ranked from compile history
- 📜 **Live compile feed** — see what the community is building in real time
- 🔍 **Debug mode** — view raw build logs with colour-coded output
- 🌙 **Dark & light mode**

---

## 🚀 How it works

```
You (GitHub Pages site)
    │
    │  Cloudflare Worker (holds your token securely)
    │
    ▼
GitHub Actions (free Ubuntu runner)
    ├─ 1. git clone your app repo
    ├─ 2. ufbt downloads the firmware SDK
    ├─ 3. Compiles your .fap
    └─ 4. Uploads artifact
    │
    ▼
Your .fap downloads directly to your device
```

- **Free** — GitHub gives 2,000 Actions minutes/month (~600 compiles)
- **Secure** — your GitHub token lives in Cloudflare, never exposed in the browser
- **Persistent** — compile history saved in Cloudflare KV, visible to everyone

---

## 🛠️ Supported Firmware

| Firmware | Release | Dev |
|----------|:-------:|:---:|
| **Official** | ✅ | ✅ |
| **Momentum** | ✅ | ✅ |
| **Unleashed** | ✅ | ✅ |
| **Xtreme** | ✅ | ✅ |

---

## 🐛 Troubleshooting

| Problem | Fix |
|---------|-----|
| Compile fails immediately | Check the Actions run log — usually a missing `application.fam` |
| "Worker error" on site | Your GitHub token has expired — regenerate at github.com/settings/tokens and update in Cloudflare Worker → Settings → Variables → `GH_TOKEN` |
| GitHub Pages shows README | Settings → Pages → make sure it's set to `main` branch, `/ (root)` |
| Workflow not triggering | Actions tab → make sure workflows are enabled |
| Download fails | Try again — GitHub artifact downloads occasionally time out |

---

## 📁 Files

```
├── index.html          # Web app frontend
├── worker.js           # Cloudflare Worker (secure API proxy)
├── sw.js               # Service worker (push notifications)
├── manifest.json       # PWA manifest
├── icon.png / icon512.png
└── .github/workflows/compile.yml
```

---

## 📜 License

MIT — free to use, modify, self-host. Credit appreciated but not required.

---

<div align="center"><sub>Built for the Flipper Zero community 🐬</sub></div>
