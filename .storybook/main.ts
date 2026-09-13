import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  stories: ["../stories/**/*.stories.tsx"],
  addons: ["@storybook/addon-docs"],
};

export default config;
