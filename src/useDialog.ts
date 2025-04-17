import { useContext } from "react";
import DialogContext, { DialogContextValue } from "./DialogContext";

function useDialog() {
  const { dialog } = useContext<DialogContextValue>(DialogContext);
  return dialog;
}

export default useDialog;
