* [React application, basic steps](#minimal-react-application-basic-steps)
* [Add `React` dependencies, compare it with `Node.js` and `ES5`](#add-dependency-on-react-compare-it-with-nodejs-and-es5)
* ['react-dom' vs 'react-dom/client' vs 'react-dom/server'](#react-dom-vs-react-domclient-vs-react-domserver)
* [Define `JSX` element](#define-jsx-element)
* [Render `JSX` component](#render-jsx-component)
* [Location of main html page](#location-of-main-html-page)

### Minimal React application, basic steps

* add dependency on `React`
* define `JSX` element
* render the `JSX` components

### Add dependency on `React`, compare it with `Node.js` and `ES5`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
```
The statement `import React from 'react'` creates a new `React` variable with the contents of the React module.

See [`index.js`](../../my-react-app/src/index.js)

`Node.js` equivalent of `import React from 'react'` is: `var React = require('react')`
Unlike with `ES5`, we can’t simply include a `<script>` tag and get `React` as a global object.

### 'react-dom' vs 'react-dom/client' vs 'react-dom/server'

* [`react-dom/client`](https://react.dev/reference/react-dom/client)
  The react-dom/client APIs let you render React components on the client (in the browser). 
  These APIs are typically used at the top level of your app to initialize your React tree. 
  A framework may call them for you. Most of your components don’t need to import or use them.
* [`react-dom/server`](https://react.dev/reference/react-dom/server)
  The react-dom/server APIs let you render React components to HTML on the server. 
  These APIs are only used on the server at the top level of your app to generate the initial HTML. 
  A framework may call them for you. Most of your components don’t need to import or use them.

`react-dom` contains methods of both and some additional methods, like `render`

### define `JSX` element

```jsx
function HelloWorld() {
  return (
    <div>Hello World!</div>
    );
}
```

### render `JSX` component

1. Create root via `ReactDOM` imported as `import ReactDOM from 'react-dom/client';`, run `render` method on the `root`:

```jsx
import ReactDOM from 'react-dom/client';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

Note: `ReactDOM` from `react-dom/client` does not have `render` method

2. Via `ReactDOM.render([React Element], [DOM element])` imported as `import ReactDOM from 'react-dom';`

It accepts the following arguments:
* what you want to render (your component, or any other React Element) 
* the parent element, under which you want to render your `JSX` component

```jsx
ReactDOM.render(
  <HelloWorld/>,
  document.querySelector('#root'));
```

#### Location of main html page

[`public/index.html`](../../my-react-app/public/index.html)