import React, { Component } from "react";
import withStyles from "@mui/styles/withStyles";
import Button from "@mui/material/Button";
import { withDialog } from "../../src";
import type { Theme } from "@mui/material/styles";
import type { WithStyles } from "@mui/styles";
import type { ConfirmDialogProps, WithDialogProps } from "../../src";

const styles = (theme: Theme) => ({
  button: {
    margin: theme.spacing(2),
  },
});

export interface ConfirmComponentProps
  extends WithStyles<typeof styles>,
    WithDialogProps {
  options?: string | ConfirmDialogProps;
}

class Confirm extends Component<ConfirmComponentProps> {
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
    const { classes } = this.props;
    return (
      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={this.handleClick}
      >
        Open Confirm Dialog
      </Button>
    );
  }
}

export default withDialog()(withStyles(styles, { withTheme: true })(Confirm));
