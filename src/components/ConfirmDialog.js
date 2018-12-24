import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

function ConfirmDialog (props, context) {
  const { open, onClose, title, message, ok, cancel } = props
  return (
    <Dialog fullWidth open={open} onClose={() => onClose(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {cancel && <Button onClick={() => onClose(false)} color="primary">{cancel}</Button>}
        <Button onClick={() => onClose(true)} color="primary">{ok}</Button>
      </DialogActions>
    </Dialog>
  )
}

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.node,
  ok: PropTypes.string,
  cancel: PropTypes.string
}

ConfirmDialog.defaultProps = {
  title: '',
  open: false,
  ok: 'ok',
  cancel: 'cancel'
}

export default ConfirmDialog
