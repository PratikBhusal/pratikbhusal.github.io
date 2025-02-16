import presetUno from "@unocss/preset-uno";
import type { UserConfig } from "@unocss/core";
import presetAttributify from "@unocss/preset-attributify";
import { defineConfig } from "unocss";

const uno_config: UserConfig = {
  presets: [presetUno(), presetAttributify()],
};

export default defineConfig(uno_config);
