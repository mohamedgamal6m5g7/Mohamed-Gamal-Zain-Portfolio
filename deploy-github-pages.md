# Deploy to GitHub Pages (FREE)

## 🚀 Step-by-Step Deployment

### 1. Prepare Your Project
```bash
# Install gh-pages package
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "next build && next export && touch out/.nojekyll && gh-pages -d out"
```

### 2. Configure Next.js for Static Export
Add to `next.config.mjs`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

export default nextConfig
```

### 3. Deploy
```bash
# Build and deploy
npm run deploy
```

### 4. Your Live URLs
- **Portfolio:** `https://yourusername.github.io/your-repo-name`
- **Admin Panel:** `https://yourusername.github.io/your-repo-name/admin`
- **Login:** `mohamed_admin` / `MGZ_Portfolio_2025!`

## ✅ Benefits
- **FREE hosting**
- **Automatic HTTPS**
- **GitHub integration**
- **Easy updates**

## ⚠️ Limitations
- **Static export only** (no server-side features)
- **Admin panel won't work** (needs server)
- **File uploads won't work** (needs server) 