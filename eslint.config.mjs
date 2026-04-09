import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import unocss from "@unocss/eslint-config/flat";
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  // Just using `unocss` does not look at html files
  unocss,

  // // Explicitly specifying `files` does not work either.
  // {
  //   files: ["**/*.html"],
  //   plugins: {
  //     unocss
  //   }
  // }
);
