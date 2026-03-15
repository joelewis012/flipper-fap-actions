# FlipperFAP — GitHub Actions Compiler

Compile Flipper Zero `.fap` apps from **any GitHub or Gitea URL**, using a beautiful web UI hosted on GitHub Pages. 100% free. Works on iPhone.

---

## Setup (takes about 5 minutes)

### Step 1 — Fork this repo

Click **Fork** at the top right of this page. Make sure the fork is public.

### Step 2 — Enable GitHub Actions on your fork

Go to your fork → **Actions** tab → click **"I understand my workflows, go ahead and enable them"**

### Step 3 — Enable GitHub Pages

Go to your fork → **Settings** → **Pages**
- Source: **Deploy from a branch**
- Branch: `main` → folder: `/ (root)`
- Click Save

Wait ~60 seconds, then your site is live at:
`https://YOUR-USERNAME.github.io/flipper-fap-actions`

### Step 4 — Create a GitHub Personal Access Token

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens) → **Generate new token (classic)**
2. Give it a name like `FlipperFAP`
3. Enable scopes: ✅ `repo` and ✅ `workflow`
4. Click **Generate token** and copy it

### Step 5 — Use the site

1. Open `https://YOUR-USERNAME.github.io/flipper-fap-actions` on your iPhone
2. Paste your token when prompted (saved locally in your browser, never sent anywhere)
3. Enter a GitHub or Gitea repo URL, pick your firmware, click Compile
4. Watch it compile in real time — download your `.fap` when done!

---

## How it works

```
iPhone Browser (GitHub Pages)
    │
    │  GitHub API (triggers workflow)
    ▼
GitHub Actions Runner (free Ubuntu VM)
    │  1. git clone your app repo (works with any Gitea/GitHub URL)
    │  2. git clone the firmware repo
    │  3. ./fbt compiles the .fap
    │  4. Uploads .fap as artifact
    ▼
You download the .fap from GitHub Actions artifacts
```

- **Free tier:** GitHub gives 2,000 Actions minutes/month (plenty — each compile takes ~2–3 min)
- **No server needed** — GitHub Pages is static, GitHub Actions does all the work
- **Your token** is stored only in your browser's localStorage, never sent to any third-party server
- **Files expire** after 30 days (GitHub artifact retention)

---

## Supported Firmware

| Firmware | Release | Dev |
|----------|---------|-----|
| Official | ✅ | ✅ |
| Momentum | ✅ | ✅ |
| Unleashed | ✅ | ✅ |
| Xtreme | ✅ | — |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "Repo not found" in modal | Make sure you forked this repo and the fork is public |
| Workflow doesn't appear in Actions tab | Go to Actions tab and enable workflows manually |
| Compilation fails | Check the Actions run log for errors — usually a missing `application.fam` or SDK mismatch |
| Token error | Make sure you enabled `repo` AND `workflow` scopes |
| GitHub Pages not working | Wait 2–3 minutes after enabling, then hard-refresh |

---

## License

MIT — free to use, modify, self-host.
