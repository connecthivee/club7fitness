# 🚀 Deployment Guide - Club 7 Fitness

## Pre-Deployment Checklist

Before deploying, ensure you've completed these customizations:

- [ ] Replace logo text with actual Club 7 Fitness logo
- [ ] Add real Instagram post images
- [ ] Update contact information in Footer
- [ ] Add real member testimonials
- [ ] Test on mobile devices
- [ ] Run production build locally
- [ ] Verify all links work
- [ ] Check page load speed

## Option 1: Vercel (Recommended) ⚡

**Why Vercel?**
- Zero configuration
- Automatic HTTPS
- Global CDN
- Perfect for React/Vite
- Free tier available

### Deploy Steps

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Follow prompts:**
   - Set up and deploy? **Y**
   - Which scope? **Your account**
   - Link to existing project? **N**
   - Project name? **club7-fitness**
   - Directory? **./  (press Enter)**
   - Override settings? **N**

5. **Production Deploy**
```bash
vercel --prod
```

Your site will be live at: `https://club7-fitness.vercel.app`

### Custom Domain (Vercel)
```bash
vercel domains add yourdomain.com
```

Then add DNS records as instructed.

---

## Option 2: Netlify 🌐

**Why Netlify?**
- Drag-and-drop deployment
- Form handling
- Serverless functions
- Free tier available

### Deploy Steps

#### Method A: Drag & Drop

1. **Build the project**
```bash
npm run build
```

2. **Go to Netlify**
   - Visit https://app.netlify.com/drop
   - Drag the `dist` folder
   - Done!

#### Method B: Git Integration

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO
git push -u origin main
```

2. **Connect to Netlify**
   - Go to https://app.netlify.com
   - Click "New site from Git"
   - Choose your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

### Custom Domain (Netlify)
- Go to Site settings → Domain management
- Add custom domain
- Update DNS records as instructed

---

## Option 3: GitHub Pages 📄

**Why GitHub Pages?**
- Free hosting
- Direct from repository
- Good for static sites

### Deploy Steps

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Update package.json**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/club7-fitness"
}
```

3. **Update vite.config.js**
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/club7-fitness/', // Your repo name
})
```

4. **Deploy**
```bash
npm run deploy
```

5. **Enable GitHub Pages**
   - Go to repository settings
   - Pages section
   - Source: gh-pages branch
   - Save

---

## Option 4: Traditional Hosting (cPanel, etc.) 🖥️

**For shared hosting, VPS, or dedicated servers**

### Deploy Steps

1. **Build the project**
```bash
npm run build
```

2. **Upload files**
   - Upload entire `dist` folder contents to your web root
   - Usually `public_html` or `www`

3. **Configure .htaccess** (if Apache)
Create `.htaccess` in web root:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## Environment Variables

If you need environment variables:

1. **Create `.env` file** (local only)
```env
VITE_API_URL=https://api.yoursite.com
VITE_INSTAGRAM_TOKEN=your_token
```

2. **Use in code**
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

3. **Add to hosting platform**
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Build & Deploy → Environment

---

## Performance Optimization

### Before Deploy

1. **Optimize images**
```bash
# Use tools like:
# - TinyPNG (https://tinypng.com)
# - Squoosh (https://squoosh.app)
# - ImageOptim (Mac)
```

2. **Check bundle size**
```bash
npm run build
# Check dist folder size (should be < 500KB)
```

3. **Test production build locally**
```bash
npm run preview
```

### After Deploy

1. **Run Lighthouse Audit**
   - Open Chrome DevTools (F12)
   - Go to Lighthouse tab
   - Run audit
   - Target scores: 90+ across all metrics

2. **Test on real devices**
   - iPhone (Safari)
   - Android (Chrome)
   - Tablet
   - Desktop

3. **Check load speed**
   - Use https://pagespeed.web.dev
   - Enter your deployed URL
   - Aim for green scores

---

## Custom Domain Setup

### DNS Configuration

Add these records to your domain provider:

**For Vercel:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**For Netlify:**
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site.netlify.app
```

**For GitHub Pages:**
```
Type: A
Name: @
Value: 185.199.108.153

Type: CNAME
Name: www
Value: yourusername.github.io
```

### SSL Certificate

All recommended platforms provide free SSL:
- Vercel: Automatic
- Netlify: Automatic
- GitHub Pages: Automatic (enable in settings)

---

## Continuous Deployment

### Automatic Deploy on Push

**Vercel:**
```bash
# Link repository
vercel link

# Every push to main branch auto-deploys
```

**Netlify:**
- Already set up if using Git integration
- Push to main = auto deploy

**GitHub Actions** (for GitHub Pages):
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## Monitoring & Analytics

### Add Google Analytics (Optional)

1. **Get tracking ID** from Google Analytics

2. **Add to index.html** (before `</head>`):
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Performance Monitoring

- **Vercel Analytics**: Built-in (enable in dashboard)
- **Netlify Analytics**: Available (paid feature)
- **Google Search Console**: Free, track SEO

---

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### 404 on Refresh

- **Vercel/Netlify**: Should work automatically
- **GitHub Pages**: Check base path in vite.config.js
- **Apache**: Add .htaccess file (see above)

### Slow Load Times

1. Check image sizes (compress large images)
2. Enable gzip compression (automatic on Vercel/Netlify)
3. Use CDN (automatic on recommended platforms)

### Animations Laggy

1. Test on actual device (not emulator)
2. Reduce animation complexity if needed
3. Check for other heavy processes

---

## Post-Deployment

### SEO Setup

1. **Submit sitemap** to Google Search Console
2. **Add meta tags** for social sharing
3. **Create robots.txt** if needed

### Social Media

1. **Update Instagram bio** with website link
2. **Share launch** on social media
3. **Add website** to Google My Business

### Maintenance

- Monitor analytics weekly
- Update content regularly
- Keep dependencies updated:
  ```bash
  npm update
  ```

---

## Quick Reference

| Platform | Deploy Command | Build Time | Free Tier |
|----------|---------------|------------|-----------|
| Vercel | `vercel --prod` | ~30s | Yes |
| Netlify | Drag & Drop | ~45s | Yes |
| GitHub Pages | `npm run deploy` | ~60s | Yes |

---

**Ready to launch? Choose your platform and deploy! 🚀**

Need help? Check the platform-specific documentation:
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [GitHub Pages Docs](https://docs.github.com/pages)

