
* [Customisation of `JSX` component, what must you think about as a creator](#customisation-of-jsx-component-what-must-you-think-about-as-a-creator)
* [Customisation via `props`, idea](#customisation-via-props-idea)
* [Modifying `props`](#modifying-props)
* [Define component that uses `props`, options, how do `props` get passed?](#define-component-that-uses-props-options)
* [Pass html `class` attribute via properties](#pass-html-class-attribute-via-properties)
* [What must you care about when define `props`?](#what-must-you-care-about-when-define-props)
* [Definition of components that expects children and its creation](#definition-of-components-that-expects-children-and-its-creation)
* [Types of `children`](#types-of-children)

### Customisation of `JSX` component, what must you think about as a creator?

When you create a component, to make it reusable, you think about customisation. 
So the first question is what might be customized by the consumer of the component.


The first option you have - [via `props`](#customization-via-props). 
You are, as a component owner, responsible for the full structure, and only certain values are allowed to be customized. 
The key here - the structure of component is hard coded.


If a client wants to customize your component with nested elements, 
that are not known in advance to the owner of the component, use [customisation via children](#customization-via-children). 
You define only a kind of basic template/structure, for instance by providing only a kind of "header". 
And the consumer reuses this header structure, by adding children. 


Without having children we can still compose components, but cannot compose them as nested ones.

### Customization via `props`

#### Customisation via `props`, idea

html element is customised via its html attributes:
```html
<img src="img_girl.jpg" width="500" height="600">
```

JSX component when customized by consumers look similar:
```jsx
<Person name='Dave' age='23' />
```

#### Modifying `props`

`props` in React are **read-only**. Components that receive `props` must not change them.

If you come from an Angular background this is a change. 
Angular’s 2-way binding mechanism allowed modifying scope variables (Angular’s version of props) 
and would automatically propagate those changes to the parent component.

In React, data flows **one way**. Props are **read-only**, and can only be passed down to children.

#### Define component that uses `props`, options

* via `props` map

  Definition:
  ```jsx
  const Hello = (props) => (
    <span>Hello, {props.name}</span>
  );
  ```
  Invocation:
  ```jsx
  <Hello name="Dave"/>
  ```
* via extracting properties using destructuring syntax

  You can read `{ someProperty }` as "extract the `someProperty` key from the object passed as the first argument"

  Definition:
  ```jsx
  const Hello = (props) => {
    const { name } = props;
    return (
      <span>Hello, {name}</span>
    );
  }
  ```
  Invocation:
  ```jsx
  <Hello name="Dave"/>
  ```
* via destructuring syntax only, no explicit extraction is needed

  Definition:
  ```jsx
  const Hello = ({ firstName, lastName }) => (
    <span>Hello, {firstName} {lastName}</span>
  );
  ```
  Invocation:
  ```jsx
  <Hello firstName="Alex" lastName="Sokol" />
  ```

#### Pass html `class` attribute via properties

`class` is a reserved name in JS, so in `React` `className` property is used for it:
```jsx
const Person = () => (
  <span className="menu navigation-menu">Person</span>
);
```

Define component with a class name as a property:
```jsx
const Person = ({ className }) => (
  <span className={className}>Person</span>
);
```

Passing class name:
```jsx
<Person className="my-css-class" />
```

#### Pass properties to the following `Person` component

```jsx
const Person = ({className, age, name}) => {
  <div className={className}>
    <div>Age: {age}</div>
    <div>Name: {name}></div>
  </div>
}
```
pass:
* string literal as `className`, 
* `age` as literal value
* `name` as `firstName + ' ' + lastName` JS expression:

```jsx
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

#### What must you care about when define `props`?

The question is: what happens if you forget to pass one of the `props`?

What you must consider:
* mark certain properties as required/optional as well as specifying type
```jsx
import PropTypes from 'prop-types';

function Comment({ author, message, likes }) {
  return (
    <div>
      <div className='author'>{author}</div>
      <div className='message'>{message}</div>
      <div className='likes'>
        {likes > 0 ? likes : 'No'} likes
      </div>
    </div>
  );
}
Comment.propTypes = {
  message: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  likes: PropTypes.number
}
```
* use a linter tool like [`ESLint`](https://eslint.org/) to check for things like 
  missing PropTypes and that props are passed correctly.

### `prop-types` validation options

TODO in quesion leave only a general description, extract into example

* validate for the standard JavaScript types
  * PropTypes.array
  * PropTypes.bool
  * PropTypes.func
  * PropTypes.number
  * PropTypes.object
  * PropTypes.string
* validate that the prop is one of a few types
  ```jsx
  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.boolean
  ])
  ```
* limit to specific values
  ```jsx
  PropTypes.oneOf(['person', 'place', 1234])
  ```
* validate for node - anything that can be rendered
  ```jsx
  PropTypes.node
  ```
* validate for React `element` - created with JSX or by calling React.createElement
  ```jsx
  PropTypes.element
  ```
* validate that the prop is an instance of a specific class
  ```jsx
  PropTypes.instanceOf(SpecificClass)
  ```
* validate that elements in array of string type
  ```jsx
  PropTypes.arrayOf(PropTypes.string)
  ```
  * Would match: ['a', 'b', 'c']
  * Would not match: ['a', 'b', 42]
* validate that all values of the object of number type 
  ```jsx
  PropTypes.objectOf(PropTypes.number)
  ```
  * Would match: {age: 27, birthMonth: 9}
  * Would not match: {age: 27, name: 'Joe'}
* validate that an object has a certain shape, meaning that it has particular properties
  ```jsx
  PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number
  })
  ```
  * It matches an object of exact shape
  ```javascript
  person = {
    name: 'Joe',
    age: 27
  }
  
  ```
  * It will also match an object with additional properties
  ```javascript
  person = {
    name: 'Joe',
    age: 27,
    address: '123 Fake St',
    validPerson: false
  }
  ```
  * `shape` is requiring an object that has `name` and `age` keys. warning:
  ```javascript
  person = {
    age: 27
  }
  ```
  * warning:
  ```javascript
  person = {
    name: false,  // boolean instead of string
    age: 27
  }
  ```
  * d
```javascript

```
  * d
```javascript

```
  * d
  * 

#### Required Props
#### Custom Validators

### Customization via children



#### Definition of components that expects children and its creation

* via passing `props` as a map:
  ```jsx
  const Picture = (props) => {
    return (
      <div>
        <img src={props.src}/>
        {props.children}
      </div>
    )
  }
  ```
* via destructuring syntax:
  ```jsx
  const Picture = ({ children }) => {
    return (
      <div>
        <img src={props.src}/>
        {children}
    </div>
    )
  }
  ```
  
Invocation:
```jsx
<Picture src="someUrl">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Picture>
```
Output:
```html
<div>
  <img src="someUrl" />
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```

#### Types of `children`

The `children` prop is always pluralized as `children` no matter whether there’s a single child or multiple children. 
Moreover, the type of children will change depending on what it contains.


When there are multiple children, `children` is an array of `ReactElements`.
However, when there is only one child, it is a single `ReactElement`. 

Children is used so often, and the single-child use case is common enough that 
the React team decided to optimize by not allocating an array when there’s only one child.

**TODO the following must be checked:**
Downside is: if you have to handle `children`, you must do that differently, based on its type.
A preferable option is use methods of `React.Children` cause they work independently from child type.

How to convert children into an array? Why we might need it?
children might be either an array of elements or a single element. 
If we want to work with it as with array, we can convert it to a flat array with:
`React.Children.toArray(children)`

Validate that only a single child is passed
Use `React.Children.only(children)`


#### Transform each child inside a component

Use `React.Children.map(children, function)`

#### Apply some side-effects per each child inside a component

Use `React.Children.forEach(children, function)`

#### Count a number of children

Use `React.Children.count(children)`

#### Validate that only a single child is passed

Use `React.Children.only(children)`

The method throws an exception if more than a single child is passed.


### Passing properties to a child element

Use `spread` operator: allows iterables( arrays / objects / strings ) to be expanded into single arguments/elements:
```javascript
const x = 1;
const y = 2;
const z = { a: 3, b: 4 };
let n = { x, y, ...z };
n; // { x: 1, y: 2, a: 3, b: 4 }
```

Component example:
```jsx
function CallbackButton(props) {
  return (
    <SimpleButton {...props} className={`btn btn-${props.theme} btn-sm m-1`} />
  )
}
```

#### Exclude certain properties from parent, and pass the others to child component

Use `rest` operator:
```javascript
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x; // 1
y; // 2
z; // { a: 3, b: 4 }
```

Component:
```jsx
function CallbackButton(props) {
    let { theme, ...childProps} = props;
    return (
        <SimpleButton {...childProps }
            className={`btn btn-${props.theme} btn-sm m-1`} />
    )
}
```

The `rest` operator is used in a statement that creates a `childProps` object that contains all of the parent’s
props except `theme`.

The destructuring operator is used to pass the `props` from the `childProps` object to the child component.

#### Exclude certain properties from parent, and pass the others to child component but overwrite certain properties

```jsx
var props = { foo: 'default' };
var component = <Component {...props} foo={'override'} />;
console.log(component.props.foo); // 'override'
```

### Communication between parent and its children

If a child needs to send data to its parent, the parent can inject a function as a prop, like this:
```jsx
function Child({ onAction }) {
  return (
    <button onClick={onAction}/>
  );
}
```
The `Child` component receives a `prop` named `onAction`, which it can call whenever it needs to send up data 
or notify the parent of an event. 
```jsx
function handleAction(event) {
  console.log('Child did:', event);
}
function Parent() {
  return (
    <Child onAction={handleAction}/>
  );
}
```

You’ll notice that the built-in `button` element accepts an `onClick` prop, which it’ll call when the button is clicked.

### 
Here is another example:
  ```jsx
  const LikeButton = ({ count }) => (
    <span className="like-button">
      <i className="fa fa-heart"/>
      {count > 0 &&
        <span className="like-count">
          {count}
      </span>}
    </span>
    );
  ```
* use different HTML or React components, based on condition:
  ```jsx
  function Recipe({ food, isEdit }) {
    return (
      <div>
        {food.name}
        {isEdit ? (
          <EditRecipe food={food} />
        ) : (
          <ShowRecipe food={food} />
        )}
      </div>
    );
  }
  ```
Note: The parentheses () around both implicit return statements in the ternary operator enable you to return a single
or multiple HTML elements or React components from there.
If it's just a single element though, you can omit the parentheses.