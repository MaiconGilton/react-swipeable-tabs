/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: '#4f46e5',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#f2f2f7',
          foreground: '#8e8e93',
        },
        card: {
          DEFAULT: '#ffffff',
          foreground: '#000000',
        },
        // Modern dark mode palette fallback
        dark: {
          bg: '#0a0a0a',
          card: '#111111',
          border: '#333',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
