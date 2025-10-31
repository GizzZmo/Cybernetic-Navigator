# Deployment Guide

This guide covers various deployment options for Cybernetic Navigator.

## Table of Contents

- [Quick Deploy](#quick-deploy)
- [Deployment Platforms](#deployment-platforms)
  - [Vercel](#vercel)
  - [Netlify](#netlify)
  - [GitHub Pages](#github-pages)
  - [Cloudflare Pages](#cloudflare-pages)
  - [AWS S3 + CloudFront](#aws-s3--cloudfront)
- [Environment Variables](#environment-variables)
- [Build Configuration](#build-configuration)
- [Custom Domain](#custom-domain)
- [Troubleshooting](#troubleshooting)

## Quick Deploy

The fastest way to deploy Cybernetic Navigator:

### Prerequisites
- GitHub account (for most platforms)
- Google Gemini API key ([get one here](https://ai.google.dev/))

### Build the Project

```bash
# Clone repository
git clone https://github.com/GizzZmo/Cybernetic-Navigator.git
cd Cybernetic-Navigator

# Install dependencies
npm install

# Build for production
npm run build
```

This creates a `dist/` folder with optimized static files ready for deployment.

## Deployment Platforms

### Vercel

**Best for:** Zero-config deployments with excellent performance.

#### Deploy via GitHub Integration

1. **Sign up** at [vercel.com](https://vercel.com)

2. **Import Project**
   - Click "Add New Project"
   - Import your GitHub repository
   - Select `Cybernetic-Navigator`

3. **Configure Build Settings**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Environment Variables** (Optional)
   - Add `API_KEY` if you want to provide a default key
   - ⚠️ Not recommended for production (users should use their own keys)

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~1-2 minutes)
   - Your app is live!

#### Deploy via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts
# Deploy to production
vercel --prod
```

**Vercel Configuration** (`vercel.json`):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

---

### Netlify

**Best for:** Easy drag-and-drop deployment with great free tier.

#### Deploy via GitHub Integration

1. **Sign up** at [netlify.com](https://netlify.com)

2. **New Site from Git**
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select your repository

3. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Branch: `main`

4. **Deploy**
   - Click "Deploy site"
   - Wait for build (~1-2 minutes)
   - Your site is live!

#### Deploy via Drag & Drop

1. Build locally: `npm run build`
2. Go to [netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist/` folder onto the page
4. Done! Your site is deployed.

#### Deploy via CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build project
npm run build

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

**Netlify Configuration** (`netlify.toml`):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### GitHub Pages

**Best for:** Free hosting directly from your GitHub repository.

#### Setup

1. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages"
   - Source: "GitHub Actions"

2. **Create GitHub Actions Workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v3
```

3. **Update Vite Config** for base path

Edit `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/Cybernetic-Navigator/', // Your repo name
  plugins: [react()],
});
```

4. **Push to GitHub**
```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push
```

5. **Access Your Site**
   - URL: `https://yourusername.github.io/Cybernetic-Navigator/`

---

### Cloudflare Pages

**Best for:** Global edge network with excellent performance.

#### Deploy via Dashboard

1. **Sign up** at [pages.cloudflare.com](https://pages.cloudflare.com)

2. **Create a Project**
   - Click "Create a project"
   - Connect to GitHub
   - Select repository

3. **Build Configuration**
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`

4. **Deploy**
   - Click "Save and Deploy"
   - Wait for build completion
   - Site is live on `*.pages.dev`

#### Deploy via Wrangler CLI

```bash
# Install Wrangler
npm install -g wrangler

# Authenticate
wrangler login

# Build project
npm run build

# Deploy
wrangler pages deploy dist --project-name=cybernetic-navigator
```

---

### AWS S3 + CloudFront

**Best for:** Maximum control and scalability.

#### Prerequisites
- AWS Account
- AWS CLI installed and configured

#### Steps

1. **Build the Project**
```bash
npm run build
```

2. **Create S3 Bucket**
```bash
aws s3 mb s3://cybernetic-navigator-app
```

3. **Configure Bucket for Static Hosting**
```bash
aws s3 website s3://cybernetic-navigator-app \
  --index-document index.html \
  --error-document index.html
```

4. **Set Bucket Policy**

Create `bucket-policy.json`:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::cybernetic-navigator-app/*"
    }
  ]
}
```

Apply policy:
```bash
aws s3api put-bucket-policy \
  --bucket cybernetic-navigator-app \
  --policy file://bucket-policy.json
```

5. **Upload Files**
```bash
aws s3 sync dist/ s3://cybernetic-navigator-app \
  --delete \
  --cache-control "public, max-age=31536000"
```

6. **Create CloudFront Distribution** (Optional but recommended)

This provides:
- Global CDN
- HTTPS support
- Custom domain
- Better performance

Configure via AWS Console or CLI.

7. **Access Your Site**
   - S3: `http://cybernetic-navigator-app.s3-website-us-east-1.amazonaws.com`
   - CloudFront: Your distribution domain

---

## Environment Variables

### For Production Deployments

**⚠️ Important Security Note:**

We **do NOT recommend** setting a default `API_KEY` environment variable in production deployments because:

1. **Cost Control:** All users would share your API quota
2. **Security Risk:** API key would be exposed in client-side code
3. **Billing:** You'd be charged for all user requests

### Recommended Approach

**Let users provide their own API keys** via the Settings panel.

This ensures:
- ✅ Each user manages their own API quota
- ✅ No shared costs
- ✅ Better security
- ✅ User control

### Development Only

For **local development** or **private deployments**, you can set:

```env
API_KEY=your_gemini_api_key_here
```

**Vercel:**
```bash
vercel env add API_KEY
```

**Netlify:**
- Dashboard → Site Settings → Environment Variables
- Add `API_KEY`

**GitHub Pages:**
- Not supported (static hosting only)
- Users must configure in Settings panel

---

## Build Configuration

### Vite Configuration

The default `vite.config.ts` works for most deployments:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Uncomment for GitHub Pages
  // base: '/Cybernetic-Navigator/',
});
```

### Build Optimizations

**Current optimizations:**
- Code minification
- Tree shaking
- Asset optimization
- CSS minification

**Build output:**
- Size: ~420 KB
- Gzipped: ~105 KB

### Custom Build Options

For different deployment needs:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/custom-path/',        // Custom base path
  build: {
    outDir: 'build',             // Change output directory
    sourcemap: true,             // Enable source maps
    minify: 'terser',            // Use terser for minification
    chunkSizeWarningLimit: 1000, // Adjust warning limit
  },
});
```

---

## Custom Domain

### Vercel

1. Go to project settings
2. Click "Domains"
3. Add your domain
4. Update DNS records as instructed
5. Wait for DNS propagation (~24 hours)

### Netlify

1. Go to "Domain settings"
2. Click "Add custom domain"
3. Follow DNS configuration steps
4. Enable HTTPS (automatic with Let's Encrypt)

### GitHub Pages

1. Add `CNAME` file to `public/` folder:
   ```
   yourdomain.com
   ```
2. Configure DNS:
   - Type: `A`
   - Value: GitHub Pages IPs
   - Or use `CNAME` pointing to `username.github.io`

### Cloudflare Pages

1. Go to project settings
2. Click "Custom domains"
3. Add your domain
4. DNS is configured automatically (if using Cloudflare DNS)

---

## Troubleshooting

### Build Fails

**Issue:** `npm run build` fails

**Solutions:**
- Check Node.js version (need v16+)
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check for TypeScript errors

### Blank Page After Deployment

**Issue:** Site loads but shows blank page

**Solutions:**
1. **Check base path** in `vite.config.ts`
2. **Check browser console** for errors
3. **Verify build succeeded** and `dist/` folder exists
4. **Check 404 redirects** are configured (SPA routing)

### API Not Working

**Issue:** AI features don't work after deployment

**Solutions:**
1. **Verify API key** is configured (Settings panel)
2. **Check browser console** for CORS or API errors
3. **Test API key** independently
4. **Check quota limits** on Google AI Studio

### Assets Not Loading

**Issue:** Images or styles not loading

**Solutions:**
1. **Check base path** configuration
2. **Verify asset paths** are relative
3. **Check build output** includes all assets
4. **Clear browser cache**

### Performance Issues

**Issue:** Slow loading or laggy UI

**Solutions:**
1. **Enable gzip** compression on server
2. **Use CDN** (CloudFront, Cloudflare)
3. **Enable caching** headers
4. **Check bundle size** with `npm run build -- --stats`
5. **Optimize images** if any were added

### HTTPS Not Working

**Issue:** Site doesn't load over HTTPS

**Solutions:**
- **Vercel/Netlify:** Automatic, check DNS propagation
- **GitHub Pages:** Enable in settings
- **Custom:** Use Let's Encrypt or CloudFlare

---

## Post-Deployment Checklist

After deploying, verify:

- [ ] Site loads correctly
- [ ] All pages/panels are accessible
- [ ] API key can be configured in Settings
- [ ] AI Search works with valid API key
- [ ] Text Summarization works
- [ ] Theme Generation works
- [ ] Bookmarks can be added/deleted
- [ ] History is tracked
- [ ] LocalStorage persists across refreshes
- [ ] Responsive design works on mobile
- [ ] HTTPS is enabled
- [ ] Custom domain works (if configured)
- [ ] No console errors

---

## Continuous Deployment

### Auto-Deploy on Push

Most platforms support automatic deployment:

**Vercel/Netlify:**
- Push to `main` → Automatic deployment
- Pull requests → Preview deployments
- Configure in platform settings

**GitHub Pages:**
- Handled by GitHub Actions workflow
- Triggers on push to `main`

**Benefits:**
- No manual deployment steps
- Always up-to-date
- Preview branches before merging

### Deployment Notifications

Set up notifications for deployment status:
- Slack integration
- Email alerts
- GitHub status checks

---

## Performance Monitoring

After deployment, monitor:

1. **Core Web Vitals**
   - Use Google PageSpeed Insights
   - Target: >90 score

2. **Bundle Size**
   - Track with bundlephobia
   - Alert on size increases

3. **API Usage**
   - Monitor Google AI quota
   - Set up billing alerts

4. **Error Tracking**
   - Use Sentry or similar
   - Track client-side errors

---

## Security Best Practices

For production deployments:

1. ✅ **HTTPS only** - Force secure connections
2. ✅ **CSP headers** - Content Security Policy
3. ✅ **No hardcoded API keys** - Users provide their own
4. ✅ **Dependency updates** - Keep packages updated
5. ✅ **Security headers** - X-Frame-Options, etc.

---

For more information:
- [Main README](../README.md)
- [Contributing Guide](../CONTRIBUTING.md)
- [Architecture Documentation](./ARCHITECTURE.md)
