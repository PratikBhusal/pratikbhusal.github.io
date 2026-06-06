import type { Config } from "prettier";

export default {
    plugins: ["prettier-plugin-jinja-template"],
    overrides: [
        {
            files: ["*.njk"],
            options: {
                parser: "jinja-template",
            },
        },
    ],
} as const satisfies Config;
