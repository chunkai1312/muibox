import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { withDialog } from '../../src'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 2
  }
})

class Prompt extends React.Component {
  handleClick = () => {
    this.props.dialog.prompt('This is the default prompt!')
  }

  render () {
    const { classes } = this.props
    return (
      <Button variant="contained" color="primary" className={classes.button} onClick={this.handleClick}>
        Open Prompt Dialog
      </Button>
    )
  }
}

Prompt.propTypes = {
  classes: PropTypes.object.isRequired,
  dialog: PropTypes.object.isRequired
}

export default withDialog(withStyles(styles)(Prompt))
