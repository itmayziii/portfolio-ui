module.exports = {
  siteMetadata: {
    title: 'Tommy May III Portfolio',
    description: 'Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.',
    author: 'Tommy May III'
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter', // eslint-disable-line @typescript-eslint/camelcase
        start_url: '/', // eslint-disable-line @typescript-eslint/camelcase
        background_color: '#663399', // eslint-disable-line @typescript-eslint/camelcase
        theme_color: '#663399', // eslint-disable-line @typescript-eslint/camelcase
        display: 'minimal-ui'
        // icon: 'src/images/gatsby-icon.png' // This path is relative to the root of the site.
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
