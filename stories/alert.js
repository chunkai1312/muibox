import React from 'react'
import { storiesOf } from '@storybook/react'
import { DialogProvider } from '../src'
import Alert from './components/Alert'

storiesOf('dialog.alert()', module)
  .addDecorator(story => <DialogProvider>{story()}</DialogProvider>)
  .add('basic usage', () => (
    <Alert />
  ))
