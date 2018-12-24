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

class Confirm extends React.Component {
  handleClick = () => {
    this.props.dialog.confirm('This is the default confirm!')
  }

  render () {
    const { classes } = this.props
    return (
      <Button variant="contained" color="primary" className={classes.button} onClick={this.handleClick}>
        Open Confirm Dialog
      </Button>
    )
  }
}

Confirm.propTypes = {
  classes: PropTypes.object.isRequired,
  dialog: PropTypes.object.isRequired
}

export default withDialog(withStyles(styles)(Confirm))
