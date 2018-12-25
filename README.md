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
import { withDialog } from 'muibox'

class MyComponent {
  // *snip*

  handleSomething () {
    this.props.dialog.alert('Warning!')
  }

}

export default withDialog()(MyComponent) // export the wrapped component
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
* `options.message` (string) – The dialog message to display.
* `options.ok` (string) - The positive button text to display. Default `OK`.

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
* `options.message` (string) – The dialog message to display.
* `options.ok` (string) - The positive button text to display. Default `OK`.
* `options.cancel` (string) - The negative button text to display. Default `Cancel`.

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
* `options.message` (string) – The dialog message to display.
* `options.ok` (string) - The positive button text to display. Default `OK`.
* `options.cancel` (string) - The negative button text to display. Default `Cancel`.
* `options.required` (bool) - If `true`, the label is displayed as required and the input will be required. Default `false`.
* `options.defaultValue` (string|number) - The default value of the `Input` element.

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/muibox.svg
[npm-url]: https://npmjs.org/package/muibox
[travis-image]: https://img.shields.io/travis/chunkai1312/muibox.svg
[travis-url]: https://travis-ci.org/chunkai1312/muibox
