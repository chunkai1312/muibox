import React from 'react'
import { storiesOf } from '@storybook/react'
import { DialogProvider } from '../src'
import { Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import Alert from './components/Alert'
import Confirm from './components/Confirm'
import Prompt from './components/Prompt'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme()

storiesOf('Alert', module)
  .addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>)
  .addDecorator(story => <DialogProvider>{story()}</DialogProvider>)
  .add('basic usage', () => <Alert />)
  .add('with title and message', () => {
    const options = { title: 'Alert Dialog', message: 'This is alert dialog message.' }
    return <Alert options={options} />
  })
  .add('with custom buttons theme', () => {
    const options = {
      title: 'Alert Dialog',
      message: 'This is alert dialog message.'
    }
    return <Alert options={options} />
  })
  .add('with custom jsx on message', () => {
    const options = {
      title: 'Alert Dialog',
      message: <Typography color="secondary">This is a Typography Component with color secondary.</Typography>
    }
    return <Alert options={options} />
  })

storiesOf('Confirm', module)
  .addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>)
  .addDecorator(story => <DialogProvider>{story()}</DialogProvider>)
  .add('basic usage', () => <Confirm />)
  .add('with title and message', () => {
    const options = { title: 'Confirm Dialog', message: 'This is confirm dialog message.' }
    return <Confirm options={options} />
  })
  .add('changing button color and variant', () => {
    const options = {
      title: 'Confirm Dialog',
      message: 'This is confirm dialog message.',
      ok: {
        text: `Yes`,
        color: `primary`,
        variant: `contained`
      },
      cancel: {
        text: `No`,
        color: `secondary`,
        variant: `outlined`
      }
    }
    return <Confirm options={options} />
  })
  .add('with custom jsx on message', () => {
    const options = {
      title: 'Confirm Dialog',
      message: <Typography color="secondary">This is a Typography Component with color secondary.</Typography>
    }
    return <Confirm options={options} />
  })

storiesOf('Prompt', module)
  .addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>)
  .addDecorator(story => <DialogProvider>{story()}</DialogProvider>)
  .add('basic usage', () => <Prompt />)
  .add('with title and message', () => {
    const options = { title: 'Prompt Dialog', message: 'This is prompt dialog message.' }
    return <Prompt options={options} />
  })
  .add('with required', () => {
    const options = {
      title: 'Prompt Dialog',
      message: 'This is prompt dialog message.',
      required: true
    }
    return <Prompt options={options} />
  })
  .add('with default value', () => {
    const options = {
      title: 'Prompt Dialog',
      message: 'This is prompt dialog message.',
      defaultValue: 'Bob',
      required: true
    }
    return <Prompt options={options} />
  })
  .add('with icon buttons', () => {
    const options = {
      title: 'Prompt Dialog',
      message: 'This is prompt dialog message.',
      defaultValue: 'Bob',
      required: true,
      ok: {
        text: `OK`,
        color: `primary`,
        startIcon: <CheckIcon />
      },
      cancel: {
        text: `Cancel`,
        color: `primary`,
        startIcon: <CloseIcon />
      }
    }
    return <Prompt options={options} />
  })
  .add('with password type input', () => {
    const options = {
      title: 'Prompt Dialog With Password Input',
      message: 'This is prompt dialog message.',
      defaultValue: 'Bob',
      required: true,
      inputType: 'password',
      ok: {
        text: `OK`,
        color: `primary`,
        startIcon: <CheckIcon />
      },
      cancel: {
        text: `Cancel`,
        color: `primary`,
        startIcon: <CloseIcon />
      }
    }
    return <Prompt options={options} />
  })
