module.exports = {
  siteMetadata: {
    title: "visualization",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-typescript",
    `gatsby-transformer-json`,

    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "stateOfJS",
        fieldName: "stateOfJS",
        url: "https://api.stateofjs.com/graphql",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./data/`,
      },
    },
  ],
};
