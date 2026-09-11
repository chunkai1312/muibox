import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import type { ChangeEvent } from "react";
import type { PromptDialogProps } from "../DialogContext.ts";

interface PromptProps extends PromptDialogProps {
  open: boolean;
  onClose: (value: string | number | null) => void;
  onExited: () => void;
}

function PromptDialog(props: PromptProps) {
  const {
    open,
    onClose,
    onExited,
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
      aria-labelledby="prompt-dialog-title"
      aria-describedby="prompt-dialog-message"
      slotProps={{ transition: { onExited } }}
    >
      <DialogTitle id="prompt-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {typeof message === "string" ? (
          <DialogContentText id="prompt-dialog-message">
            {message}
          </DialogContentText>
        ) : (
          message
        )}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!required || value) handleConfirm();
          }}
        >
          <TextField
            id="prompt-dialog-text-field"
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

export default PromptDialog;
