import type { Meta, StoryObj } from "@storybook/react-vite";
import { Typography } from "@mui/material";
import Confirm from "./components/Confirm";
import type { ConfirmComponentProps } from "./components/Confirm";
import type { ConfirmDialogProps } from "../src";

const meta: Meta<ConfirmComponentProps> = {
  title: "Confirm",
  component: Confirm,
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
