/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
        digital: ['Digital', 'sans-serif']
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
    plugin(({ addBase }) => {
      addBase({
        'digital': {
          '@font-face': {
            'font-family': "Digital",
            'src': 'url("./src/assets/Minecraft.ttf") format("truetype")'
          }
        }
      })
    }),

    plugin(({ addUtilities }) => {
      addUtilities({
        '.text-shadow-rose': {
          'text-shadow': '#e11d48 2px 2px 0',
        },
        '.slate-glow': {
          'box-shadow': '#f8fafc 0 0 32px, #e2e8f0 0 0 96px, #e2e8f0 0 0 96px inset',
        },
        '.lime-glow': {
          'box-shadow': '#d9f99d 0 0 32px, #ecfccb 0 0 96px, #d9f99d 0 0 96px inset',
        },
        '.bg-wavy-rose': {
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
        '.button-cols-2': {
          'grid-template-columns': 'repeat(2, 9rem)',
        },
        '.button-cols-4': {
          'grid-template-columns': 'repeat(4, 9rem)',
        },
        '.button-cols-6': {
          'grid-template-columns': 'repeat(6, 9rem)',
        },
        '.button-cols-8': {
          'grid-template-columns': 'repeat(8, 9rem)',
        },
      })
    }),
  ],
}
