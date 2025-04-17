import { createContext } from "react";

export interface DialogContextValue {
  dialog: {
    alert: (options: string | AlertDialogProps) => Promise<void>;
    confirm: (options: string | ConfirmDialogProps) => Promise<boolean>;
    prompt: (options: string | PromptDialogProps) => Promise<string | number>;
  };
}

export interface ButtonProps {
  text?: string;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  variant?: "text" | "outlined" | "contained";
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
}

export interface BaseDialogProps {
  open?: boolean;
  title?: string;
  message?: React.ReactNode;
}

export interface AlertDialogProps extends BaseDialogProps {
  ok?: ButtonProps;
}

export interface ConfirmDialogProps extends BaseDialogProps {
  ok?: ButtonProps;
  cancel?: ButtonProps;
  throwOnCancel?: boolean;
}

export interface PromptDialogProps extends BaseDialogProps {
  ok?: ButtonProps;
  cancel?: ButtonProps;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string | number;
  inputType?: "string" | "password";
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const DialogContext = createContext<DialogContextValue>({
  dialog: {
    alert: () => Promise.resolve(),
    confirm: () => Promise.resolve(false),
    prompt: () => Promise.resolve(""),
  },
});

export default DialogContext;
