# GitHub Pages Deployment Guide

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click "New Repository" (+ icon in top right)
3. Name your repository: `freedomstyle`
4. Make it **Public** (required for free GitHub Pages)
5. Click "Create repository"

## Step 2: Upload Your Code

### Option A: Using GitHub Web Interface
1. On your new repository page, click "uploading an existing file"
2. Drag and drop all project files or click "choose your files"
3. Upload all files from your project
4. Write commit message: "Initial FreedomStyle website"
5. Click "Commit changes"

### Option B: Using Git Commands (if you have Git installed)
```bash
# In your project folder
git init
git add .
git commit -m "Initial FreedomStyle website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/freedomstyle.git
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "GitHub Actions"
5. The deployment workflow will run automatically

## Step 4: Your Website URLs

After deployment (takes 2-5 minutes), your site will be available at:
- **Main URL**: `https://YOUR_USERNAME.github.io/freedomstyle/`

## Step 5: Custom Domain Setup (Optional)

To get a custom domain like `freedomstyle.com`:

1. Buy a domain from a registrar (GoDaddy, Namecheap, etc.)
   - Available options: `freedomstyle.com`, `freedomstyle.store`, `freedomstyle.shop`, `freedomstyle.online`
2. In your repository settings → Pages → Custom domain
3. Enter your domain (e.g., `freedomstyle.com`)
4. Configure DNS at your registrar:
   - Add CNAME record pointing to `YOUR_USERNAME.github.io`
5. Wait for DNS verification (24-48 hours)

**Note**: You cannot use `freedomstyle.github.io` as it's reserved by GitHub. GitHub Pages works best with your own custom domain.

## Step 6: Test Your Website

1. Wait for the green checkmark in "Actions" tab
2. Visit your website URL
3. Test cart functionality and contact form
4. Share your URL with customers!

## Troubleshooting

- **Build fails**: Check the "Actions" tab for error details
- **404 error**: Make sure repository is public and Pages is enabled
- **Styles broken**: Check if `base` path in vite.config.client.ts matches your repo name

## Updating Your Website

1. Make changes to your files
2. Upload new files to GitHub (replace old ones)
3. GitHub Actions will automatically rebuild and deploy
4. Changes appear in 2-5 minutes

Your FreedomStyle e-commerce store will be live and ready for customers!