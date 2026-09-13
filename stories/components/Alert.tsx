import { Component } from "react";
import Button from "@mui/material/Button";
import { withDialog } from "../../src";
import type { AlertDialogProps, WithDialogProps } from "../../src";

export interface AlertComponentProps {
  options?: string | AlertDialogProps;
}

class Alert extends Component<AlertComponentProps & WithDialogProps> {
  static defaultProps = {
    options: "This is the default alert!",
  };

  handleClick = () => {
    const { dialog, options } = this.props;
    dialog
      .alert(options!)
      .then(() => console.log("clicked ok"))
      .catch(() => console.log("dismissed"));
  };

  render() {
    return (
      <Button
        variant="outlined"
        color="primary"
        sx={{ m: 2 }}
        onClick={this.handleClick}
      >
        Open Alert Dialog
      </Button>
    );
  }
}

export default withDialog()(Alert);
