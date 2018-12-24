import React from 'react'
import DialogContext from './DialogContext'

function withDialog (WrappedComponent) {
  const ComponentWithDialog = props => (
    <DialogContext.Consumer>
      {({ dialog }) => <WrappedComponent dialog={dialog} {...props} />}
    </DialogContext.Consumer>
  )
  return ComponentWithDialog
}

export default withDialog
