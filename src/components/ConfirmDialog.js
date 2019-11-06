import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

function ConfirmDialog (props, context) {
  const { open, onClose, onExited, title, message, ok, cancel } = props
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={() => onClose(false)}
      onExited={onExited}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-message"
    >
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-message">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)} color={cancel.color} variant={cancel.variant}>{cancel.text}</Button>
        <Button onClick={() => onClose(true)} color={ok.color} variant={ok.variant} autoFocus>{ok.text}</Button>
      </DialogActions>
    </Dialog>
  )
}

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onExited: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.node,
  ok: PropTypes.objectOf({
    text: PropTypes.string,
    color: PropTypes.string,
    variant: PropTypes.string
  }),
  cancel: PropTypes.objectOf({
    text: PropTypes.string,
    color: PropTypes.string,
    variant: PropTypes.string
  }),
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
  },
}

export default ConfirmDialog
