/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './shared/**/*.{js,ts,jsx,tsx}',
    './auth/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          900: '#1a365d', // Color principal
        },
      },
    },
  },
  plugins: [],
} 