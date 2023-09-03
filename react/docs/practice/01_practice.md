
* [Create `Hello World!` `div` on the main page using JSX](01_practice_solutions.md#helloworld-jsx-component)
* [Rewrite the previous component using JS](01_practice_solutions.md#helloworld-js-alternative)
* [Compose two `JSX` components in the 3rd one](01_practice_solutions.md#jsx-elements-composition)
* [Create a nested html structure via `React` JS (without `JSX`)](01_practice_solutions.md#nested-structure-via-js)
  ```html
  <div>
    <div>Child1</div>
    <div>Child2
      <div>Child2_child</div>
    </div>
  </div>
  ```
* [Create `Greeting` component](01_practice_solutions.md#greeting-component)
  Return the appropriate JSX from this component so that when `username` is `undefined` or `null`, 
  it renders `Not logged in`. When `username` is a string, render `Hello, username`.

  Note: set `username` in the component itself, do't pass it via `props`
  ```jsx
  function Greeting() {
  // Try all of these variations:
  //var username = "root";
  //var username = undefined;
  //var username = null;
  //var username = false;

  // Fill in the rest:

  // return (...)
  };
  ```
* [Create `Person` component that uses `age`, `name` and `className` properties, show its usage](01_practice_solutions.md#person-component)
* 
* 
* 
* 
*
* 
* 
* [Create a `Book` component that renders this html structure]
```html
<div class='book'>
  <div class='title'>
    The Title
  </div>
  <div class='author'>
    The Author
  </div>
  <ul class='stats'>
    <li class='rating'>
      5 stars
    </li>
    <li class='isbn'>
      12-345678-910
    </li>
  </ul>
</div>
```
* 