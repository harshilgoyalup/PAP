/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#2563EB',
          dark: '#0F172A',
          sky: '#38BDF8',
        }
      }
    },
  },
  plugins: [],
}
