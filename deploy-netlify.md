# Deploy to Netlify (FREE Alternative)

## 🚀 Step-by-Step Deployment

### 1. Prepare Your Project
```bash
# Build your project
npm run build

# Make sure everything is committed to git
git add .
git commit -m "Ready for Netlify deployment"
```

### 2. Deploy to Netlify
1. **Go to:** https://netlify.com
2. **Sign up/Login** with GitHub
3. **Click:** "New site from Git"
4. **Choose:** GitHub
5. **Select** your repository
6. **Build settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
7. **Click:** "Deploy site"

### 3. Your Live URLs
- **Portfolio:** `https://your-project-name.netlify.app`
- **Admin Panel:** `https://your-project-name.netlify.app/admin`
- **Login:** `mohamed_admin` / `MGZ_Portfolio_2025!`

### 4. Custom Domain (Optional)
- **Buy domain** from any provider
- **Add to Netlify** in site settings
- **Your URL:** `https://yourname.com`

## ✅ Benefits
- **FREE hosting**
- **Automatic HTTPS**
- **Global CDN**
- **Custom domains**
- **Form handling**
- **Professional URLs** 