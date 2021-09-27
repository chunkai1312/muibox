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

class Alert extends React.Component {
  handleClick = () => {
    const { dialog, options } = this.props
    dialog.alert(options)
      .then(() => console.log('clicked ok'))
  }

  render () {
    const { classes } = this.props
    return (
      <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleClick}>
        Open Alert Dialog
      </Button>
    )
  }
}

Alert.propTypes = {
  classes: PropTypes.object.isRequired,
  dialog: PropTypes.object.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
}

Alert.defaultProps = {
  options: 'This is the default alert!'
}

export default withDialog()(withStyles(styles, {withTheme: true})(Alert))
