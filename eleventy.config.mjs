import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";

import viteConfig from "./vite.config.mts";

export default function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy({ public: "." });
    eleventyConfig.addPassthroughCopy("src/main.ts");
    eleventyConfig.addPassthroughCopy("src/style.css");
    eleventyConfig.setServerOptions({
        showAllHosts: true,
    });

    eleventyConfig.addPlugin(EleventyVitePlugin, {
        viteOptions: viteConfig,
    });

    return {
        dir: {
            input: "src",
            output: "dist",
        },
    };
}
