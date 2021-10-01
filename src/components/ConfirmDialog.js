import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

function ConfirmDialog (props, context) {
  const { open, onClose, onExited, title, message, ok, cancel } = props
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={() => onClose(false)}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-message"
      TransitionProps={{
        onExited
      }}>
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {typeof message === `string`
          ? <DialogContentText id="confirm-dialog-message">{message}</DialogContentText>
          : message}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)} color={cancel.color} variant={cancel.variant} startIcon={cancel.startIcon} endIcon={cancel.endIcon}>{cancel.text}</Button>
        <Button onClick={() => onClose(true)} color={ok.color} variant={ok.variant} startIcon={ok.startIcon} endIcon={ok.endIcon} autoFocus>{ok.text}</Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onExited: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.node,
  ok: PropTypes.shape({
    text: PropTypes.string,
    color: PropTypes.string,
    variant: PropTypes.string,
    startIcon: PropTypes.element,
    endIcon: PropTypes.element
  }),
  cancel: PropTypes.shape({
    text: PropTypes.string,
    color: PropTypes.string,
    variant: PropTypes.string,
    startIcon: PropTypes.element,
    endIcon: PropTypes.element
  })
}

ConfirmDialog.defaultProps = {
  open: false,
  title: '',
  ok: {
    text: 'OK',
    color: 'primary',
    variant: 'text'
  },
  cancel: {
    text: 'Cancel',
    color: 'primary',
    variant: 'text'
  }
}

export default ConfirmDialog
