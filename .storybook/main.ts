import type { StorybookConfig } from "@storybook/web-components-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-a11y", "storybook-addon-pseudo-states", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  core: {},
  docs: {
    autodocs: "tag",
  },
  staticDirs: ['../src/assets/'], //use "logo.png" if path is "../src/assets/logo.png"
};
export default config;
