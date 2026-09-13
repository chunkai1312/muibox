import { useId } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import type { AlertDialogProps } from "../DialogContext.js";

interface AlertProps extends AlertDialogProps {
  open: boolean;
  onClose: () => void;
  onExited: () => void;
  hideBackdrop?: boolean;
}

function AlertDialog(props: AlertProps) {
  const { open, onClose, onExited, hideBackdrop, title, message, ok = {} } = props;
  const titleId = useId();
  const messageId = useId();
  const hasMessage =
    message !== null && message !== undefined && typeof message !== "boolean";
  const {
    text = "OK",
    color = "primary",
    variant = "text",
    startIcon,
    endIcon,
  } = ok;

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={() => onClose()}
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
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => onClose()}
          color={color}
          variant={variant}
          startIcon={startIcon}
          endIcon={endIcon}
          autoFocus
        >
          {text}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertDialog;
