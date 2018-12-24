import { configure } from '@storybook/react'

function loadStories() {
  require('../stories/alert.js')
  require('../stories/confirm.js')
  require('../stories/prompt.js')
}

configure(loadStories, module)
