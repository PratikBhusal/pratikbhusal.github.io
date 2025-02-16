import postcssImport from "postcss-import";
import { purgeCSSPlugin } from "@fullhuman/postcss-purgecss";
import postcssPresetEnv from "postcss-preset-env";
import sortMediaQueries from "postcss-sort-media-queries";
import combineDuplicatedSectors from "postcss-combine-duplicated-selectors";
import cssnano from "cssnano";
import unoCSS from "@unocss/postcss";

export default {
  plugins: [
    postcssImport(),
    unoCSS(),
    sortMediaQueries(),
    combineDuplicatedSectors({ removeDuplicatedValues: true }),
    postcssPresetEnv(),
    purgeCSSPlugin({
      content: ["./**/*.html"],
    }),
    ...(process.env.NODE_ENV === "production" ? [cssnano()] : []),
  ],
};
