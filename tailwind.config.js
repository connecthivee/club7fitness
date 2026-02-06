/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'club-dark': '#0a0a0a',
        'club-charcoal': '#1a1a1a',
        'club-blue': '#3b82f6',
        'club-steel': '#64748b',
        'club-accent': '#60a5fa',
      },
      fontFamily: {
        'sans': ['Poppins', 'system-ui', 'sans-serif'],
        'display': ['Montserrat', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

