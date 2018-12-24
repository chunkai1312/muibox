import React from 'react'
import { storiesOf } from '@storybook/react'
import { DialogProvider } from '../src'
import Confirm from './components/Confirm'

storiesOf('dialog.confirm()', module)
  .addDecorator(story => <DialogProvider>{story()}</DialogProvider>)
  .add('basic usage', () => (
    <Confirm />
  ))
