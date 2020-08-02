module.exports = {
  siteMetadata: {
    title: 'Ross Zurowski',
    titleTemplate: '%s – Ross Zurowski',
    description: 'Designer and developer from Toronto.',
    url: 'https://rosszurowski.com',
    buildDate: new Date(),
    datUrl:
      'dat://27d79fdff45aa7ece9d563c4aa4542890766da5103347aa4d126a616f75ca79c',
    gps: `40°44'57"N — 140°5'29"E`,
  },
  plugins: [
    'gatsby-plugin-flow',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/content`,
        name: 'data',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1200,
              linkImagesToOriginal: false,
            },
          },
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-netlify',
    {
      resolve: `gatsby-plugin-goatcounter`,
      options: {
        code: 'rosszurowski',
      },
    },
  ],
};
