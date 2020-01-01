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
    backgroundColor: theme => ({
      ...theme('colors')
    }),
    extend: {}
  },
  variants: {},
  plugins: []
}
