import { useContext } from "react";
import DialogContext from "./DialogContext.ts";
import type { DialogContextValue } from "./DialogContext.ts";

function useDialog() {
  const { dialog } = useContext<DialogContextValue>(DialogContext);
  return dialog;
}

export default useDialog;
