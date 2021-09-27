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

class Prompt extends React.Component {
  handleClick = () => {
    const { dialog, options } = this.props
    dialog.prompt(options)
      .then((value) => console.log('clicked ok', value))
      .catch(() => console.log('clicked cancel'))
  }

  render () {
    const { classes } = this.props
    return (
      <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleClick}>
        Open Prompt Dialog
      </Button>
    )
  }
}

Prompt.propTypes = {
  classes: PropTypes.object.isRequired,
  dialog: PropTypes.object.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
}

Prompt.defaultProps = {
  options: 'This is the default prompt!'
}

export default withDialog()(withStyles(styles, {withTheme: true})(Prompt))
