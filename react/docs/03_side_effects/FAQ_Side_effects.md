
* [What is side effect?](#what-is-side-effect)
* [React hook, created for side effects](#react-hook-created-for-side-effects)
* [Side effect hook vs. the lifecycle methods of class-based components](#side-effect-hook-vs-the-lifecycle-methods-of-class-based-components)
* [For which tasks can `useEffect` be used](#for-which-tasks-can-useeffect-be-used)
* [Common kinds of side effects in React components](#common-kinds-of-side-effects-in-react-components)
* [What issues might exist with `useEffect`?](#what-issues-might-exist-with-useeffect)
* [When does `useEffect` get executed?](#when-does-useeffect-get-executed)
* [How to skip `useEffect` execution?](#how-to-skip-useeffect-execution)
* [Effects that are only executed once](#effects-that-are-only-executed-once)
* [How does `useEffect` get executed?](#how-does-useeffect-get-executed)
* [Declare functions needed by an effect](#declare-functions-needed-by-an-effect)
* [Using multiple effects to separate concerns](#using-multiple-effects-to-separate-concerns)
* todo ...
* [Effects with Cleanup](#effects-with-cleanup)
* [When exactly does React clean up an effect?](#when-exactly-does-react-clean-up-an-effect)
* [Why the effect cleanup phase happens after every re-render, and not just once during unmounting](#why-the-effect-cleanup-phase-happens-after-every-re-render-and-not-just-once-during-unmounting)
* [When not to use `useEffect`](#when-not-to-use-useeffect)
* [Describe the following code](#describe-the-following-code)

### What is side effect?

### React hook, created for side effects

```jsx
useEffect(
    () => {
        // execute side effect
    },
    // optional dependency array
    [
        // 0 or more entries
    ] 
)
```
Example:
```jsx
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
}
```

[`useEffect`](https://react.dev/reference/react/useEffect)

The Effect Hook lets you perform side effects in function components.

### Side effect hook vs. the lifecycle methods of class-based components

You can think of `useEffect` Hook as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` combined.

1. Reduce code duplication. When related logic gets broken up into several methods.

  [We typically want to perform our effects after React has updated the DOM](https://legacy.reactjs.org/docs/hooks-effect.html#example-using-classes), 
  regardless of whether the component just mounted, or if it has been updated.
  
  This is why in React classes, we put side effects into `componentDidMount` and `componentDidUpdate`:
  ```jsx
  class Example extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };
    }
  
    componentDidMount() {
      document.title = `You clicked ${this.state.count} times`;
    }
    componentDidUpdate() {
      document.title = `You clicked ${this.state.count} times`;
    }
  
    render() {
      return (
        <div>
          <p>You clicked {this.state.count} times</p>
          <button onClick={() => this.setState({ count: this.state.count + 1 })}>
            Click me
          </button>
        </div>
      );
    }
  }
  ```
  Conceptually, we want it to happen after every render — but React class components don’t have a method like this.
  We could extract a separate method but we would still have to call it in two places.
  
  Using Hooks:
  ```jsx
  import React, { useState, useEffect } from 'react';
  
  function Example() {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      document.title = `You clicked ${count} times`;
    });
  
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  }
  ```

2. The separation of concerns. 

Class lifecycle methods often contain unrelated logic and the related logic gets broken up into several methods.
Here is a component that combines the counter and the friend status indicator logic:

```jsx
class FriendStatusWithCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }
  // ...
```

The logic that sets `document.title` is split between `componentDidMount` and `componentDidUpdate`.
The subscription logic is also spread between `componentDidMount` and `componentWillUnmount`. 
And `componentDidMount` contains code for both tasks.

**Hooks let us split the code based on what it is doing rather than a lifecycle method name.**
You can use the State Hook more than once, you can also use several effects. 
This lets us separate unrelated logic into different effects:
```jsx
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  // ...
}
```

3. [Unlike `componentDidMount` or `componentDidUpdate`, effects scheduled with `useEffect` 
   don’t block the browser from updating the screen.](#how-does-useeffect-get-executed)


### For which tasks can `useEffect` be used

This hook can be used for:
* asynchronous tasks running
* fetching data
* reading from local storage
* registering and deregistering event listeners
* setting up a subscription
* manually changing the DOM in React components

### Common kinds of side effects in React components

* components that don’t require cleanup
* components that do require cleanup

### What issues might exist with `useEffect`?



### When does `useEffect` get executed?

* By default, it runs both after the first render and after every update. But you can opt-out of this behavior
* An effect is only rerun if at least one of the values specified as part of the effect’s dependencies has changed 
  since the last render cycle

### How to skip `useEffect` execution?

In some cases, cleaning up or applying the effect after every render might create a performance problem. 
In class components, we can solve this by writing an extra comparison 
with `prevProps` or `prevState` inside componentDidUpdate:
```jsx
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```

You can tell React to skip applying an effect if certain values haven’t changed between re-renders. 
To do so, pass an array as an optional second argument to useEffect:

```jsx
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // Only re-run the effect if count changes
```

This also works for effects that have a cleanup phase:

```jsx
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
}, [props.friend.id]); // Only re-subscribe if props.friend.id changes
```

### Effects that are only executed once

It is similar to the `componentDidMount()` lifecycle method. 

Just add an empty dependency array.

### How does `useEffect` get executed?

Unlike `componentDidMount` or `componentDidUpdate`, effects scheduled with `useEffect` 
don’t block the browser from updating the screen. This makes your app feel more responsive. 
The majority of effects don’t need to happen synchronously. 
In the uncommon cases where they do (such as measuring the layout), 
there is a separate `useLayoutEffect` Hook with an API identical to `useEffect`.

### Declare functions needed by an effect

Usually you’ll want to declare functions needed by an effect inside of it. 
Then it’s easy to see what values from the component scope that effect depends on.

Instead of:
```jsx
function Example({ someProp }) {
  function doSomething() {
    console.log(someProp);
  }

  useEffect(() => {
    doSomething();
  }, []); // 🔴 This is not safe (it calls `doSomething` which uses `someProp`)
}
```
define `doSomething` inside of effect:
```jsx
function Example({ someProp }) {
  useEffect(() => {
    function doSomething() {
      console.log(someProp);
    }

    doSomething();
  }, [someProp]); // ✅ OK (our effect only uses `someProp`)
}
```

You have to understand that functions defined in the body of your function component get recreated on every render cycle.
This has an impact if you use it inside of your effect.

There are strategies to cope with it:
* hoist them outside of the component
* define them inside of the effect
* use useCallback

### Using multiple effects to separate concerns

Don’t be afraid to use multiple useEffect statements in your component. 
While `useEffect` is designed to handle only one concern, you’ll sometimes need more than one effect.

When you try to use only one effect for multiple purposes, it decreases the readability of your code, 
and some use cases are not realizable.

For instance you might have a situation where you need to add event listener during the initial mount 
and clean them up at unmount and another case where a particular listener needs to be cleaned up 
and re-added on a prop change.



### todo

You have to understand basic JavaScript concepts such as stale closures, otherwise, you might have trouble tackling problems with outdated props or state values inside of your effect. There are strategies to solve this, e.g., with an effect’s dependency array or with the useRef Hook

### todo

You should not ignore suggestions from the React Hooks ESLint plugin. Do not blindly remove dependencies or carelessly use ESLint’s disable comments; you most likely have introduced a bug. You may still lack understanding of some important concepts

### todo When are effects executed within the component lifecycle?

Do not mimic the lifecycle methods of class-based components. This way of thinking does more harm than good. Instead, think more about data flow and state associated with effects because you run effects based on state changes across render cycles

“The question is not ‘when does this effect run,’ the question is ‘with which state does this effect synchronize?’ ”

todo https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
https://wavez.github.io/react-hooks-lifecycle/

This may sound strange initially, but effects defined with useEffect are invoked after render. 
To be more specific, it runs both after the first render and after every update. 
In contrast to lifecycle methods, effects don’t block the UI because they run asynchronously.

### Effects with Cleanup

For example, we might want to set up a subscription to some external data source.

Code for adding and removing a subscription is so tightly related that `useEffect` is designed to keep it together.
If your effect returns a function, React will run it when it is time to clean up:

```jsx
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

Note: We don’t have to return a named function from the effect. 
We called it `cleanup` here to clarify its purpose, 
but you could return an arrow function or call it something different.

### When exactly does React clean up an effect?

* React performs the cleanup when the component unmounts. 
* However, effects run for every render and not just once. 
  This is why React also cleans up effects from the previous render before running the effects next time.

### Why the effect cleanup phase happens after every re-render, and not just once during unmounting

```jsx
class FriendStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }

  render() {
    if (this.state.isOnline === null) {
      return 'Loading...';
    }
    return this.state.isOnline ? 'Online' : 'Offline';
  }
}
```
Our class reads `friend.id` from `this.props`, subscribes to the friend status after the component mounts, 
and unsubscribes during unmounting.

But what happens if the friend prop changes while the component is on the screen? 
Our component would continue displaying the online status of a different friend. 
This is a bug. We would also cause a memory leak or crash when unmounting since the unsubscribe call 
would use the wrong friend ID.

In a class component, we would need to add `componentDidUpdate` to handle this case:
```jsx
  componentDidUpdate(prevProps) {
    // Unsubscribe from the previous friend.id
    ChatAPI.unsubscribeFromFriendStatus(
      prevProps.friend.id,
      this.handleStatusChange
    );
    // Subscribe to the next friend.id
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
```

Forgetting to handle componentDidUpdate properly is a common source of bugs in React applications.

Now consider the version of this component that uses Hooks:

```jsx
function FriendStatus(props) {
  // ...
  useEffect(() => {
    // ...
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

### When not to use `useEffect`

1. Transforming data for rendering
Instead of:
```jsx
export const UserList = ({users}: IUserProps) => {

  // the following part is completely unnecessary.
  const [filteredUsers , setFilteredUsers] = useState([])
  useEffect(() => {
    const activeUsers = users.filter(user => user.active) 
    setFilteredUsers(activeUsers)
  ,[users])

  return <div>
    {filteredUsers.map(user => <div> {user.name} </div>)}
  </div>
}
```
transform then in the function:
```jsx
export const UserList = ({users}: IUserProps) => {
  const filteredUsers = users.filter(user => user.active)
  return <div>
    {filteredUsers.map(user => <div> {user.name} </div>)}
  </div>
}
```
This will save you time and improve the performance of your application.

2. Handling user events
   Let’s say you want to make a POST request once a user clicks on a form submit button

```jsx
function Form() {

  // Avoid: Event-specific logic inside an Effect
  const [jsonToSubmit, setJsonToSubmit] = useState(null);

  useEffect(() => {
    if (jsonToSubmit !== null) {
      post('/api/register', jsonToSubmit);
    }
  }, [jsonToSubmit]);

  function handleSubmit(e) {
    e.preventDefault();
    setJsonToSubmit({ firstName, lastName });
  }

}
```
In the above code, you can just make the post request once the button is clicked. 
But you are cascading the effect, so once the useEffect is triggered, 
it doesn’t have the complete context of what happened. 

This might cause issues in the future; instead, you can just make the POST request on the handleSubmit function:
```jsx
function Form() {

  function handleSubmit(e) {
    e.preventDefault();
    const jsonToSubmit = { firstName, lastName };
    post('/api/register', jsonToSubmit);
  }

}
```

### Describe the following code

1. Code snippet:
```jsx
function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);

  async function fetchProduct() {
    const response = await fetch('http://myapi/product/' + productId); // Uses productId prop
    const json = await response.json();
    setProduct(json);
  }

  useEffect(() => {
    fetchProduct();
  }, []); 
  // ...
}
```
🔴 Invalid because `fetchProduct` uses `productId`

2. 