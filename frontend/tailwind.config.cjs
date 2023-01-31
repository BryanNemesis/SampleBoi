/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rajdhani', 'Helvetica', 'sans-serif'],
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'skewX(3deg) skewY(3deg)' },
          '50%': { transform: 'skewX(-3deg) skewY(-3deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle 10s ease-in-out infinite',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.text-shadow-lg-amber': {
          'text-shadow': '#fde68a 0 0 8px',
        },
        '.bg-wavy-amber': {
          'background-color': '#fffbeb',
          opacity: 0.8,
          'background-image':
            'radial-gradient(circle at center center, #fef3c7, #fcd34d), repeating-radial-gradient(circle at center center, #fcd34d, #fcd34d, 10px, transparent 20px, transparent 10px)',
          'background-blend-mode': 'multiply',
        },
        '.bg-wavy-red': {
          'background-color': '#fee2e2',
          opacity: 0.8,
          'background-image':
            'radial-gradient(circle at center center, #fca5a5, #fee2e2), repeating-radial-gradient(circle at center center, #fca5a5, #fca5a5, 10px, transparent 20px, transparent 10px)',
          'background-blend-mode': 'multiply',
        },
      })
    }),
  ],
}
