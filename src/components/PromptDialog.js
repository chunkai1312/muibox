import React from 'react'
import PropTypes from 'prop-types'
import withStateHandlers from 'recompose/withStateHandlers'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

function PromptDialog (props, context) {
  const { open, onClose, title, message, ok, cancel, required, defaultValue, value, handleChange } = props
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={() => onClose(null)}
      aria-labelledby="prompt-dialog-title"
      aria-describedby="prompt-dialog-message"
    >
      <DialogTitle id="prompt-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="prompt-dialog-message">{message}</DialogContentText>
        <TextField
          id="prompt-dialog-text-field"
          onChange={handleChange}
          defaultValue={defaultValue}
          required
          margin="dense"
          fullWidth
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(null)} color="primary">{cancel}</Button>
        <Button onClick={() => onClose(value)} color="primary" disabled={required && !value}>{ok}</Button>
      </DialogActions>
    </Dialog>
  )
}

PromptDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.node,
  ok: PropTypes.string,
  cancel: PropTypes.string,
  required: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired
}

PromptDialog.defaultProps = {
  open: false,
  title: '',
  ok: 'OK',
  cancel: 'Cancel',
  required: false
}

export default withStateHandlers(
  ({ defaultValue }) => ({ value: defaultValue }),
  { handleChange: state => event => ({ value: event.target.value }) }
)(PromptDialog)
