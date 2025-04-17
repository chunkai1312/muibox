// Confirm.stories.tsx

import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Prompt from "./components/Prompt"; // ajuste o caminho se necessário
// ajuste conforme seu projeto
import { createTheme, Typography } from "@mui/material"; // função que engloba ThemeProvider, DialogProvider, etc
import { ThemeProvider } from "@mui/material/styles";
import { PromptDialogProps } from "../src";
import { DialogProvider } from "../src";
import type { PromptComponentProps } from "./components/Prompt";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const theme = createTheme();

const meta: Meta<typeof Prompt> = {
  title: "Prompt",
  component: Prompt,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <DialogProvider>
          <Story />
        </DialogProvider>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<PromptComponentProps>;

export const WithTitleAndMessage: Story = {
  render: () => {
    const options: PromptDialogProps = {
      title: "Prompt Dialog",
      message: "This is prompt dialog message.",
    };
    return <Prompt options={options} />;
  },
};

export const WithInputPropsMaxLength15: Story = {
  render: () => {
    const options: PromptDialogProps = {
      title: "Prompt Dialog",
      message: "This is prompt dialog message with max length of 15.",
      inputProps: {
        maxLength: 15,
      },
    };
    return <Prompt options={options} />;
  },
};

export const WithRequired: Story = {
  render: () => {
    const options: PromptDialogProps = {
      title: "Prompt Dialog",
      message: "This is prompt dialog message.",
      required: true,
    };
    return <Prompt options={options} />;
  },
};

export const WithDefaultValue: Story = {
  render: () => {
    const options: PromptDialogProps = {
      title: "Prompt Dialog",
      message: "This is prompt dialog message.",
      defaultValue: "Bob",
      required: true,
    };
    return <Prompt options={options} />;
  },
};

export const WithIconButtons: Story = {
  render: () => {
    const options: PromptDialogProps = {
      title: "Prompt Dialog",
      message: "This is prompt dialog message.",
      defaultValue: "Bob",
      required: true,
      ok: {
        text: "OK",
        color: "primary",
        startIcon: <CheckIcon />,
      },
      cancel: {
        text: "Cancel",
        color: "primary",
        startIcon: <CloseIcon />,
      },
    };
    return <Prompt options={options} />;
  },
};

export const WithPasswordTypeInput: Story = {
  render: () => {
    const options: PromptDialogProps = {
      title: "Prompt Dialog With Password Input",
      message: "This is prompt dialog message.",
      defaultValue: "Bob",
      required: true,
      inputType: "password",
      ok: {
        text: "OK",
        color: "primary",
        startIcon: <CheckIcon />,
      },
      cancel: {
        text: "Cancel",
        color: "primary",
        startIcon: <CloseIcon />,
      },
    };
    return <Prompt options={options} />;
  },
};
