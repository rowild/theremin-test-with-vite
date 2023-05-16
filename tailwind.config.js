/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "!/node_modules/",
    "!/public/",
    "./index.html",
    "./*.{.html,js}",
    "!/node_modules/",
    "!/public/",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

