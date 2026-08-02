/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      },
      colors: {
        'dark-bg': '#0C0C0C',
        'light-text': '#E2EDF8',
        'gradient-start': '#38BDF8',
        'gradient-end': '#A7F3D0',
        'accent-cyan': '#38BDF8',
        'accent-purple': '#A855F7',
      },
    },
  },
  plugins: [],
}

