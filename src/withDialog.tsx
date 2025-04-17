import { ComponentType } from "react";
import DialogContext, { DialogContextValue } from "./DialogContext";

export type WithDialogProps = {
  dialog: DialogContextValue["dialog"];
};

function withDialog() {
  return function <P extends object>(
    WrappedComponent: ComponentType<P & WithDialogProps>
  ) {
    const ComponentWithDialog = (props: P) => (
      <DialogContext.Consumer>
        {({ dialog }) => <WrappedComponent dialog={dialog} {...props} />}
      </DialogContext.Consumer>
    );
    return ComponentWithDialog;
  };
}

export default withDialog;
