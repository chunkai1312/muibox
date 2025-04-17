import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Alert from "./components/Alert"; // ajuste o caminho conforme necessário
import { ThemeProvider } from "@mui/material/styles";
import { DialogProvider } from "../src";
import { createTheme, Typography } from "@mui/material";

const theme = createTheme();

const meta: Meta<typeof Alert> = {
  title: "Alert",
  component: Alert,
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

type Story = StoryObj<typeof Alert>;

export const BasicUsage: Story = {
  render: () => <Alert />,
};

export const WithTitleAndMessage: Story = {
  render: () => {
    const options = {
      title: "Alert Dialog",
      message: "This is alert dialog message.",
    };
    return <Alert options={options} />;
  },
};

export const WithCustomButton: Story = {
  render: () => {
    const options = {
      title: "Alert Dialog",
      message: "This is alert dialog message.",
      ok: {
        text: "Yes",
        color: "primary",
        variant: "contained",
      },
    };
    return <Alert options={options} />;
  },
};

export const WithCustomJsxMessage: Story = {
  render: () => {
    const options = {
      title: "Alert Dialog",
      message: (
        <Typography color="secondary">
          This is a Typography Component with color secondary.
        </Typography>
      ),
    };
    return <Alert options={options} />;
  },
};
