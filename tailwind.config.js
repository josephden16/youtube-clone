module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      red: '#FF0000',
      gray: '#898989',
      black: '#000000',
      white: '#FFFFFF',
      lightGray: '#EBEBEB',
      dark: '#18151E'
    },
    fontFamily: ['Mulish', 'sans-serif'],
    extend: {},
  },

  variants: {
    extend: {},
  },
  plugins: [],
}
