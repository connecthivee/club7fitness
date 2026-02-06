# 🚀 Quick Start Guide - Club 7 Fitness

## Get Running in 60 Seconds

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open http://localhost:3000 in your browser
```

That's it! The website should now be running locally.

## 📋 What You'll See

The website includes these sections in order:

1. **Hero Section** - Full-screen with scroll parallax
2. **Programs** - 4 training program cards with hover effects
3. **Why Club 7** - 4 value pillars with stagger animations
4. **Instagram** - Social feed grid linking to @club7_fitness_
5. **Testimonials** - 3 member testimonials
6. **Footer** - Contact info and links

## 🎨 Customization Priority List

### 1. Add Your Logo (High Priority)
Edit `src/sections/Hero.jsx` - Replace the text logo with your actual logo image:

```jsx
// Replace this:
<div className="text-club-blue font-bold text-2xl tracking-wider">
  CLUB 7 FITNESS
</div>

// With your logo:
<img src="/path/to/logo.png" alt="Club 7 Fitness" className="h-16" />
```

### 2. Update Instagram Photos (High Priority)
Edit `src/sections/Instagram.jsx` - Replace placeholder gradients with real images:

```jsx
const instagramPosts = [
  { id: 1, image: '/images/instagram-1.jpg' },
  { id: 2, image: '/images/instagram-2.jpg' },
  // ... add your real Instagram post images
]
```

### 3. Update Contact Info (Medium Priority)
Edit `src/sections/Footer.jsx` - Replace placeholder contact details with real information.

### 4. Customize Colors (Optional)
Edit `tailwind.config.js` to match your exact brand colors.

### 5. Add Real Testimonials (Optional)
Edit `src/sections/Testimonials.jsx` with actual member quotes.

## 🌐 Deploy to Production

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: Netlify
```bash
# Build
npm run build

# Upload the 'dist' folder to Netlify
```

### Option 3: Traditional Hosting
```bash
# Build
npm run build

# Upload contents of 'dist' folder to your web server
```

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Kill process on port 3000 (Windows)
npx kill-port 3000

# Or change port in vite.config.js
```

**Dependencies not installing?**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Animations not smooth?**
- Ensure hardware acceleration is enabled in your browser
- Check that no other heavy processes are running

## 📱 Mobile Testing

Test on these breakpoints:
- **Mobile**: 375px (iPhone SE)
- **Tablet**: 768px (iPad)
- **Desktop**: 1440px (Standard laptop)

Use browser dev tools (F12) → Toggle device toolbar

## 🎯 Performance Checklist

- [ ] All animations use Framer Motion (✅ Done)
- [ ] Images are optimized and compressed
- [ ] Fonts are preloaded (✅ Done)
- [ ] Smooth scrolling enabled (✅ Done)
- [ ] Mobile-first responsive design (✅ Done)

## 💡 Tips

1. **Keep animations purposeful** - Don't add more just because you can
2. **Test on real devices** - Emulators don't show true performance
3. **Optimize images** - Use WebP format and compress before upload
4. **Monitor bundle size** - Keep it under 500KB for best performance

## 🆘 Need Help?

- Review the main `README.md` for detailed documentation
- Check Framer Motion docs: https://www.framer.com/motion/
- Check Tailwind CSS docs: https://tailwindcss.com/

---

**Ready to launch? Let's go! 💪**

