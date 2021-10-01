import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import Button from '@mui/material/Button'
import { withDialog } from '../../src'

const styles = theme => ({
  button: {
    margin: theme.spacing(2)
  }
})

class Confirm extends React.Component {
  handleClick = () => {
    const { dialog, options } = this.props
    dialog.confirm(options)
      .then(() => console.log('clicked ok'))
      .catch(() => console.log('clicked cancel'))
  }

  render () {
    const { classes } = this.props
    return (
      <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleClick}>
        Open Confirm Dialog
      </Button>
    )
  }
}

Confirm.propTypes = {
  classes: PropTypes.object.isRequired,
  dialog: PropTypes.object.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
}

Confirm.defaultProps = {
  options: 'This is the default confirm!'
}

export default withDialog()(withStyles(styles, {withTheme: true})(Confirm))
