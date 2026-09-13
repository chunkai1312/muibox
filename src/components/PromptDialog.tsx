import { useId, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import type { ChangeEvent } from "react";
import type { PromptDialogProps } from "../DialogContext.js";

interface PromptProps extends PromptDialogProps {
  open: boolean;
  onClose: (value: string | number | null) => void;
  onExited: () => void;
  hideBackdrop?: boolean;
}

function PromptDialog(props: PromptProps) {
  const {
    open,
    onClose,
    onExited,
    hideBackdrop,
    title = "",
    message,
    placeholder = "",
    ok = {},
    cancel = {},
    required = false,
    defaultValue,
    inputType,
    inputProps = {},
  } = props;

  const [value, setValue] = useState<string | number | undefined>(defaultValue);
  const titleId = useId();
  const messageId = useId();
  const inputId = useId();
  const hasMessage =
    message !== null && message !== undefined && typeof message !== "boolean";
  const hasValue = value !== undefined && value !== "";

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleConfirm = () => {
    onClose(value ?? "");
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={() => onClose(null)}
      hideBackdrop={hideBackdrop}
      aria-labelledby={titleId}
      aria-describedby={hasMessage ? messageId : undefined}
      slotProps={{ transition: { onExited } }}
    >
      <DialogTitle id={titleId}>{title}</DialogTitle>
      <DialogContent>
        {typeof message === "string" ? (
          <DialogContentText id={messageId}>
            {message}
          </DialogContentText>
        ) : hasMessage ? (
          <div id={messageId}>{message}</div>
        ) : (
          null
        )}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!required || hasValue) handleConfirm();
          }}
        >
          <TextField
            id={inputId}
            onChange={handleChange}
            defaultValue={defaultValue}
            required={required}
            placeholder={placeholder}
            margin="dense"
            fullWidth
            // `inputType` speaks the public API's vocabulary ("string"), which
            // is not a valid HTML input type.
            type={inputType === "password" ? "password" : "text"}
            autoFocus
            slotProps={{ htmlInput: inputProps }}
          />
        </form>
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
          onClick={handleConfirm}
          color={okColor}
          variant={okVariant}
          disabled={required && !hasValue}
          startIcon={okStartIcon}
          endIcon={okEndIcon}
        >
          {okText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PromptDialog;
