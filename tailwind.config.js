/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eefbf1',
          100: '#d7f5df',
          200: '#b0e9c1',
          300: '#7ad69d',
          400: '#45bd78',
          500: '#22a35d',
          600: '#158049',
          700: '#12653c',
          800: '#125033',
          900: '#10422b',
        },
      },
    },
  },
  plugins: [],
}

