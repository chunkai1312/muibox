import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

function AlertDialog (props, context) {
  const { open, onClose, title, message, ok } = props
  return (
    <Dialog fullWidth open={open} onClose={() => onClose(null)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(null)} color="primary">{ok}</Button>
      </DialogActions>
    </Dialog>
  )
}

AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.node,
  ok: PropTypes.string
}

AlertDialog.defaultProps = {
  title: '',
  open: false,
  ok: 'ok'
}

export default AlertDialog
