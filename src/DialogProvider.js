import React from 'react'
import AlertDialog from './components/AlertDialog'
import ConfirmDialog from './components/ConfirmDialog'
import PromptDialog from './components/PromptDialog'
import DialogContext from './DialogContext'
import PropTypes from 'prop-types'

class DialogProvider extends React.PureComponent {
  state = {
    alertDialog: null,
    confirmDialog: null,
    promptDialog: null
  }

  handleAlertDialogClose = (value) => {
    const { alertDialog } = this.state
    this.setState({ alertDialog: { ...alertDialog, open: false } })
    return alertDialog.resolve(value)
  }

  handleConfirmDialogClose = (value) => {
    const { confirmDialog } = this.state
    const { throwOnCancel = true } = confirmDialog
    this.setState({ confirmDialog: { ...confirmDialog, open: false } })
    if (throwOnCancel) {
      return (value) ? confirmDialog.resolve(value) : confirmDialog.reject()
    } else {
      return [true, false].includes(value) ? confirmDialog.resolve(value) : confirmDialog.reject()
    }
  }

  handlePromptDialogClose = (value) => {
    const { promptDialog } = this.state
    this.setState({ promptDialog: { ...promptDialog, open: false } })
    return value ? promptDialog.resolve(value) : promptDialog.reject()
  }

  handleExited = () => {
    this.setState({
      alertDialog: null,
      confirmDialog: null,
      promptDialog: null
    })
  }

  alert = (options) => {
    return (typeof options === 'string')
      ? new Promise((resolve, reject) => { this.setState({ alertDialog: { message: options, resolve, reject, open: true } }) })
      : new Promise((resolve, reject) => { this.setState({ alertDialog: { ...options, resolve, reject, open: true } }) })
  }

  confirm = (options) => {
    return (typeof options === 'string')
      ? new Promise((resolve, reject) => { this.setState({ confirmDialog: { message: options, resolve, reject, open: true } }) })
      : new Promise((resolve, reject) => { this.setState({ confirmDialog: { ...options, resolve, reject, open: true } }) })
  }

  prompt = (options) => {
    return (typeof options === 'string')
      ? new Promise((resolve, reject) => { this.setState({ promptDialog: { message: options, resolve, reject, open: true } }) })
      : new Promise((resolve, reject) => { this.setState({ promptDialog: { ...options, resolve, reject, open: true } }) })
  }

  dialog = {
    alert: this.alert,
    confirm: this.confirm,
    prompt: this.prompt
  }

  render () {
    const { children } = this.props
    const { alertDialog, confirmDialog, promptDialog } = this.state

    return (
      <DialogContext.Provider value={{ dialog: this.dialog }}>
        {children}
        {alertDialog && <AlertDialog {...alertDialog} open={alertDialog.open} onClose={this.handleAlertDialogClose} onExited={this.handleExited} />}
        {confirmDialog && <ConfirmDialog {...confirmDialog} open={confirmDialog.open} onClose={this.handleConfirmDialogClose} onExited={this.handleExited} />}
        {promptDialog && <PromptDialog {...promptDialog} open={promptDialog.open} onClose={this.handlePromptDialogClose} onExited={this.handleExited} />}
      </DialogContext.Provider>
    )
  }
}

DialogProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default DialogProvider
