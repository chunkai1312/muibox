# muibox

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

> Promise-based dialog boxes (alert, confirm, prompt) using Material-UI

[Demo](https://chunkai1312.github.io/muibox)

## Install

```
$ npm install muibox --save
```

`@mui/material` and `react` are peer dependencies, so install them alongside:
`@mui/material` 9, and `react`/`react-dom` 18.3 or 19.

## Usage

Simply wrap all components that should display dialog boxes with the `DialogProvider` component, e.g. by wrapping your router with it.

```js
import { DialogProvider } from 'muibox'

// somewhere at the root of your app
<DialogProvider>
  {/* the rest of your app belongs here, e.g. the router */}
</DialogProvider>
```

Requests are never dropped. Asking for a dialog while another one is still
open does not replace it: the new request waits its turn, and every promise
settles.

#### API

**`<DialogProvider mode backdrop>`**

* `mode` (`'queue'`|`'stack'`) – How simultaneous dialogs are presented. `queue`, the default, shows one at a time in request order. `stack` shows them layered, newest on top; only the topmost is reachable, since every dialog traps focus.
* `backdrop` (`'topmost'`|`'each'`) – Only meaningful with `mode="stack"`. `topmost`, the default, draws a single backdrop behind the top dialog, so the dimming stays constant however deep the stack goes. `each` gives every dialog its own, which reads as depth but turns the page murky past two or three.

```js
<DialogProvider mode="stack">
  {/* several dialogs may now share the screen */}
</DialogProvider>
```

You can then display dialog boxes with the `withDialog` HOC and the injected `dialog` prop in your components.

```js
import React from 'react'
import { withDialog } from 'muibox'

class MyComponent extends React.Component {
  render () {
    const { dialog } = this.props
    return (
      <div>
        <button onClick={() => dialog.alert('Warning!')}>
          Click me
        </button>
      </div>
    )
  }
}

export default withDialog()(MyComponent)
```

In function components, import the `useDialog` hook to get the `dialog` context directly.

```js
import React from 'react'
import { useDialog } from 'muibox'

function MyComponent () {
  const dialog = useDialog()
  return (
    <div>
      <button onClick={() => dialog.alert('Warning!')}>
        Click me
      </button>
    </div>
  )
}

export default MyComponent
```

### Alert

```js
dialog.alert('Warning!')
  .then(() => console.log('clicked ok'))
```

#### API

**`dialog.alert(options)`**

* `options` (object|string) – The alert dialog settings. If `options` is a string, set dialog message to display.
* `options.title` (string) – The dialog title to display.
* `options.message` (string|jsx) – The dialog message to display or a custom JSX element to be injected on Material-UI DialogContent.
* `options.ok` (object) { text, color, variant, startIcon, endIcon } - The positive button text to display, color, variant and left/right icon (jsx), following mateiral-ui types. Defaults `OK`, `primary`, `text`, undefined, undefined respectively.

### Confirm

```js
dialog.confirm('Are you sure?')
  .then(() => console.log('clicked ok'))
  .catch(() => console.log('clicked cancel'))
```

#### API

**`dialog.confirm(options)`**

* `options` (object|string) – The confirm dialog settings. If `options` is a string, set dialog message to display.
* `options.title` (string) – The dialog title to display.
* `options.message` (string|jsx) – The dialog message to display or a custom JSX element to be injected on Material-UI DialogContent.
* `options.ok` (object) { text, color, variant, startIcon, endIcon } - The positive button text to display, color, variant and left/right icon (jsx), following mateiral-ui types. Defaults `OK`, `primary`, `text`, undefined, undefined respectively.
* `options.cancel` (object) { text, color, variant, startIcon, endIcon } - The positive button text to display, color, variant and left/right icon (jsx), following mateiral-ui types. Defaults `OK`, `primary`, `text`, undefined, undefined respectively.
* `options.throwOnCancel` (boolean)  - defaults to `true`,  optional flag to disable old behavior of throwing error when cancel button is clicked and when dialog is dismissed, setting to false would resolve cancel button press with `false` as value and would throw when dialog is dismissed without selection.

### Prompt

```js
dialog.prompt('Enter your name:')
  .then((value) => console.log('clicked ok', value))
  .catch(() => console.log('clicked cancel'))

```

#### API

**`dialog.prompt(options)`**

* `options` (object|string) – The prompt dialog settings. If `options` is a string, set dialog message to display.
* `options.title` (string) – The dialog title to display.
* `options.message` (string|jsx) – The dialog message to display or a custom JSX element to be injected on Material-UI DialogContent.
* `options.placeholder` (string) – The placeholder attribute for the input. Default is blank `''`.
* `options.ok` (object) { text, color, variant, startIcon, endIcon } - The positive button text to display, color, variant and left/right icon (jsx), following mateiral-ui types. Defaults `OK`, `primary`, `text`, undefined, undefined respectively.
* `options.cancel` (object) { text, color, variant, startIcon, endIcon } - The positive button text to display, color, variant and left/right icon (jsx), following mateiral-ui types. Defaults `OK`, `primary`, `text`, undefined, undefined respectively.
* `options.required` (bool) - If `true`, the label is displayed as required and the input will be required. Default `false`.
* `options.defaultValue` (string|number) - The default value of the `Input` element.
* `options.inputType` (`'string'`|`'password'`) - Whether the input masks what is typed. Default `'string'`.
* `options.inputProps` (object) - The props for the input html element. For instance, max length. Optional

### Dismiss all

Closes everything open and everything still waiting, in one call. Each pending
promise is rejected, exactly as a cancel or a backdrop click would reject it, so
nothing is left unanswered. Useful on a route change, a logout, or anywhere the
context behind the dialogs is about to stop being valid.

```js
dialog.dismissAll()
```

#### API

**`dialog.dismissAll()`**

* Takes no arguments and returns nothing. Callers awaiting a dialog will see their promise reject, so make sure they have a `catch`.

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/muibox.svg
[npm-url]: https://npmjs.org/package/muibox
[travis-image]: https://img.shields.io/travis/chunkai1312/muibox.svg
[travis-url]: https://travis-ci.org/chunkai1312/muibox
