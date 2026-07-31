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
          orange: '#FF5722',
          orangeHover: '#E64A19',
          dark: '#0F172A',
          card: '#1E293B',
          accent: '#F97316'
        }
      }
    },
  },
  plugins: [],
}
