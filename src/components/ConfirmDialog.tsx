import { useId } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import type { ConfirmDialogProps } from "../DialogContext.js";

export interface ConfirmProps extends ConfirmDialogProps {
  open: boolean;
  onClose: (value?: boolean) => void;
  onExited: () => void;
  hideBackdrop?: boolean;
}

function ConfirmDialog(props: ConfirmProps) {
  const {
    open,
    onClose,
    onExited,
    hideBackdrop,
    title,
    message,
    ok = {},
    cancel = {},
  } = props;
  const titleId = useId();
  const messageId = useId();
  const hasMessage =
    message !== null && message !== undefined && typeof message !== "boolean";
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
          onClick={() => onClose(false)}
          color={cancelColor}
          variant={cancelVariant}
          startIcon={cancelStartIcon}
          endIcon={cancelEndIcon}
        >
          {cancelText}
        </Button>
        <Button
          onClick={() => onClose(true)}
          color={okColor}
          variant={okVariant}
          startIcon={okStartIcon}
          endIcon={okEndIcon}
          autoFocus
        >
          {okText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
