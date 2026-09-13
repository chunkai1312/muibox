import { createContext } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import type { ButtonProps as MuiButtonProps } from "@mui/material/Button";

export interface DialogContextValue {
  dialog: {
    alert: (options: string | AlertDialogProps) => Promise<void>;
    confirm: (options: string | ConfirmDialogProps) => Promise<boolean>;
    prompt: (options: string | PromptDialogProps) => Promise<string | number>;
    /**
     * Closes every open and pending dialog at once, rejecting each of their
     * promises the same way a cancel or a backdrop click would. Useful on a
     * route change, a logout, or anywhere the context behind the dialogs is
     * about to stop being valid.
     */
    dismissAll: () => void;
  };
}

export interface ButtonProps {
  text?: string;
  color?: MuiButtonProps["color"];
  variant?: MuiButtonProps["variant"];
  startIcon?: MuiButtonProps["startIcon"];
  endIcon?: MuiButtonProps["endIcon"];
}

export interface BaseDialogProps {
  title?: string;
  message?: ReactNode;
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
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

const DialogContext = createContext<DialogContextValue | null>(null);

export default DialogContext;
