import { configure } from '@storybook/react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

function loadStories() {
  require('../stories/index.js')
}

configure(loadStories, module)
