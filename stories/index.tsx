import React from "react";
import { storiesOf } from "@storybook/react";
import { DialogProvider, withDialog } from "../src";
import { Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "./components/Alert";
import Confirm from "./components/Confirm";
import Prompt from "./components/Prompt";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  AlertDialogProps,
  ConfirmDialogProps,
  PromptDialogProps,
  WithDialogProps,
} from "../src";

const theme = createTheme();

// Helper to wrap stories with providers
const withProviders = (Story: React.ComponentType<any>) => (
  <ThemeProvider theme={theme}>
    <DialogProvider>
      <Story />
    </DialogProvider>
  </ThemeProvider>
);

// Story components with options
interface WithOptionsProps {
  options?: any;
}

const AlertWithOptions = withDialog()(
  ({ dialog, options }: WithDialogProps & WithOptionsProps) => (
    <Alert dialog={dialog} options={options} />
  )
);

const ConfirmWithOptions = withDialog()(
  ({ dialog, options }: WithDialogProps & WithOptionsProps) => (
    <Confirm dialog={dialog} options={options} />
  )
);

const PromptWithOptions = withDialog()(
  ({ dialog, options }: WithDialogProps & WithOptionsProps) => (
    <Prompt dialog={dialog} options={options} />
  )
);

storiesOf("Alert", module)
  .add("basic usage", () => withProviders(Alert))
  .add("with title and message", () => {
    const options: AlertDialogProps = {
      title: "Alert Dialog",
      message: "This is alert dialog message.",
    };
    return withProviders(() => <AlertWithOptions options={options} />);
  })
  .add("with custom button", () => {
    const options: AlertDialogProps = {
      title: "Alert Dialog",
      message: "This is alert dialog message.",
      ok: {
        text: `Yes`,
        color: `primary`,
        variant: `contained`,
      },
    };
    return withProviders(() => <AlertWithOptions options={options} />);
  })
  .add("with custom jsx on message", () => {
    const options: AlertDialogProps = {
      title: "Alert Dialog",
      message: (
        <Typography color="secondary">
          This is a Typography Component with color secondary.
        </Typography>
      ),
    };
    return withProviders(() => <AlertWithOptions options={options} />);
  });

storiesOf("Confirm", module)
  .add("basic usage", () => withProviders(Confirm))
  .add("with title and message", () => {
    const options: ConfirmDialogProps = {
      title: "Confirm Dialog",
      message: "This is confirm dialog message.",
    };
    return withProviders(() => <ConfirmWithOptions options={options} />);
  })
  .add("with custom buttons", () => {
    const options: ConfirmDialogProps = {
      title: "Confirm Dialog",
      message: "This is confirm dialog message.",
      ok: {
        text: `Yes`,
        color: `primary`,
        variant: `contained`,
      },
      cancel: {
        text: `No`,
        color: `secondary`,
        variant: `outlined`,
      },
    };
    return withProviders(() => <ConfirmWithOptions options={options} />);
  })
  .add("with custom jsx on message", () => {
    const options: ConfirmDialogProps = {
      title: "Confirm Dialog",
      message: (
        <Typography color="secondary">
          This is a Typography Component with color secondary.
        </Typography>
      ),
    };
    return withProviders(() => <ConfirmWithOptions options={options} />);
  });

storiesOf("Prompt", module)
  .add("basic usage", () => withProviders(Prompt))
  .add("with title and message", () => {
    const options: PromptDialogProps = {
      title: "Prompt Dialog",
      message: "This is prompt dialog message.",
    };
    return withProviders(() => <PromptWithOptions options={options} />);
  })
  .add("with inputProps - maxLength 15", () => {
    const options: PromptDialogProps = {
      title: "Prompt Dialog",
      message: "This is prompt dialog message with max length of 15.",
      inputProps: {
        maxLength: 15,
      },
    };
    return withProviders(() => <PromptWithOptions options={options} />);
  })
  .add("with required", () => {
    const options: PromptDialogProps = {
      title: "Prompt Dialog",
      message: "This is prompt dialog message.",
      required: true,
    };
    return withProviders(() => <PromptWithOptions options={options} />);
  })
  .add("with default value", () => {
    const options: PromptDialogProps = {
      title: "Prompt Dialog",
      message: "This is prompt dialog message.",
      defaultValue: "Bob",
      required: true,
    };
    return withProviders(() => <PromptWithOptions options={options} />);
  })
  .add("with icon buttons", () => {
    const options: PromptDialogProps = {
      title: "Prompt Dialog",
      message: "This is prompt dialog message.",
      defaultValue: "Bob",
      required: true,
      ok: {
        text: `OK`,
        color: `primary`,
        startIcon: <CheckIcon />,
      },
      cancel: {
        text: `Cancel`,
        color: `primary`,
        startIcon: <CloseIcon />,
      },
    };
    return withProviders(() => <PromptWithOptions options={options} />);
  })
  .add("with password type input", () => {
    const options: PromptDialogProps = {
      title: "Prompt Dialog With Password Input",
      message: "This is prompt dialog message.",
      defaultValue: "Bob",
      required: true,
      inputType: "password",
      ok: {
        text: `OK`,
        color: `primary`,
        startIcon: <CheckIcon />,
      },
      cancel: {
        text: `Cancel`,
        color: `primary`,
        startIcon: <CloseIcon />,
      },
    };
    return withProviders(() => <PromptWithOptions options={options} />);
  });
