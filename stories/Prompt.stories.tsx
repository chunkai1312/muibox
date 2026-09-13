import type { Meta, StoryObj } from "@storybook/react-vite";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Prompt from "./components/Prompt";
import type { PromptComponentProps } from "./components/Prompt";
import type { PromptDialogProps } from "../src";

const meta: Meta<PromptComponentProps> = {
  title: "Prompt",
  component: Prompt,
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
