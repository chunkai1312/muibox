import DialogContext from "./DialogContext.js";
import type { ComponentType } from "react";
import type { DialogContextValue } from "./DialogContext.js";

export type WithDialogProps = {
  dialog: DialogContextValue["dialog"];
};

function withDialog() {
  return function <P extends WithDialogProps>(WrappedComponent: ComponentType<P>) {
    // `dialog` is injected from context, so it is removed from the props the
    // caller has to supply — and it is applied last, so it can never be
    // shadowed by a stray `dialog` prop passed from outside.
    const ComponentWithDialog = (props: Omit<P, keyof WithDialogProps>) => (
      <DialogContext.Consumer>
        {(context) => {
          if (context === null) {
            throw new Error(
              "muibox: withDialog components must be used within a DialogProvider",
            );
          }

          return (
            // TypeScript cannot see that `Omit<P, "dialog"> & { dialog }` is P,
            // so the reassembly needs an assertion. It is sound: `dialog` is
            // supplied right after the spread.
            // oxlint-disable-next-line typescript/no-unsafe-type-assertion
            <WrappedComponent {...(props as P)} dialog={context.dialog} />
          );
        }}
      </DialogContext.Consumer>
    );

    ComponentWithDialog.displayName = `withDialog(${
      WrappedComponent.displayName || WrappedComponent.name || "Component"
    })`;

    return ComponentWithDialog;
  };
}

export default withDialog;
