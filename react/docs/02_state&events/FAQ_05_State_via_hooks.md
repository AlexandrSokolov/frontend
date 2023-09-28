### Using hooks in class components

You can’t use Hooks inside a class component.

### The motivation to have hooks

1. React components and top-down data flow help us organize a large UI into small, independent, reusable pieces.
   However, we often can’t break complex components down any further because the logic is stateful
   and can’t be extracted to a function or another component.

   When we try to solve these use cases with components alone, we usually end up with:
  * Huge components that are hard to refactor and test.
  * Duplicated logic between different components and lifecycle methods.
  * Complex patterns like render props and higher-order components.

   Hooks let us organize the logic inside a component into reusable isolated units,
   rather than just between the components.

2. Unlike patterns like render props or higher-order components, Hooks don’t introduce unnecessary
   nesting into your component tree.
3. Hooks don’t suffer from the [drawbacks of mixins](https://legacy.reactjs.org/blog/2016/07/13/mixins-considered-harmful.html#why-mixins-are-broken).
4. Hooks provide a single way to create reusable components.

   There are a lot of ways to reuse logic in React apps.
   We can write simple functions and call them to calculate something.
   We can also write components (which themselves could be functions or classes).
   **Components are more powerful, but they have to render some UI.**
   This makes them inconvenient for sharing non-visual logic.
   This is how we end up with complex patterns like render props and higher-order components.

5.

Hooks let you always use functions instead of having to constantly switch between
functions, classes, higher-order components, and render props.

### What can I do with Hooks that I couldn’t with classes?

> [Our goal is for Hooks to cover all use cases for classes as soon as possible.](https://legacy.reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes)

### Define `state` and access it a stateless function via hooks

`useState` returns an array with two values: the current state and a function to update it.
The Hook takes an initial state value as an argument
and returns an updated state value whenever the setter function is called.

```jsx
import {useState} from "react";

function CountingParent() {
  const [actionCount, setActionCount] = useState(0);
  return (
    <div>
      <Child onAction={() => setActionCount(prevActionCount => prevActionCount + 1)}/>
      <p>Clicked {actionCount} times</p>
    </div>
  )
}
```

### Lazily initialize the state, describe when it gets triggered

when the initial state is the result of an expensive computation, pass a function:
```jsx
const Message= () => {
   const messageState = useState(() => expensiveComputation() );
   /* ... */
}
```

The initial value will be assigned only on the initial render.
If it’s a function, it will be executed only on the initial render.
In subsequent renders (due to a change of state in the component or a parent component),
the argument of the `useState` Hook will be ignored, and the current value will be retrieved.

### why does useState return an array, rather than an object?

This is because, compared to an object, an array is more flexible and easy to use. If the method returned an object with a fixed set of properties, you wouldn’t be able to assign custom names easily.

Instead, you’d have to do something like this (assuming the properties of the object are state and setState):

```jsx
// Without using object destructuring
const messageState = useState( '' );
const message = messageState.state;
const setMessage = messageState

// Using object destructuring
const { state: message, setState: setMessage } = useState( '' );
const { state: list, setState: setList } = useState( [] );
```

### Using several state variables with hooks

1. You might be tempted to always call `useState()` once and put all state into a single object:

  ```jsx
  function Box() {
    const [state, setState] = useState({ left: 0, top: 0, width: 100, height: 100 });
    // ...
    // ...
    useEffect(() => {
      function handleWindowMouseMove(e) {
        // Spreading "...state" ensures we don't "lose" width and height
        setState(state => ({ ...state, left: e.pageX, top: e.pageY }));
      }
      // Note: this implementation is a bit simplified
      window.addEventListener('mousemove', handleWindowMouseMove);
      return () => window.removeEventListener('mousemove', handleWindowMouseMove);
    }, []);
    // ...
  }
  ```

2. [We recommend to split state into multiple state variables based on which values tend to change together.](https://legacy.reactjs.org/docs/hooks-faq.html#should-i-use-one-or-many-state-variables)

```jsx
function Box() {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [size, setSize] = useState({ width: 100, height: 100 });

  useEffect(() => {
    function handleWindowMouseMove(e) {
      setPosition({ left: e.pageX, top: e.pageY });
    }
    // ...
```

### Update a single attribute of a multi-attributes state in a stateless function.

Setting state via hooks replaces its value. This is different from `this.setState` in a class,
which merges the updated fields into the object.

```jsx
function Box() {
  const [state, setState] = useState({ left: 0, top: 0, width: 100, height: 100 });
  // ...
  // ...
  useEffect(() => {
    function handleWindowMouseMove(e) {
      // Spreading "...state" ensures we don't "lose" width and height
      setState(state => ({ ...state, left: e.pageX, top: e.pageY }));
    }
    // Note: this implementation is a bit simplified
    window.addEventListener('mousemove', handleWindowMouseMove);
    return () => window.removeEventListener('mousemove', handleWindowMouseMove);
  }, []);
  // ...
}
```

### Updating arrays in `useState`
```jsx
// Arrays
const [array, setArray] = useState([1, 2, 3, 4, 5]);

const addItem = () => {
  setArray([...array, 6]);
};
```