/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: { DEFAULT: '#070b14', 800: '#0d1322', 700: '#141c31', 600: '#1e2845' },
        sand: { DEFAULT: '#e8d3a2', dim: '#b9a77f', faint: '#7d735c' },
        gold: { DEFAULT: '#d4a64a', dark: '#9c7a2f' },
        nile: { DEFAULT: '#4fb3a9', dark: '#2f7f78' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'sans-serif'],
        display: ['Cinzel', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
