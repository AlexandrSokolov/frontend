
### The motivation to use `state`

`props` are used to pass data to components. But `props` are read-only.
If we need to keep track of data that can change, state is used.

### Requirements to use `state` by components

Function components are stateless. To make them stateful, it needs to be transformed into an ES6 class component.

### Class component definition

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

### Add `state` into the component

* Via a property initializer:
  ```jsx
  class CountingParent extends React.Component { 
    state = {
      actionCount: 0
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
  
#### Access `state` inside a method of component

Via `{this.state.variableName}`:
```jsx
class CountingParent extends React.Component { 
  state = {
    actionCount: 0
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

#### What happens when this.setState is invoked?

The `setState` function is invoked asynchronously. 
It will update the state and then re-render the component and all of its children.


#### Update a single attribute of a multi-attributes state

**It doesn't erase the existing state.**

It will shallow merge the properties in your object with the current state. 
It merges the object you pass to `setState` (or return from the functional version) with the existing state. 

#### `state` update

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

TODO: Update a single attribute of a multi-attributes state, it seems it will overwrite the whole state

  The function receives the current state and props as arguments, and it is expected to return the desired new state.
  ```jsx
  this.setState((state, props) => {
    return {
      value: state.value + 1
    }});
  ```

  A side benefit to the functional style of setState is that the state update functions can be extracted from the class 
  and reused because they are “pure” – that is, they only operate on their arguments, 
  they don’t modify the arguments, and they return a new value. 

  A “pure” function has no side effects, which means that calling it multiple times with the same arguments 
  will always return the same result.

### Describe the following code:

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