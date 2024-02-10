/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#e43f5d',
        appbg:'#0f0e17',
        textPrimary:'#fffffe',
        textSecondary:'#a7a9be',
      }
    },
  },
  plugins: [],
}