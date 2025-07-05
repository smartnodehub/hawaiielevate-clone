/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hawaii-blue': '#1e40af',
        'ocean-blue': '#0ea5e9',
        'sunset-orange': '#fb923c',
        'palm-green': '#16a34a',
      }
    },
  },
  plugins: [],
}