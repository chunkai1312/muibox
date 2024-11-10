# muibox

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

> Promise-based dialog boxes (alert, confirm, prompt) using Material-UI

[Demo](https://chunkai1312.github.io/muibox)

## Install

```
$ npm install muibox --save
```

## Usage

Simply wrap all components that should display dialog boxes with the `DialogProvider` component, e.g. by wrapping your router with it.

```js
import { DialogProvider } from 'muibox'

// somewhere at the root of your app
<DialogProvider>
  {/* the rest of your app belongs here, e.g. the router */}
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

If use React 16.8+, you can import `useDialog` hook to get `dialog` context directly.

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
* `options.inputProps` (object) - The props for the input html element. For instance, max length. Optional

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/muibox.svg
[npm-url]: https://npmjs.org/package/muibox
[travis-image]: https://img.shields.io/travis/chunkai1312/muibox.svg
[travis-url]: https://travis-ci.org/chunkai1312/muibox
