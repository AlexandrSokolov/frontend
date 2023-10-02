
* [The motivation to use `state`, the workflow.](#the-motivation-to-use-state-the-workflow)
* [Which `React` elements can and cannot have `state`?](#which-react-elements-can-and-cannot-have-state)
* [Class component definition in `React`](#class-component-definition-in-react)
* [Define `state` and access it in a class component](#define-state-and-access-it-in-a-class-component)
* [What happens when `this.setState` is invoked?](#what-happens-when-thissetstate-is-invoked)
* [`state` update via `setState`, options](#state-update-via-setstate-options)
* [ES6 shorthand to update state](#es6-shorthand-to-update-state)
* [Update a single attribute of a multi-attributes state in a class component](#update-a-single-attribute-of-a-multi-attributes-state-in-a-class-component)
* [What to/not to Put in State in a class component](#what-tonot-to-put-in-state-in-a-class-component)
* [Where to Keep State in a class component](#where-to-keep-state-in-a-class-component)
* [Describe the following code](#describe-the-following-code)

### The motivation to use `state`, the workflow.

`props` are used to pass data to components. But `props` are read-only.
If we need to keep track of data that can change, `state` is used.

Workflow:
- the element has a defined event that can be fired
- user triggers/fires event on the element
- the fired event has the associated event handler, that gets invoked
- the event handler modifies the state 
- the state modification re-renders of the component itself and all its children

### Which `React` elements can and cannot have `state`?

Function components are stateless. 
Originally to make them stateful, it needs to be transformed into an ES6 class component.

Starting with 16.8.0, React includes a stable implementation of React Hooks. React `useState` hook allows components,
defined as functions to have state.

From official documentation:
> ["We recommend trying Hooks in new code."](https://legacy.reactjs.org/docs/hooks-faq.html#do-i-need-to-rewrite-all-my-class-components)

### Class component definition in `React`

We need to create class and extend it from `React.Component` with a `render` function, 
responsible for the structure of our component:
```jsx
class CountingParent extends React.Component { 
  render() {
    return (
      <div>Some Data</div>
    );
  }
}
```

### Define `state` and access it in a class component

* Via the `state = {...}` property initializer:
  ```jsx
  class CountingParent extends React.Component { 
    state = {
      actionCount: 0
    }
    handleAction = (action) => {
      console.log('Child says', action);
      // actionCount is incremented, and the new count replaces the existing one
      this.setState({
        actionCount: this.state.actionCount + 1
      });
    }
    render() {
      return (
        <div>
          <Child onAction={this.handleAction}/>
          <p>Clicked {this.state.actionCount} times</p>
        </div>
      );
    }
  }
  ```
* Via a constructor:
  ```jsx
  class FatherComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        status: true
      };
    }

    render() {
      return (
        <div>
          <ChildComponent statusAsProps={this.state.status} />
        </div>
      )
    }
  }
  ```

### What happens when `this.setState` is invoked?

The `setState` function is invoked asynchronously. 
It will update the state and then re-render the component and all of its children.

### `state` update via `setState`, options

* if you don't need to access the changed state in the same method:
  ```jsx
  handlerAction = (action) => {
    console.log('Child says', action);
    this.setState({
      actionCount: this.state.actionCount + 1
    });
  }
  ```
* If you want to react only after the `state` has been changed and the component has been re-rendered:
  ```jsx
  this.setState(
    {name: 'Joe'}, 
    function() {
      // called after state has been updated
      // and the component has been re-rendered
    });
  ```
* functional style of `setState`:

  The function receives the current state and props as arguments, and it is expected to return the desired new state.
  ```jsx
  this.setState((state, props) => {
    return {
      value: state.value + 1
    }});
  ```

  A side benefit to the functional style of `setState` is that the state update functions can be extracted from the class 
  and reused because they are “pure” – that is, they only operate on their arguments, 
  they don’t modify the arguments, and they return a new value. 

  A “pure” function has no side effects, which means that calling it multiple times with the same arguments 
  will always return the same result.

### ES6 shorthand to update state

```jsx
class NoNumbersInput extends React.Component {
  // ...
  
  handleChange = (event) => {
    let text = event.target.value;
    text = text.replace(/[0-9]/g, '');
    this.setState({ text });
  };

  // ...
}
```
A little side note – that syntax `this.setState({ text })` is just ES6 shorthand for `this.setState({ text: text })`. 
With ES6, if the key is the same as the variable name, you don’t have to write it twice.

### Update a single attribute of a multi-attributes state in a class component

1. Setting state in a class function via `setState` **doesn't erase the existing state.**

  It will shallow merge the properties in your object with the current state.
  It merges the object you pass to `setState` (or return from the functional version) with the existing state.
  
  Original:
  ```text
  {
    score: 7,
    user: {
      name: "somebody",
      age: 26
    },
    products: [ /*...*/ ]
  }
  ```
  Update: `this.setState({ score: 42 })`
  New state:
  ```text
  {
    score: 42, // new!
    user: { // unchanged
      name: "somebody", // unchanged
      age: 26 // unchanged
    },
    products: [ /* unchanged */ ]
  }
  ```
  Update again with: `this.setState({ user: { age: 4 } })`
  The updated state:
  ```text
  {
    score: 42, // unchanged
    user: { // new!
      age: 4
      // no more 'name'
    },
    products: [ ... ] // unchanged
  }
  ```
  
  A "deep" merge would peek into the `user` object and only update its `age` property while leaving the rest alone.
  A "shallow" merge overwrites the whole `user` object with the new one.

### What to/not to Put in State in a class component

As a general rule, data that is stored in state should be referenced inside render somewhere.
This makes sense because any time state is updated, the component will re-render.

If modifying a piece of data does not visually change the component, that data shouldn’t go into state. 
Here are some things that make sense to put in state:

* User-entered input (values of text boxes and other form fields)
* Current or selected item (the current tab, the selected row)
* Data from the server (a list of products, the number of “likes” on a page)
* Open/closed state (modal open/closed, sidebar expanded/hidden)

* Other stateful data, like handles to timers, should be stored on the component instance itself. 
  You’ve got a this object available in class components classes, feel free to use it!

### Where to Keep State in a class component

Whenever you can, it’s best to keep components stateless. 
Sometimes this isn’t possible, but often, pieces of data you initially think should go into internal state 
can actually be pulled up to the parent component, or even higher.
You need to pass a callback function to a child, that needs to be invoked on an event firing

Try to make the very top level components as statefull containers and low-level components as 
stateless components without logic.

### TODO Thinking Declaratively (from `Pure React`)

### Describe the following code

1. Code snippet:
```jsx
handlerAction = (action) => {
  console.log('Child says', action);
  this.setState({
    actionCount: this.state.actionCount + 1
  });
  console.log('Clicked: ' + this.state);
}
```
The `setState` function is actually asynchronous. 
If you call `setState` and immediately `console.log(this.state)`, 
it will very likely print the old state instead of the one you just set.

If you need to set the state and immediately act on that change, you can pass in a callback function like this:
```jsx
handlerAction = (action) -> {
  console.log('Child says', action);
  this.setState(
    { actionCount: this.state.actionCount + 1  },
    function() { console.log('Updated clicked: ' + this.state); });
  console.log('Might show old state: Clicked: ' + this.state);
}
```

2. Code snippet:

The current state is:
```text
{
  score: 7,
  user: {
    name: "somebody",
    age: 26
  },
  products: [ /*...*/ ]
}
```
You change it: `this.setState({ score: 42 })`

What will be the result?

```text
{
  score: 42, // new!
  user: { // unchanged
    name: "somebody", // unchanged
    age: 26 // unchanged
  },
  products: [ /* unchanged */ ]
}
```
3. Code snippet:

The current state is:
```text
{
  score: 7,
  user: {
    name: "somebody",
    age: 26
  },
  products: [ /*...*/ ]
}
```
You change it: `his.setState({ user: { age: 4 } })`

What will be the result?

```text
{
  score: 7, // unchanged
  user: { // new!
    age: 4
    // no more 'name'
  },
  products: [ ... ] // unchanged
}
```

A "deep" merge would peek into the `user` object and only update its `age` property while leaving the rest alone. 
A "shallow" merge overwrites the whole `user` object with the new one.