import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import type { AlertDialogProps } from "../DialogContext.ts";

interface AlertProps extends AlertDialogProps {
  open: boolean;
  onClose: () => void;
  onExited: () => void;
}

function AlertDialog(props: AlertProps) {
  const { open, onClose, onExited, title, message, ok = {} } = props;
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
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-message"
      slotProps={{ transition: { onExited } }}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {typeof message === "string" ? (
          <DialogContentText id="alert-dialog-message">
            {message}
          </DialogContentText>
        ) : (
          message
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
