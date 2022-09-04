module.exports = {
  syntax: "postcss-scss",
  plugins: [
    require("postcss-preset-env"),
    require("autoprefixer"),
    require("postcss-import"),
    require("cssnano"),
    require("postcss-nested"),
    // require("postcss-normalize")({ forceImport: "normalize/opinionated" }),
    require("postcss-normalize"),
  ],
};