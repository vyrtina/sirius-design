import type { StorybookConfig } from "@storybook/web-components-vite";
import { withoutVitePlugins } from "@storybook/builder-vite";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-a11y",
        "storybook-addon-pseudo-states",
        "@storybook/addon-interactions",
    ],
    framework: {
        name: "@storybook/web-components-vite",
        options: {
            builder: {
                viteConfigPath: "./vite.config.ts",
            },
        },
    },
    core: {
        builder: "@storybook/builder-vite",
    },
    staticDirs: ["../src/assets/"], //use "logo.png" if path is "../src/assets/logo.png"
    async viteFinal(config) {
        return {
            ...config,
            plugins: await withoutVitePlugins(config.plugins, [
                "vite:dts",
                "vite:lib-inject-css",
            ]),
        };
    },
};
export default config;
