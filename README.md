# CLUB 7 FITNESS - Elite Training Website

A premium, high-end gym website built with React, Framer Motion, and Tailwind CSS. Features smooth scroll-linked animations, responsive design, and a modern aesthetic inspired by elite fitness brands.

## 🚀 Tech Stack

- **React 18** - Latest React with hooks
- **Vite** - Lightning-fast build tool and dev server
- **Framer Motion** - Professional-grade animations
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful, consistent icons

## ✨ Features

- **Full-Screen Hero** with scroll-linked parallax effects
- **Programs Section** with hover animations and card effects
- **Why Club 7** section with stagger animations
- **Instagram Integration** with animated grid
- **Testimonials** with smooth reveal animations
- **Responsive Footer** with social links
- **Mobile-First Design** - Fully responsive on all devices
- **Smooth Scrolling** - Premium feel throughout
- **Performance Optimized** - Fast load times and smooth animations

## 🎨 Design Philosophy

- **Premium & Elite** - No gym bro aesthetics
- **Disciplined Motion** - Purposeful, controlled animations
- **Dark Theme** - Deep charcoal with metallic blue accents
- **Modern Typography** - Clean, bold, readable
- **Minimal Clutter** - Focus on content and experience

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Project Structure

```
club7-fitness/
├── src/
│   ├── sections/          # Main page sections
│   │   ├── Hero.jsx
│   │   ├── Programs.jsx
│   │   ├── WhyClub7.jsx
│   │   ├── Instagram.jsx
│   │   ├── Testimonials.jsx
│   │   └── Footer.jsx
│   ├── utils/
│   │   └── motionVariants.js  # Reusable animation variants
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## 🎯 Animation Variants

All animations use Framer Motion with these reusable variants:

- `fadeInUp` - Fade in with upward motion
- `fadeIn` - Simple fade in
- `scaleIn` - Scale up with fade
- `staggerContainer` - Parent container for staggered children
- `slideInLeft/Right` - Horizontal slide animations

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Color Palette

```css
--club-dark: #0a0a0a      /* Primary background */
--club-charcoal: #1a1a1a  /* Secondary background */
--club-blue: #3b82f6      /* Primary accent */
--club-steel: #64748b     /* Text secondary */
--club-accent: #60a5fa    /* Hover states */
```

## 🔗 Instagram Integration

The website links to the official Club 7 Fitness Instagram:
[@club7_fitness_](https://www.instagram.com/club7_fitness_?igsh=bDBscjR6cjl1Z2J5)

## 🚀 Deployment

This project can be deployed to:

- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**
- Any static hosting service

```bash
# Build for production
npm run build

# The dist/ folder contains the production build
```

## 📝 Customization

### Adding Your Logo

Replace the logo text in `src/sections/Hero.jsx` with your actual logo component or image.

### Changing Colors

Edit `tailwind.config.js` to update the color scheme:

```js
colors: {
  'club-dark': '#0a0a0a',
  'club-blue': '#3b82f6',
  // ... customize as needed
}
```

### Adding Real Instagram Posts

Update the `instagramPosts` array in `src/sections/Instagram.jsx` with actual image URLs from your Instagram feed.

## 🎬 Animation Performance

All animations are optimized using:
- `viewport={{ once: true }}` - Animations trigger only once
- CSS transforms - Hardware-accelerated animations
- Framer Motion's optimized rendering

## 📄 License

Built for Club 7 Fitness. All rights reserved.

## 🤝 Contributing

This is a production website. For changes or improvements, please contact the development team.

---

**Built with precision. Designed for champions.**

