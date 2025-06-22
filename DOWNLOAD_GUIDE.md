# How to Download Your FreedomStyle Files

## Method 1: Download as ZIP (Easiest)

1. **In Replit**, click the 3-dot menu (⋯) next to your project name
2. Select **"Download as ZIP"**
3. Extract the ZIP file on your computer
4. You now have all your project files!

## Method 2: Individual File Download

If ZIP download doesn't work, download key files individually:

### Essential Files to Download:
```
📁 Root Directory:
- package.json
- package-lock.json
- tsconfig.json
- vite.config.ts
- vite.config.client.ts
- tailwind.config.ts
- postcss.config.js
- components.json
- drizzle.config.ts
- README.md
- DEPLOYMENT_GUIDE.md
- SETUP_EMAILJS.md

📁 .github/workflows/
- deploy.yml

📁 client/
- index.html
- 📁 public/
  - CNAME
  - logo.png (if exists)
- 📁 src/
  - main.tsx
  - App.tsx
  - index.css
  - 📁 components/ (all files)
  - 📁 data/ (all files)
  - 📁 hooks/ (all files)
  - 📁 lib/ (all files)
  - 📁 pages/ (all files)

📁 server/
- index.ts
- routes.ts
- storage.ts
- db.ts
- vite.ts

📁 shared/
- schema.ts
```

## Method 3: Git Clone (Advanced)

If your Replit has Git enabled:
```bash
git clone [YOUR_REPLIT_GIT_URL]
```

## What NOT to Download:
- `node_modules/` folder (too large, will be recreated)
- `.replit` file (Replit-specific)
- Any `.log` files
- `dist/` or `build/` folders

## After Download:

1. Create GitHub repository named `freedomstyle`
2. Upload all downloaded files
3. Follow the DEPLOYMENT_GUIDE.md instructions
4. Your site will be live at: `https://YOUR_USERNAME.github.io/freedomstyle/`

## Quick File Check:
Make sure you have these critical files:
✅ package.json (contains dependencies)
✅ .github/workflows/deploy.yml (deployment script)
✅ client/index.html (main HTML file)
✅ client/src/App.tsx (main React app)
✅ vite.config.client.ts (build configuration)