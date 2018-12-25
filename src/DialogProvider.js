import React from 'react'
import AlertDialog from './components/AlertDialog'
import ConfirmDialog from './components/ConfirmDialog'
import PromptDialog from './components/PromptDialog'
import DialogContext from './DialogContext'

class DialogProvider extends React.PureComponent {
  state = {
    alertDialog: null,
    confirmDialog: null,
    promptDialog: null
  }

  handleAlertDialogClose = (value) => {
    const { alertDialog } = this.state
    this.setState({ alertDialog: { ...alertDialog, open: false } }, () => {
      this.setState({ alertDialog: null })
    })
    return alertDialog.resolve(value)
  }

  handleConfirmDialogClose = (value) => {
    const { confirmDialog } = this.state
    this.setState({ confirmDialog: { ...confirmDialog, open: false } }, () => {
      this.setState({ confirmDialog: null })
    })
    return value ? confirmDialog.resolve(value) : confirmDialog.reject()
  }

  handlePromptDialogClose = (value) => {
    const { promptDialog } = this.state
    this.setState({ promptDialog: { ...promptDialog, open: false } }, () => {
      this.setState({ promptDialog: null })
    })
    return value ? promptDialog.resolve(value) : promptDialog.reject()
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

  render () {
    const { children } = this.props
    const { alertDialog, confirmDialog, promptDialog } = this.state
    const dialog = { alert: this.alert, confirm: this.confirm, prompt: this.prompt }
    return (
      <DialogContext.Provider value={{ dialog }}>
        {children}
        {alertDialog && <AlertDialog {...alertDialog} open={alertDialog.open} onClose={this.handleAlertDialogClose} />}
        {confirmDialog && <ConfirmDialog {...confirmDialog} open={confirmDialog.open} onClose={this.handleConfirmDialogClose} />}
        {promptDialog && <PromptDialog {...promptDialog} open={promptDialog.open} onClose={this.handlePromptDialogClose} />}
      </DialogContext.Provider>
    )
  }
}

export default DialogProvider
