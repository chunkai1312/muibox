import React from 'react'
import { storiesOf } from '@storybook/react'
import { DialogProvider } from '../src'
import Prompt from './components/Prompt'

storiesOf('dialog.prompt()', module)
  .addDecorator(story => <DialogProvider>{story()}</DialogProvider>)
  .add('basic usage', () => (
    <Prompt />
  ))
