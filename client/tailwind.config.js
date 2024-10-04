/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "grey-light": "#BFAE99",
        "beige": "#926B3B",
        "beige-light": "#FFE6CE",
        "beige-medium": "#FDCFA6",
        "grey-dark": "#8C7A64",
        "grey-medium": "#363E40",
        "green-dark": "#0C260B",
        "red-light": "#D94343",
        "red-dark": "#A61420",
        "black-light": "#1B2226",
      }
    },
    screens: {
      'xs': '400px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
  darkMode: 'class'
}