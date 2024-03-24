/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['../content/*.md', '../layouts/**/*.html', '../public/*.html'],
  theme: {
    extend: {
      keyframes: {
        textIn: {
          '0%, 30%': { opacity: '0', transform: 'translateY(-100%)' },
          '35%, 60%': { opacity: '1', transform: 'translateY(0)' },
          '75%, 100%': { opacity: '0', transform: 'translateY(100%)' },
        },
      },
      animation: {
        'slide-in-out': 'textIn 10s infinite',
      },
    },
  },
  plugins: [],
};
