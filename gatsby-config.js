module.exports = {
  siteMetadata: {
    title: 'Tommy May III Portfolio',
    description: 'Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.',
    author: 'Tommy May III'
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Full Heap Developer',
        short_name: 'FHD', // eslint-disable-line @typescript-eslint/camelcase
        start_url: '/', // eslint-disable-line @typescript-eslint/camelcase
        background_color: '#1f2833', // eslint-disable-line @typescript-eslint/camelcase
        theme_color: '#aaa', // eslint-disable-line @typescript-eslint/camelcase
        display: 'standalone',
        icon: 'src/assets/icons/fhd-logo.png' // This path is relative to the root of the site.
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
