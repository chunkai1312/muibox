import type { Meta, StoryObj } from "@storybook/react-vite";
import { Typography } from "@mui/material";
import Alert from "./components/Alert";
import type { AlertComponentProps } from "./components/Alert";
import type { AlertDialogProps } from "../src";

const meta: Meta<AlertComponentProps> = {
  title: "Alert",
  component: Alert,
};

export default meta;

type Story = StoryObj<AlertComponentProps>;

export const BasicUsage: Story = {
  render: () => <Alert />,
};

export const WithTitleAndMessage: Story = {
  render: () => {
    const options: AlertDialogProps = {
      title: "Alert Dialog",
      message: "This is alert dialog message.",
    };
    return <Alert options={options} />;
  },
};

export const WithCustomButton: Story = {
  render: () => {
    const options: AlertDialogProps = {
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
    const options: AlertDialogProps = {
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
