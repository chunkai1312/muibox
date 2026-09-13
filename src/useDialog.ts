import { useContext } from "react";
import DialogContext from "./DialogContext.js";

function useDialog() {
  const context = useContext(DialogContext);

  if (context === null) {
    throw new Error("muibox: useDialog must be used within a DialogProvider");
  }

  return context.dialog;
}

export default useDialog;
