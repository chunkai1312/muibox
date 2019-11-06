import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

function AlertDialog (props, context) {
  const { open, onClose, onExited, title, message, ok } = props
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={() => onClose()}
      onExited={onExited}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-message"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-message">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} color={ok.color} variant={ok.variant} autoFocus>{ok.text}</Button>
      </DialogActions>
    </Dialog>
  )
}

AlertDialog.propTypes = {
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
}

AlertDialog.defaultProps = {
  open: false,
  title: '',
  ok: {
    text: 'OK',
    color: 'primary',
    variant: 'text'
  }
}

export default AlertDialog
