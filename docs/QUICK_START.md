# Quick Start Guide

Get up and running with Cybernetic Navigator in under 5 minutes.

## 🚀 Fast Track

### 1. Prerequisites

Make sure you have:
- **Node.js 16+** - [Download here](https://nodejs.org/)
- **Google Gemini API Key** - [Get free key](https://ai.google.dev/)

Check your Node version:
```bash
node --version  # Should be v16.0.0 or higher
```

### 2. Install

```bash
# Clone the repository
git clone https://github.com/GizzZmo/Cybernetic-Navigator.git

# Navigate to directory
cd Cybernetic-Navigator

# Install dependencies
npm install
```

### 3. Configure API Key

**Option A: Environment Variable (Recommended for development)**
```bash
# Create .env.local file
echo "API_KEY=your_gemini_api_key_here" > .env.local
```

**Option B: In-App Settings (Recommended for users)**
- You'll configure this in the app after starting it

### 4. Run

```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

### 5. First Steps

1. **Configure API Key** (if you didn't use .env.local)
   - Click the **Settings** button
   - Paste your Gemini API key
   - Click Save

2. **Try AI Search**
   - Click **Search** button
   - Type a query like "explain quantum computing"
   - Click Execute or press Enter
   - Watch the AI respond!

3. **Generate a Theme**
   - Click **Theme** button
   - Enter a description like "neon green matrix"
   - Click Generate
   - See your interface transform!

4. **Summarize Text**
   - Click **Summarize** button
   - Paste some long text
   - Click Summarize
   - Get concise bullet points!

## 🎯 Common Tasks

### Browse the Web

1. Navigate to **Viewport** area (right side)
2. Enter a URL in the address bar
3. Click Go or press Enter
4. Click the ⭐ to bookmark

### Manage Bookmarks

1. Click **Bookmarks** button
2. See all saved URLs
3. Click URL to navigate
4. Click 🗑️ to delete

### Change Themes

1. Click **Theme** button
2. Try these prompts:
   - "cyberpunk purple and pink"
   - "deep ocean blues"
   - "sunset orange and red"
   - "matrix green"
   - "retro synthwave"

## 🔧 Troubleshooting

### "API Key not configured" Error

**Solution:**
1. Go to Settings panel
2. Enter your Gemini API key
3. Or add to `.env.local` file and restart dev server

### Blank Page

**Solution:**
1. Check browser console (F12) for errors
2. Verify `npm run build` completes successfully
3. Clear browser cache and refresh

### Build Fails

**Solution:**
```bash
# Delete and reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

### Slow Performance

**Solution:**
1. Close other browser tabs
2. Disable browser extensions
3. Check your internet connection
4. Try a different browser (Chrome recommended)

## 📚 Next Steps

Now that you're up and running:

- **Explore Features** - Try all the panels and features
- **Customize Themes** - Generate multiple themes to find your favorite
- **Read Full Docs** - Check out [README.md](../README.md) for complete documentation
- **Learn Architecture** - See [docs/ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
- **Contribute** - Read [CONTRIBUTING.md](../CONTRIBUTING.md) to help improve the project

## 💡 Pro Tips

1. **Keyboard Shortcuts**
   - `Enter` in search box = Execute
   - `Enter` in URL bar = Navigate

2. **Best Practices**
   - Save interesting themes by screenshotting
   - Keep bookmarks organized
   - Regularly clear history if it gets too long

3. **Theme Ideas**
   - Use color names: "electric blue", "neon pink"
   - Use moods: "calm and peaceful", "energetic and bright"
   - Use references: "blade runner", "tron", "akira"

4. **API Usage**
   - Don't spam requests (you have a quota)
   - Save good AI responses
   - Use summarization for long articles

## 🆘 Getting Help

- **Issues:** [GitHub Issues](https://github.com/GizzZmo/Cybernetic-Navigator/issues)
- **Documentation:** [Full README](../README.md)
- **Help Panel:** Click "Help" button in the app

## ⭐ Enjoy!

You're all set! Start exploring the cyberpunk web with AI superpowers.

---

**Quick Links:**
- [Main README](../README.md)
- [API Documentation](./API.md)
- [Component Guide](./COMPONENTS.md)
- [Deployment Guide](./DEPLOYMENT.md)
