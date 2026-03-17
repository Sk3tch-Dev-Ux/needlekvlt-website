/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        kvlt: {
          lime: '#c8ff00',
          dark: '#0a0a0a',
          card: '#111111',
          border: '#1a1a1a',
          muted: '#999999',
          discord: '#5865F2',
        },
      },
      fontFamily: {
        display: ['Creepster', 'cursive'],
        body: ['Oswald', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
