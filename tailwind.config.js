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
    fontFamily: {
      sans: ['Mulish', 'sans-serif']
    },
    extend: {
      borderRadius: theme => ({
        'circle': '50%'
      }),
      backgroundColor: theme => ({
        'transparent': 'transparent'
      }),
      borderWidth: theme => ({
        '1': '1px'
      })
    },
  },

  variants: {
    extend: {},
  },
  plugins: [],
}
