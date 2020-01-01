const path = require('path')
const glob = require('glob')

const config = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss')
  ]
}

if (process.env.NODE_ENV === 'production') {
  const purgecss = require('@fullhuman/postcss-purgecss')({
    content: [
      ...glob.sync(path.resolve(__dirname, 'src/**/*'), { nodir: true })
    ],
    // Allows tailwind ":" in class names.
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
    whitelistPatterns: [
      // CSS Modules use this format [filename]\_[classname]\_\_[hash] as mentioned here https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/
      /.*_.*__.*/g
    ]
  })

  config.plugins.push(purgecss)
}

module.exports = config
