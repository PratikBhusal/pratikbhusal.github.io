import postcssPlugin from "@jgarber/eleventy-plugin-postcss";
import htmlmin from "html-minifier-terser";
// import { execSync } from "child_process";

/**
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 * @typedef {import('@11ty/eleventy/src/defaultConfig').defaultConfig} EleventyReturnValue
 * @type {(eleventyConfig: UserConfig) => EleventyReturnValue}
 */
export default function (eleventyConfig) {
  // Allows us to use unocss via postcss
  eleventyConfig.addPlugin(postcssPlugin);
  // Ensure that css files can be referenced in the build output directory
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.setServerOptions({
    watch: [
      // Because unocss runs after the DOM is ready, we will get flash of
      // unstyled content (FOUC) that 11ty will not auto-refresh upon by
      // default. To fix this, we need to explicitly declare that the built
      // css file should also be watched by 11ty.
      "dist/assets/css/unocss.css",
    ],
  });

  if (process.env.ELEVENTY_PRODUCTION == "true") {
    eleventyConfig.addTransform("htmlmin", function (content) {
      if ((this.page.outputPath || "").endsWith(".html")) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
        });

        return minified;
      }

      // If not an HTML output, return content as-is
      return content;
    });
  }

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
    },
  };
}
