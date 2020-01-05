// https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/
const systemFonts = [
  '-apple-system',
  'BlinkMacSystemFont',
  '“Segoe UI”',
  '“Roboto”',
  '“Oxygen”',
  '“Ubuntu”',
  '“Cantarell”',
  '“Fira Sans”',
  '“Droid Sans”',
  '“Helvetica Neue”',
  'sans-serif'
]

module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      blue: {
        dark: '#1f2833'
      },
      teal: '#66fcf1',
      gray: {
        default: '#e5e5e5',
        light: '#f2f2f2',
        dark: '#aaa',
        darker: '#484848'
      }
    },
    fontFamily: {
      roboto: ['Roboto', ...systemFonts],
      'roboto-italic': ['RobotoItalic', ...systemFonts],
      'roboto-light': ['RobotoLight', ...systemFonts],
      'roboto-light-italic': ['RobotoLightItalic', ...systemFonts],
      'roboto-bold': ['RobotoBold', ...systemFonts],
      'roboto-bold-italic': ['RobotoBoldItalic', ...systemFonts]
    },
    backgroundColor: theme => ({
      ...theme('colors')
    }),
    extend: {}
  },
  variants: {},
  plugins: []
}
