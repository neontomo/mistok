# mistok

`mistok` is a _zero-dependency_ debugging tool for displaying objects in a React project.

simply add the component to your project and pass props to it.

## screenshot

<img width="557" alt="image" src="https://github.com/user-attachments/assets/cb6b54fb-0426-46ad-9943-ba7419c0a034" />

## usage

to use the `mistok` component, add the component somewhere in your project and pass an object containing the variables you want to debug as the `vars` prop.

```tsx
// import mistok
// ...or add it to your file directly
import Mistok from './mistok'

// in some component
const myObject = { key: 'value' }
const myArray = [1, 2, 3]
const anotherObject = { foo: 'bar' }

<div>
    <h1>My Component</h1>
    <p>Some content...</p>

    <Mistok vars={{ myObject, myArray, anotherObject }} />
</div>
```

this will render a debug panel with buttons for `myObject`, `myArray`, and `anotherObject`. clicking a button will display the JSON representation of the corresponding variable and hot-reload when the value changes.

## props

- `vars` (object | unknown[]): An object containing the variables you want to debug. the keys of the object will be used as labels for the debug buttons.

## features

- **variable selection**: buttons are generated for each key in the `vars` object. clicking a button will display the corresponding variable's JSON representation.
- **copy to clipboard**: copy the JSON representation of the currently viewed variable to the clipboard.
- **toggle visibility**: show or hide the debug panel.

## etymology

`mistok` comes from the Icelandic word `mistök`, which means "mistake". the idea is that this tool can help you find mistakes in your code by allowing you to inspect the values of your variables.

## project meme

![image](https://github.com/user-attachments/assets/43e1e2bd-10e3-41c1-872a-940cd8e44b10)

## license

feel free to do whatever you want with this.
