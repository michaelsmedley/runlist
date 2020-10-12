module.exports = {
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        // prependData: `@import "@/assets/style/_variables.scss";@import "@/assets/style/_mixins.scss";`,
      },
    },
  },
};
