// Confirm.stories.tsx

import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Confirm from "./components/Confirm"; // ajuste o caminho se necessário
// ajuste conforme seu projeto
import { createTheme, Typography } from "@mui/material"; // função que engloba ThemeProvider, DialogProvider, etc
import { ThemeProvider } from "@mui/material/styles";
import { ConfirmDialogProps } from "../src";
import { DialogProvider } from "../src";
import type { ConfirmComponentProps } from "./components/Confirm";

const theme = createTheme();

const meta: Meta<typeof Confirm> = {
  title: "Confirm",
  component: Confirm,
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
type Story = StoryObj<ConfirmComponentProps>;

export const BasicUsage: Story = {
  render: () => <Confirm />,
};

export const WithTitleAndMessage: Story = {
  render: () => {
    const options: ConfirmDialogProps = {
      title: "Confirm Dialog",
      message: "This is confirm dialog message.",
    };
    return <Confirm options={options} />;
  },
};

export const WithCustomButtons: Story = {
  render: () => {
    const options: ConfirmDialogProps = {
      title: "Confirm Dialog",
      message: "This is confirm dialog message.",
      ok: {
        text: "Yes",
        color: "primary",
        variant: "contained",
      },
      cancel: {
        text: "No",
        color: "secondary",
        variant: "outlined",
      },
    };
    return <Confirm options={options} />;
  },
};

export const WithCustomJsxMessage: Story = {
  render: () => {
    const options: ConfirmDialogProps = {
      title: "Confirm Dialog",
      message: (
        <Typography color="secondary">
          This is a Typography Component with color secondary.
        </Typography>
      ),
    };
    return <Confirm options={options} />;
  },
};
