require(`dotenv`).config();

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;

module.exports = {
  siteMetadata: {
    // You can overwrite values here that are used for the SEO component
    // You can also add new values here to query them like usual
    // See all options: https://github.com/LekoArts/gatsby-themes/blob/main/themes/gatsby-theme-cara/gatsby-config.js
    siteTitle: `Arun Elanthamil - Fullstack developer | Website, Web apps, SEO optimization...`,
    siteTitleAlt: `Arun Elanthamil - Fullstack developer | Website, Web apps, SEO optimization...`,
    siteHeadline: `Website, Web apps, SEO optimization, Statis site generation | Page speed increase, Performance update`,
    siteUrl: `https://arun-et-008.netlify.app`,
    siteDescription: `Design to Dev - Frontend developer with a taste for good design | Website, Web apps, SEO optimization, Statis site generation | Page speed increase, Performance update`,
    siteLanguage: `en`,
    siteImage: `/banner.jpg`,
    author: `Arun elanthamil`,
    blogAuthor: {
      name: `Arun elanthamil`,
      summary: `who lives and works in India, building useful things.`,
    },
    social: {
      twitter: `et_arun`,
    },
    twitterUsername: "et_arun",
    twitterUrl: "https://twitter.com/et_arun",
    keywords: `web development, web design, seo, digital marketing, web services, content marketing, blog posting, react, javascript`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-cara`,
      // See the theme's README for all available options
      options: {},
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          // `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Arun Elanthamil`,
        short_name: `Et-008`,
        description: `Design to Dev - Frontend developer with a taste for good design`,
        start_url: `/`,
        background_color: `#141821`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#f6ad55`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-plugin-gatsby-cloud`,
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
  ].filter(Boolean),
};
