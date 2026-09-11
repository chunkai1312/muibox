import Button from "@mui/material/Button";
import { useDialog } from "../../src";
import type { PromptDialogProps } from "../../src";

export interface PromptComponentProps {
  options?: string | PromptDialogProps;
}

function Prompt({
  options = "This is the default prompt!",
}: PromptComponentProps) {
  const dialog = useDialog();

  const handleClick = () => {
    dialog
      .prompt(options)
      .then((value) => console.log("clicked ok", value))
      .catch(() => console.log("clicked cancel"));
  };

  return (
    <Button variant="outlined" color="primary" sx={{ m: 2 }} onClick={handleClick}>
      Open Prompt Dialog
    </Button>
  );
}

export default Prompt;
