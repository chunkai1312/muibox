import { Component } from "react";
import Button from "@mui/material/Button";
import { withDialog } from "../../src";
import type { ConfirmDialogProps, WithDialogProps } from "../../src";

export interface ConfirmComponentProps {
  options?: string | ConfirmDialogProps;
}

class Confirm extends Component<ConfirmComponentProps & WithDialogProps> {
  static defaultProps = {
    options: "This is the default confirm!",
  };

  handleClick = () => {
    const { dialog, options } = this.props;
    dialog
      .confirm(options!)
      .then(() => console.log("clicked ok"))
      .catch(() => console.log("clicked cancel"));
  };

  render() {
    return (
      <Button
        variant="outlined"
        color="primary"
        sx={{ m: 2 }}
        onClick={this.handleClick}
      >
        Open Confirm Dialog
      </Button>
    );
  }
}

export default withDialog()(Confirm);
