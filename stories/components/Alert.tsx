import React, { Component } from "react";
import withStyles from "@mui/styles/withStyles";
import Button from "@mui/material/Button";
import { withDialog } from "../../src";
import type { Theme } from "@mui/material/styles";
import type { WithStyles } from "@mui/styles";
import type { AlertDialogProps, WithDialogProps } from "../../src";

const styles = (theme: Theme) => ({
  button: {
    margin: theme.spacing(2),
  },
});

interface AlertComponentProps
  extends WithStyles<typeof styles>,
    WithDialogProps {
  options?: string | AlertDialogProps;
}

class Alert extends Component<AlertComponentProps> {
  static defaultProps = {
    options: "This is the default alert!",
  };

  handleClick = () => {
    const { dialog, options } = this.props;
    dialog.alert(options!).then(() => console.log("clicked ok"));
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
        Open Alert Dialog
      </Button>
    );
  }
}

export default withDialog()(withStyles(styles, { withTheme: true })(Alert));
