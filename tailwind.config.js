/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        archivo: ['Archivo Black', 'sans-serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        header: '#f0ece7',
        background: '#FFFEFC',
        accent: '#E69B5C',
        primary: '#748A7F',
      },
    },
  },
  plugins: [require("daisyui")],
}

