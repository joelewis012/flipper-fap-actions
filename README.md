<div align="center">

<img src="icon512.png" width="120" alt="FlipperFAP"/>

# FlipperFAP

**Compile Flipper Zero `.fap` apps from any GitHub or Gitea URL**

Free · Works on iPhone · No server needed · Supports all major firmware

[![Live Site](https://img.shields.io/badge/Live%20Site-joelewis012.github.io-FF6B00?style=for-the-badge)](https://joelewis012.github.io/flipper-fap-actions/)
[![GitHub Actions](https://img.shields.io/badge/Powered%20by-GitHub%20Actions-2088FF?style=for-the-badge&logo=github-actions)](https://github.com/features/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Sponsor](https://img.shields.io/badge/Sponsor-%E2%9D%A4-ea4aaa?style=for-the-badge&logo=github-sponsors)](https://github.com/sponsors/joelewis012)

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

## ☕ Support the project

FlipperFAP is completely free. If it saves you time, consider supporting:

- **[Buy Me a Coffee](https://www.buymeacoffee.com/YOUR_BMC_USERNAME)** — one-off tip
- **[Ko-fi](https://ko-fi.com/YOUR_KOFI_USERNAME)** — one-off or monthly
- **[GitHub Sponsors](https://github.com/sponsors/joelewis012)** — monthly via GitHub

### Setting up Buy Me a Coffee

1. Go to [buymeacoffee.com](https://www.buymeacoffee.com) and click **Start**
2. Sign up with your email or Google account
3. Choose a username (e.g. `joelewis012`)
4. Fill in your page name — **"FlipperFAP"** works well
5. Add a short bio like *"I built FlipperFAP — a free Flipper Zero app compiler"*
6. Connect your bank account or PayPal to receive payments
7. Update the link in `index.html`:
   ```
   https://www.buymeacoffee.com/YOUR_BMC_USERNAME
   ```
   → replace `YOUR_BMC_USERNAME` with your actual username

### Setting up Ko-fi

1. Go to [ko-fi.com](https://ko-fi.com) and click **Sign Up**
2. Choose a username
3. Go to **Settings** → **Payments** and connect PayPal or Stripe
4. Update the link in `index.html`:
   ```
   https://ko-fi.com/YOUR_KOFI_USERNAME
   ```

### Setting up GitHub Sponsors

1. Go to [github.com/sponsors](https://github.com/sponsors) and click **Get sponsored**
2. You need a verified address and bank account
3. GitHub reviews applications — usually takes a few days
4. Once approved, people can sponsor you monthly or one-off directly on GitHub
5. The link in `index.html` is already set to `https://github.com/sponsors/joelewis012`

---

## 🔑 How to renew your GitHub token when it expires

The site will show a **"Worker error"** or stop triggering compiles when your token expires. Here's how to fix it — takes about 2 minutes:

### Step 1 — Generate a new token

1. Open Safari and go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Tap **Generate new token** → **Generate new token (classic)**
3. Give it a name like `FlipperFAP`
4. Set expiration — choose **No expiration** to avoid doing this again, or **1 year**
5. Tick these scopes: ✅ `repo` and ✅ `workflow`
6. Scroll down and tap **Generate token**
7. **Copy the token immediately** — you won't be able to see it again

### Step 2 — Update Cloudflare Worker

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Tap **Workers & Pages** → tap **flipperfap-worker**
3. Tap **Settings** → **Variables**
4. Find `GH_TOKEN` and tap the **pencil ✏️ edit** button
5. Paste your new token
6. Tap **Encrypt** → **Save**

That's it — the site will work again immediately.

> **Tip:** Set a calendar reminder for 11 months from now so you're not caught off guard.

---

## 📖 Self-hosting

> Fork this repo if you want your own instance.

1. Fork this repo (keep it public)
2. Enable **GitHub Actions** → Actions tab → Enable workflows
3. Enable **GitHub Pages** → Settings → Pages → `main` branch, `/ (root)`
4. Deploy `worker.js` to **Cloudflare Workers**, add secret `GH_TOKEN` with `repo` + `workflow` scopes, create KV namespace `FAP_KV` bound as `KV`
5. Update `WORKER_URL` in `index.html` to your worker URL

---

## 🐛 Troubleshooting

| Problem | Fix |
|---------|-----|
| Compile fails immediately | Check the Actions run log — usually a missing `application.fam` |
| "Worker error" on site | Your GitHub token has expired — follow the renewal guide above |
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
