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
  const { open, onClose, onExited, title, message, ok, cancel, required, defaultValue, value, handleChange } = props
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={() => onClose(null)}
      onExited={onExited}
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
        <Button onClick={() => onClose(null)} color={cancel.color} variant={cancel.variant}>{cancel.text}</Button>
        <Button onClick={() => onClose(value)} color={ok.color} variant={ok.variant} disabled={required && !value}>{ok.text}</Button>
      </DialogActions>
    </Dialog>
  )
}

PromptDialog.propTypes = {
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
  required: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired
}

PromptDialog.defaultProps = {
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
  required: false
}

export default withStateHandlers(
  ({ defaultValue }) => ({ value: defaultValue }),
  { handleChange: state => event => ({ value: event.target.value }) }
)(PromptDialog)
