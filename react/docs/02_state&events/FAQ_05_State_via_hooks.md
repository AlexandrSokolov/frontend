
* [The motivation to have hooks](#the-motivation-to-have-hooks)
* [Rules for using `useState`](#rules-for-using-usestate)
* [What can I do with Hooks that I couldn’t with classes?](#what-can-i-do-with-hooks-that-i-couldnt-with-classes)
* [Using hooks in class components](#using-hooks-in-class-components)
* [Define `state` and access it a stateless function via hooks](#define-state-and-access-it-a-stateless-function-via-hooks)
* [Lazily initialize the state, describe when it gets triggered](#lazily-initialize-the-state-describe-when-it-gets-triggered)
* [why does useState return an array, rather than an object?](#why-does-usestate-return-an-array-rather-than-an-object)
* [Using several state variables with hooks, alternative and recommendation](#using-several-state-variables-with-hooks-alternative-and-recommendation)
* [What must you care about when update state with hooks (6)?](#what-must-you-care-about-when-update-state-with-hooks-6)
* [Reading the state variable after calling the set function](#reading-the-state-variable-after-calling-the-set-function)
* [Several updates, possible issue](#several-updates-possible-issue)
* [Functional updates](#functional-updates)
* [Update a single attribute of a multi-attributes state in a stateless function](#update-a-single-attribute-of-a-multi-attributes-state-in-a-stateless-function)
* [Updating arrays with hooks](#updating-arrays-with-hooks)
* [Update state in a nested object in React with Hooks](#update-state-in-a-nested-object-in-react-with-hooks)
* [How can state be shared across multiple components?](#how-can-state-be-shared-across-multiple-components)
* [Describe the following code](#describe-the-following-code)

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

### Rules for using `useState`

[Rules of Hooks](https://legacy.reactjs.org/docs/hooks-rules.html)
* Only call Hooks at the top level. (Don’t call Hooks inside loops, conditions, or nested functions.)
  By following this rule, you ensure that Hooks are called in the same order each time a component renders. 
  That’s what allows React to correctly preserve the state of Hooks between multiple useState and useEffect calls.
* Only call Hooks from React functions (Don’t call Hooks from regular JavaScript functions)
  By following this rule, you ensure that all stateful logic in a component is clearly visible from its source code.

### What can I do with Hooks that I couldn’t with classes?

> [Our goal is for Hooks to cover all use cases for classes as soon as possible.](https://legacy.reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes)

### Using hooks in class components

You can’t use Hooks inside a class component.

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

### Using several state variables with hooks, alternative and recommendation

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

Note: avoid state objects with a complex structure (nested objects), cause to update such objects might be an issue.

If this is not possible, the recommendation is to use libraries that help you work with immutable objects, 
such as [`immutable.js` or `immer`](https://blog.logrocket.com/immer-and-immutable-js-how-do-they-compare/).

### What must you care about when update state with hooks (6)?

* [The update function doesn’t update the value right away.](#reading-the-state-variable-after-calling-the-set-function)
* [React batches state updates.](#several-updates-possible-issue)
* [If you use the previous value to update state, you must pass a function that receives the previous value 
  and returns an updated value](#functional-updates)
* If you use the same value as the current state to update the state (as determined by an Object.is comparison), 
  React won’t trigger a re-render
* [when you update state object, you must replace it entirely, rather than update a certain attribute](#update-a-single-attribute-of-a-multi-attributes-state-in-a-stateless-function)
  Unlike `this.setState` in class components, `useState` doesn’t merge objects when the state is updated. 
  It replaces them
* [when state is nested object or multi-dimension array, the spread syntax creates a shallow copy instead of a deep copy](#update-state-in-a-nested-object-in-react-with-hooks)

### Reading the state variable after calling the set function

The update function doesn’t update the value right away.
The set function only updates the state variable for the next render.
If you read the state variable after calling the set function,
you will still get the old value that was on the screen before your call.

```jsx
const [name, setName] = useState('Taylor');
function handleClick() {
  setName('Robin');
  console.log(name); // Still "Taylor"!
}
```

### Several updates, possible issue

React batches state updates. 
It updates the screen after all the event handlers have run and have called their set functions. 
This prevents multiple re-renders during a single event. 
In the rare case that you need to force React to update the screen earlier, 
for example to access the DOM, you can use `flushSync`.

### Functional updates

If the new state is computed using the previous state, you can pass a function to setState. 
The function will receive the previous value, and return an updated value.

```jsx
function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}
```

[Functional updates](https://legacy.reactjs.org/docs/hooks-reference.html#functional-updates)

### Update a single attribute of a multi-attributes state in a stateless function

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

### Updating arrays with hooks
```jsx
// Arrays
const [array, setArray] = useState([1, 2, 3, 4, 5]);

const addItem = () => {
  setArray([...array, 6]);
};
```

### Update state in a nested object in React with Hooks

In JavaScript, multi-dimensional arrays are arrays within arrays:
```javascript
[
  ['value1','value2'],
  ['value3','value4']
]
```
Or it would be better to use nested objects like this:
```text
{
  'row1' : {
    'key1' : 'value1',
    'key2' : 'value2'
  },
  'row2' : {
    'key3' : 'value3',
    'key4' : 'value4'
  }
}
```
The problem when working with multi-dimensional arrays and nested objects is that `Object.assign and the spread syntax 
will create a **shallow copy** instead of a **deep copy**.

From the [spread syntax documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax):
> Spread syntax effectively goes one level deep while copying an array. 
> Therefore, it may be unsuitable for copying multi-dimensional arrays,

Consider the following state object:
```jsx
const [messageObj, setMessage] = useState({
  author: '',
  message: {
    id: 1,
    text: ''
  }
});
```

To properly update the text field, we have to copy to a new object 
the entire set of fields/nested objects of the original object:
```jsx
// Correct
setMessage(prevState => ({
  ...prevState,           // copy all other field/objects
  message: {              // recreate the object that contains the field to update
    ...prevState.message, // copy all the fields of the object
    text: 'My message'    // overwrite the value of the field to update
  }
}));
```
here’s how you’d update the author field of the state object:
```jsx
// Correct
setMessage(prevState => ({
  author: 'Joe',          // overwrite the value of the field to update
  ...prevState.message    // copy all other field/objects
}));
```

### How can state be shared across multiple components?

you have two components in your React app
and a change or event in component A should change the state in component B.

This problem can be solved by lifting state up. When lifting state up, the state is not
managed in either of the two components that use it
but in a shared ancestor
component instead. To be precise, it is managed in the closest shared ancestor
component. Keep in mind that components are nested into each other and thus a
"tree of components"

State is lifted up by using props in the components that need to manipulate (that is,
set) or read the state, and by registering the state in the ancestor component that is
shared by the two other components.

### Describe the following code

1. Code snippet:
```jsx
const Message = () => {
  const [messageObj, setMessage] = useState({ message: "" });

  return (
    <div>
      <input
        type="text"
        value={messageObj.message}
        placeholder="Enter a message"
        onChange={e => {
          messageObj.message = e.target.value;
          setMessage(messageObj); 
        }}
      />
      <p>
        <strong>{messageObj.message}</strong>
      </p>
    </div>
  );
};
```

If you use the same value as the current state to update the state (React uses `Object.is()` for comparing), 
React won’t trigger a re-render.

Instead of creating a new object, the above example mutates the existing state object. To React, that’s the same object.

To make it work, we must create a new object, just like we discussed earlier:

```javascript
onChange={e => {
  const newMessageObj = { message: e.target.value };
  setMessage(newMessageObj); // Now it works
}}
```

2. Code snippet:
```jsx
const Message = () => {
  const [messageObj, setMessage] = useState({ message: '', id: 1 });

  return (
    <div>
      <input
        type="text"
        value={messageObj.message}
        placeholder="Enter a message"
        onChange={e => {
          const newMessageObj = { message: e.target.value };
          setMessage(newMessageObj); 
        }}
      />
      <p>
        <strong>{messageObj.id} : {messageObj.message}</strong>
      </p>
  </div>
  );
};
```
We only update the message property like in the above example, 
React will replace the original `{ message: '', id: 1 }` state object with the object used in the `onChange` event, 
which only contains the message property: 

`{ message: ‘message entered’ }` // id property is lost

Solution (if we want to keep the same id):
```javascript
onChange={e => {
  const val = e.target.value;
  setMessage(prevState => {
    return { ...prevState, message: val }
  });
}}
```

The `...prevState` part will get all of the properties of the object, 
and the `message: val` part will overwrite the `message` property.

3. Code snippet:
```jsx

```