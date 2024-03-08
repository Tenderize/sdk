/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./lib/contexts/*.{js,ts,jsx,tsx}",
    "./lib/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}