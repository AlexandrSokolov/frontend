#### `HelloWorld` `JSX` component
Solution #1
```jsx
import React from "react";
import ReactDOM from 'react-dom/client';

function HelloWorld() {
  return (
    <div>Hello World!</div>
  );
}
// instead of: ReactDOM.render(<HelloWorld/>, document.querySelector("#root"));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HelloWorld/>
);
```
Solution #2
```jsx
import React from 'react';
import ReactDOM from 'react-dom';

function HelloWorld() {
  return (
    <div>Hello World!</div>
  );
}
ReactDOM.render(
    <HelloWorld/>,
    document.querySelector('#root'));
```
#### `HelloWorld` JS alternative
```javascript
function HelloWorld() {
  return React.createElement(
    'span',
    {},
    'Hello!');;
}
```
#### `JSX` elements composition
```jsx
function Hello() {
  return <span>Hello</span>;
}
function World() {
  return <span>World</span>;
}
function HelloWorld() {
  return (
    <div>
      <Hello/> <World/>!
    </div>
  );
}
```
Note: you can now return also an array:
```jsx
function HelloWorld() {
  return [<Hello/>, ' ', <World/>];
}
```
#### Nested structure via JS
```jsx
React.createElement('div', {},
  React.createElement('div', {}, 'Child1'),
  React.createElement('div', {}, 'Child2',
    React.createElement('div', {}, 'Child2_child')));
```
#### `Greeting` component
```jsx
function Greeting() {
  var username = "root";
  //var username = undefined;
  //var username = null;
  //var username = false;
  return (
    <div>
      {username ? `Hello, ${username}` : 'Not logged in'}
    </div>
  )
}
 ```
#### `Person` component
```jsx
const Person = ({className, age, name}) => {
  <div className={className}>
    <div>Age: {age}</div>
    <div>Name: {name}></div>
  </div>
}

function Dave() {
  const firstName = "Dave";
  const lastName = "Ceddia";

  return (
    <Person
      className='person'
      age={33}
      name={firstName + ' ' + lastName} />
  );
}
```
####
####
####
####
####
#### Create `book` component
####
####
####
####
####
####
####