import { PureComponent, ReactNode } from "react";
import AlertDialog from "./components/AlertDialog";
import ConfirmDialog from "./components/ConfirmDialog";
import PromptDialog from "./components/PromptDialog";
import DialogContext from "./DialogContext";
import type {
  AlertDialogProps,
  ConfirmDialogProps,
  PromptDialogProps,
} from "./DialogContext";

interface DialogProviderProps {
  children: ReactNode;
}

interface DialogState {
  alertDialog:
    | (AlertDialogProps & {
        open: boolean;
        resolve: (value?: void) => void;
        reject: () => void;
      })
    | null;
  confirmDialog:
    | (ConfirmDialogProps & {
        open: boolean;
        resolve: (value: boolean) => void;
        reject: () => void;
      })
    | null;
  promptDialog:
    | (PromptDialogProps & {
        open: boolean;
        resolve: (value: string | number) => void;
        reject: () => void;
      })
    | null;
}

class DialogProvider extends PureComponent<DialogProviderProps, DialogState> {
  state: DialogState = {
    alertDialog: null,
    confirmDialog: null,
    promptDialog: null,
  };

  handleAlertDialogClose = () => {
    const { alertDialog } = this.state;
    if (!alertDialog) return;

    this.setState({
      alertDialog: { ...alertDialog, open: false },
    });
    return alertDialog.resolve();
  };

  handleConfirmDialogClose = (value?: boolean) => {
    const { confirmDialog } = this.state;
    if (!confirmDialog) return;

    const { throwOnCancel = true } = confirmDialog;
    this.setState({
      confirmDialog: { ...confirmDialog, open: false },
    });

    if (throwOnCancel) {
      return value ? confirmDialog.resolve(value) : confirmDialog.reject();
    } else {
      return [true, false].includes(value as boolean)
        ? confirmDialog.resolve(value as boolean)
        : confirmDialog.reject();
    }
  };

  handlePromptDialogClose = (value: string | number | null) => {
    const { promptDialog } = this.state;
    if (!promptDialog) return;

    this.setState({
      promptDialog: { ...promptDialog, open: false },
    });
    return value ? promptDialog.resolve(value) : promptDialog.reject();
  };

  handleExited = () => {
    this.setState({
      alertDialog: null,
      confirmDialog: null,
      promptDialog: null,
    });
  };

  alert = (options: string | AlertDialogProps): Promise<void> => {
    return typeof options === "string"
      ? new Promise((resolve, reject) => {
          this.setState({
            alertDialog: {
              message: options,
              resolve,
              reject,
              open: true,
            },
          });
        })
      : new Promise((resolve, reject) => {
          this.setState({
            alertDialog: {
              ...options,
              resolve,
              reject,
              open: true,
            },
          });
        });
  };

  confirm = (options: string | ConfirmDialogProps): Promise<boolean> => {
    return typeof options === "string"
      ? new Promise((resolve, reject) => {
          this.setState({
            confirmDialog: {
              message: options,
              resolve,
              reject,
              open: true,
            },
          });
        })
      : new Promise((resolve, reject) => {
          this.setState({
            confirmDialog: {
              ...options,
              resolve,
              reject,
              open: true,
            },
          });
        });
  };

  prompt = (options: string | PromptDialogProps): Promise<string | number> => {
    return typeof options === "string"
      ? new Promise((resolve, reject) => {
          this.setState({
            promptDialog: {
              message: options,
              resolve,
              reject,
              open: true,
            },
          });
        })
      : new Promise((resolve, reject) => {
          this.setState({
            promptDialog: {
              ...options,
              resolve,
              reject,
              open: true,
            },
          });
        });
  };

  dialog = {
    alert: this.alert,
    confirm: this.confirm,
    prompt: this.prompt,
  };

  render() {
    const { children } = this.props;
    const { alertDialog, confirmDialog, promptDialog } = this.state;

    return (
      <DialogContext.Provider value={{ dialog: this.dialog }}>
        {children}
        {alertDialog && (
          <AlertDialog
            {...alertDialog}
            open={alertDialog.open}
            onClose={this.handleAlertDialogClose}
            onExited={this.handleExited}
          />
        )}
        {confirmDialog && (
          <ConfirmDialog
            {...confirmDialog}
            open={confirmDialog.open}
            onClose={this.handleConfirmDialogClose}
            onExited={this.handleExited}
          />
        )}
        {promptDialog && (
          <PromptDialog
            {...promptDialog}
            open={promptDialog.open}
            onClose={this.handlePromptDialogClose}
            onExited={this.handleExited}
          />
        )}
      </DialogContext.Provider>
    );
  }
}

export default DialogProvider;
