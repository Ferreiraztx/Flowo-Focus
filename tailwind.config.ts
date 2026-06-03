import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0A0A0F',
        surface: '#12121A',
        'surface-elevated': '#1A1A26',
        border: '#2A2A3D',
        accent: '#6C63FF',
        'accent-glow': '#6C63FF40',
        'text-primary': '#F0F0FF',
        'text-secondary': '#8888AA',
        success: '#4FFFB0',
        warning: '#FFB347',
        danger: '#FF6B6B',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        heading: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card-hover': '0 0 20px rgba(108, 99, 255, 0.1)',
      },
    },
  },
  plugins: [],
} satisfies Config
