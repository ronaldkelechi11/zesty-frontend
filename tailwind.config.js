/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ee252f'
      },
      fontFamily: {
        poppins: 'Poppins',
        oswald: 'Oswald',
        grotesk: 'Grotesk'
      }
    },
  },
  plugins: [],
}

