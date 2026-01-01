/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'burnt-orange': '#D4693A',
        'terracotta': '#C95D3F',
        'warm-brown': '#8B5A3C',
        'sand': '#E8C4A0',
        'deep-green': '#2D5016',
        'dark-gold': '#B8860B',
      },
    },
  },
  plugins: [],
}
