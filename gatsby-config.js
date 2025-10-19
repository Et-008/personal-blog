const lost = require('lost')
const pxtorem = require('postcss-pxtorem')

const url = 'https://et-008.in'

module.exports = {
  siteMetadata: {
    url,
    siteUrl: url,
    title: 'Arun Elanthamil',
    subtitle:
      'Software developer(MERN), excited about new tech, interested in finding the roots, CLI > GUI, Books >> PDFs.',
    copyright: '© All rights reserved.',
    disqusShortname: '',
    menu: [
      {
        label: 'Articles',
        path: '/',
      },
      {
        label: 'About me',
        path: '/about/',
      },
      // {
      //   label: 'Projects',
      //   path: '/projects',
      // },
    ],
    author: {
      name: 'Arun Elanthamil',
      email: 'arunet008@gmail.com',
      twitter: 'et_arun',
      github: 'Et-008',
      instagram: 'arun_elanthamil',
      whatsapp: '+918825579642',
      rss: '#',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                url
                title
                description: subtitle
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.edges.map(edge =>
                Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.url + edge.node.fields.slug,
                  guid: site.siteMetadata.url + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              ),
            query: `{
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
                ) {
                  edges {
                    node {
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                        layout
                        draft
                        description
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 960,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: { wrapperStyle: 'margin-bottom: 1.0725rem' },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: { trackingId: 'UA-73379983-2' },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['roboto:400,400i,500,700'],
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [
          lost(),
          pxtorem({
            rootValue: 16,
            unitPrecision: 5,
            propList: [
              'font',
              'font-size',
              'line-height',
              'letter-spacing',
              'margin',
              'margin-top',
              'margin-left',
              'margin-bottom',
              'margin-right',
              'padding',
              'padding-top',
              'padding-left',
              'padding-bottom',
              'padding-right',
              'border-radius',
              'width',
              'max-width',
            ],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0,
          }),
        ],
        precision: 8,
      },
    },
    {
      resolve: 'gatsby-plugin-csp',
      options: {
        disableOnDev: false,
        reportOnly: false,
        mergeScriptHashes: true,
        mergeStyleHashes: true,
        mergeDefaultDirectives: true,
        directives: {
          'script-src':
            "'self' 'unsafe-eval' www.google-analytics.com https://cdn.jsdelivr.net",
          'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com",
          'style-src-elem':
            "'self' 'unsafe-inline' blob: https://fonts.googleapis.com",
          'img-src':
            "'self' data: https://media.geeksforgeeks.org https://developer.mozilla.org https://images.unsplash.com/photo-1701311310084-159429e16320 https://lang-q.com https://images.unsplash.com/photo-1536765659537-ac6b544ea73b https://www.svgrepo.com",
          'connect-src':
            "'self' https://previewbox.link https://cdn.jsdelivr.net",
          'font-src': "'self' data: https://fonts.gstatic.com",
        },
      },
    },
  ],
}
