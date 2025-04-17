import React, { Component } from "react";
import withStyles from "@mui/styles/withStyles";
import Button from "@mui/material/Button";
import { withDialog } from "../../src";
import type { Theme } from "@mui/material/styles";
import type { WithStyles } from "@mui/styles";
import type { PromptDialogProps, WithDialogProps } from "../../src";

const styles = (theme: Theme) => ({
  button: {
    margin: theme.spacing(2),
  },
});

export interface PromptComponentProps
  extends WithStyles<typeof styles>,
    WithDialogProps {
  options?: string | PromptDialogProps;
}

class Prompt extends Component<PromptComponentProps> {
  static defaultProps = {
    options: "This is the default prompt!",
  };

  handleClick = () => {
    const { dialog, options } = this.props;
    dialog
      .prompt(options!)
      .then((value) => console.log("clicked ok", value))
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
        Open Prompt Dialog
      </Button>
    );
  }
}

export default withDialog()(withStyles(styles, { withTheme: true })(Prompt));
