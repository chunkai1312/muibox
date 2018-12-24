import React from 'react'
import PropTypes from 'prop-types'
import { compose, withStateHandlers } from 'recompose'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

function PromptDialog (props, context) {
  const { open, onClose, title, message, ok, cancel, label, value, defaultValue, handleChange } = props
  return (
    <Dialog fullWidth open={open} onClose={() => onClose(null)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        <TextField
          label={label}
          onChange={handleChange}
          margin="dense"
          autoFocus
          fullWidth
          defaultValue={defaultValue}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(null)} color="primary">{cancel}</Button>
        <Button onClick={() => onClose(value)} color="primary">{ok}</Button>
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
  label: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  handleChange: PropTypes.func.isRequired
}

PromptDialog.defaultProps = {
  title: '',
  open: false,
  ok: 'ok',
  cancel: 'cancel'
}

export default compose(
  withStateHandlers(props => ({ value: props.defaultValue }), {
    handleChange: (state) => (event) => (
      { value: event.target.value }
    )
  })
)(PromptDialog)
