import type { StorybookConfig } from "@storybook/core-common";

export const core: StorybookConfig = {
  framework: "@storybook/react-vite",
  core: {
    builder: "@storybook/builder-vite", // 👈 The builder enabled here.
  },
  stories: ["../stories/*.tsx"],
  addons: ["@storybook/addon-essentials"],
  docs: { autodocs: true },
  staticDirs: ["../docs"],
};

export const stories = ["../stories/*.tsx"];

/*export const framework =
  name: "@storybook/react-vite",
  options: {},
};*/

/*

export const docs = {
  autodocs: true,
};

export const staticDirs = ["../docs"];*/

export const framework = {
  name: "@storybook/react-vite",
  options: {},
};

export const docs = {
  autodocs: true,
};
export const addons = ["@chromatic-com/storybook"];
