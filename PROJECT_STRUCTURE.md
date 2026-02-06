# 📁 Project Structure - Club 7 Fitness

```
club7-fitness/
│
├── public/                          # Static assets
│   └── vite.svg                    # Favicon placeholder
│
├── src/                            # Source code
│   ├── components/                 # Reusable components
│   │   └── Logo.jsx               # Logo component (customize this)
│   │
│   ├── sections/                   # Page sections (main content)
│   │   ├── Hero.jsx               # ✨ Full-screen hero with parallax
│   │   ├── Programs.jsx           # 💪 Training programs grid
│   │   ├── WhyClub7.jsx          # 🎯 Value propositions
│   │   ├── Instagram.jsx         # 📸 Social media integration
│   │   ├── Testimonials.jsx      # 💬 Member testimonials
│   │   └── Footer.jsx            # 🔗 Footer with links
│   │
│   ├── utils/                     # Utility functions
│   │   └── motionVariants.js     # 🎬 Framer Motion animation presets
│   │
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Global styles + Tailwind
│
├── .eslintrc.cjs                  # ESLint configuration
├── .gitignore                     # Git ignore rules
├── index.html                     # HTML entry point
├── package.json                   # Dependencies and scripts
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.js             # Tailwind customization
├── vite.config.js                 # Vite configuration
│
├── README.md                      # 📖 Full documentation
├── QUICKSTART.md                  # 🚀 Quick setup guide
└── PROJECT_STRUCTURE.md           # 📁 This file
```

## 🎯 Key Files to Customize

### Priority 1: Brand Assets
- `src/sections/Hero.jsx` - Replace logo text with actual logo
- `public/vite.svg` - Replace with real favicon

### Priority 2: Content
- `src/sections/Instagram.jsx` - Add real Instagram photos
- `src/sections/Testimonials.jsx` - Add real testimonials
- `src/sections/Footer.jsx` - Update contact information

### Priority 3: Styling
- `tailwind.config.js` - Customize color palette
- `src/index.css` - Global style adjustments

## 🎨 Animation System

All animations are centralized in `src/utils/motionVariants.js`:

| Variant | Usage | Effect |
|---------|-------|--------|
| `fadeInUp` | Hero, buttons | Fade in + slide up |
| `fadeIn` | General | Simple fade in |
| `scaleIn` | Cards | Scale up from 90% |
| `staggerContainer` | Grid parents | Stagger child animations |
| `slideInLeft/Right` | Side content | Horizontal slides |

## 📱 Responsive Breakpoints

Defined in Tailwind (mobile-first):

```css
/* Default: Mobile (< 768px) */
/* md: Tablet (≥ 768px) */
/* lg: Desktop (≥ 1024px) */
/* xl: Large Desktop (≥ 1280px) */
```

## 🎨 Color System

Defined in `tailwind.config.js`:

```javascript
colors: {
  'club-dark': '#0a0a0a',      // Main background
  'club-charcoal': '#1a1a1a',  // Secondary background
  'club-blue': '#3b82f6',      // Primary accent
  'club-steel': '#64748b',     // Text/subtle elements
  'club-accent': '#60a5fa',    // Hover states
}
```

## 🚀 Build Commands

```bash
npm run dev      # Development server (http://localhost:3000)
npm run build    # Production build → dist/
npm run preview  # Preview production build
```

## 📦 Dependencies

### Core
- `react` - UI library
- `react-dom` - React renderer
- `framer-motion` - Animation library
- `lucide-react` - Icon set

### Styling
- `tailwindcss` - Utility CSS framework
- `autoprefixer` - CSS vendor prefixes
- `postcss` - CSS processor

### Build Tools
- `vite` - Build tool and dev server
- `@vitejs/plugin-react` - React plugin for Vite

## 🎬 Animation Philosophy

1. **Purposeful** - Every animation has a reason
2. **Controlled** - Consistent easing and timing
3. **Premium** - Smooth, professional feel
4. **Performant** - Hardware-accelerated transforms
5. **Once** - Most animations trigger only once on scroll

## 📝 Component Pattern

All section components follow this structure:

```jsx
import { motion } from 'framer-motion'
import { variants } from '../utils/motionVariants'

const Section = () => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={variants}
      >
        {/* Content */}
      </motion.div>
    </section>
  )
}

export default Section
```

## 🎯 Performance Optimizations

✅ **Implemented:**
- Framer Motion with `viewport={{ once: true }}`
- CSS transforms (hardware-accelerated)
- Tailwind CSS purging (production builds)
- Vite code splitting
- Font preloading
- Minimal re-renders

📋 **To Add (Optional):**
- Image lazy loading
- WebP images
- Route-based code splitting
- Service worker for caching

## 🔧 Troubleshooting

**Issue:** Animations laggy on mobile
- **Solution:** Reduce animation complexity, test on real device

**Issue:** Scrolling not smooth
- **Solution:** Already using `scroll-behavior: smooth` in CSS

**Issue:** Build size too large
- **Solution:** Run `npm run build` and check dist size. Should be < 500KB

## 📚 External Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Docs](https://react.dev/)

---

**Everything is ready to run. Just `npm install` and `npm run dev`!**

