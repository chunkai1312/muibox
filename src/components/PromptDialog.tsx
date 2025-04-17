import { Component } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { PromptDialogProps } from "../DialogContext";

interface PromptProps extends PromptDialogProps {
  open: boolean;
  onClose: (value: string | number | null) => void;
  onExited: () => void;
}

interface PromptState {
  value: string | number | undefined;
}

class PromptDialog extends Component<PromptProps, PromptState> {
  static defaultProps = {
    open: false,
    title: "",
    placeholder: "",
    ok: {
      text: "OK",
      color: "primary" as const,
      variant: "text" as const,
    },
    cancel: {
      text: "Cancel",
      color: "primary" as const,
      variant: "text" as const,
    },
    required: false,
    inputProps: {},
  };

  state = {
    value: this.props.defaultValue,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { value } = this.state;
    const {
      open,
      onClose,
      onExited,
      title,
      message,
      placeholder,
      ok = {},
      cancel = {},
      required,
      inputType,
      inputProps,
    } = this.props;

    const {
      text: okText = "OK",
      color: okColor = "primary",
      variant: okVariant = "text",
      startIcon: okStartIcon,
      endIcon: okEndIcon,
    } = ok;

    const {
      text: cancelText = "Cancel",
      color: cancelColor = "primary",
      variant: cancelVariant = "text",
      startIcon: cancelStartIcon,
      endIcon: cancelEndIcon,
    } = cancel;

    return (
      <Dialog
        fullWidth
        open={open}
        onClose={() => onClose(null)}
        aria-labelledby="prompt-dialog-title"
        aria-describedby="prompt-dialog-message"
        TransitionProps={{
          onExited,
        }}
      >
        <DialogTitle id="prompt-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {typeof message === "string" ? (
            <DialogContentText id="confirm-dialog-message">
              {message}
            </DialogContentText>
          ) : (
            message
          )}
          <TextField
            id="prompt-dialog-text-field"
            onChange={this.handleChange}
            defaultValue={this.props.defaultValue}
            required
            placeholder={placeholder}
            margin="dense"
            fullWidth
            type={inputType}
            autoFocus
            inputProps={inputProps}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => onClose(null)}
            color={cancelColor}
            variant={cancelVariant}
            startIcon={cancelStartIcon}
            endIcon={cancelEndIcon}
          >
            {cancelText}
          </Button>
          <Button
            onClick={() => onClose(value as string | number)}
            color={okColor}
            variant={okVariant}
            disabled={required && !value}
            startIcon={okStartIcon}
            endIcon={okEndIcon}
          >
            {okText}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default PromptDialog;
