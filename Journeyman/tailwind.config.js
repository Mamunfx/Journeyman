/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customColor: 'rgb(102, 179, 179)',
      },
    },
  },
  plugins: [require('daisyui'),],
}

