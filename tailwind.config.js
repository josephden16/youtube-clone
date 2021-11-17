module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      red: '#FF0000',
      blue: '#2196F3',
      gray: '#898989',
      black: '#000000',
      white: '#FFFFFF',
      lightGray: '#EBEBEB',
      lightGray2: 'rgb(80, 80, 80)',
      lightGray3: '#E5E5E5',
      dark: '#181818',
      dark2: '#28282C'
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
