* [JSX, its purpose](#jsx-its-purpose)
* [Merging view (html) with the logic (JavaScript)](#merging-view-html-with-the-logic-javascript)
* [ What happens behind the scene with `JSX` components?](#what-happens-behind-the-scene-with-jsx-components)
* [`JSX` naming conventions](#jsx-naming-conventions)
* [Nested structure of html elements created via `React.createElement`](#nested-structure-of-html-elements-created-via-reactcreateelement)
* [`JSX` element, passing css class name and value](#jsx-element-passing-css-class-name-and-value)
* [Composing of `JSX` components](#composing-of-jsx-components)
* [Requirements to `JSX` components](#requirements-to-jsx-components)
* [Returning JS array](#returning-js-array)
* [Using JS code inside `JSX`](#using-js-code-inside-jsx)
* [Use string template literal inside `JSX`](#use-string-template-literal-inside-jsx)
* [Using conditional expressions](#using-conditional-expressions)
* [What if you need some code with multiple statement inside JSX?](#what-if-you-need-some-code-with-multiple-statement-inside-jsx)
* [Use JS expression, that return `JSX`. Accessing variables in this expression outside and inside of `JSX` part](#use-js-expression-that-return-jsx-accessing-variables-in-this-expression-outside-and-inside-of-jsx-part)
* [Using `alert` method](#using-alert-method)
* [JSX and string values](#jsx-and-string-values)
* [Comments in JSX](#comments-in-jsx)
* [Describe the following code](#describe-the-following-code)

### JSX, its purpose

JSX is a syntax invented for React that looks very similar to (X)HTML. 
It allows you to create elements by writing in a familiar-looking syntax, instead of writing out function calls by hand. 
The HTML-like syntax actually compiles down to real JavaScript.

### Merging view (html) with the logic (JavaScript)

**Possible problem:**
When combined, the code can turn into a tangled mess of conditional logic with duplicated HTML everywhere, 
like badly-written PHP. 

**Possible  solutions:**
* Separation of concerns. Split view from the logic in a separate file.

    If you’ve ever used something like Angular, 
    you’ve probably written the logic in one file and the HTML in a separate template file.

    How often have you opened up the template to tweak something 
    without having to look at (or change!) the associated JS code? 

    How often have you changed the JS without having to touch the template?

    In most code, it’s rare that you can add new functionality without changing both the template and its controller. 
  
    Add a function in one file, call it from the other. Passing an extra argument? Gotta change it in two files.
    If they were truly separated concerns, this would not be necessary.
  
    **The JS code and its related template are usually pretty tightly coupled.**
    Splitting code into separate files does not automatically lead to separation of concerns.

* React’s solution based on `JSX` components. Benefits:
  * You can mix HTML-like tags and JavaScript expressions within the same file.
  * JSX is a declarative syntax, which means developers describe **what the UI should look like** 
    based on the current state of the application rather than imperatively defining each step to render the UI.
    This declarative approach simplifies UI development and 
    enables React JSX to efficiently update and render components when the underlying data changes.

### What happens behind the scene with `JSX` components?

The `JSX` elements are compiled down to JavaScript by a tool called `Babel`. Babel is a "transpiler",
a made-up word that means it transforms code into valid ES5 JavaScript that all browsers can understand. 

Each `JSX` element becomes a function call, 
where its arguments are its attributes ("props") and its contents ("children")
```jsx
return <span>Hello!</span>;
```
is transformed by the compiler into:
```jsx
return React.createElement(
  'span',
  {},
  'Hello!');
```

### `JSX` naming conventions

Capitalize Component Names

The components you write must begin with an uppercase letter. 
This means using names like `UserList` and `Menu` and `SubmitButton`, 
and not names like ~~`userList`~~, ~~`menu`~~, and ~~`submitButton`~~. 


In `JSX`, a component that starts with a lowercase letter is assumed to be a built-in HTML or SVG element 
(`div`, `ul`, `rect`, etc.).

### Nested structure of html elements created via `React.createElement`?

To html:
```html
<div>
  <div>Child1</div>
  <div>Child2
    <div>Child2_child</div>
  </div>
</div>
```
is created by:
```jsx
React.createElement('div', {},
  React.createElement('div', {}, 'Child1'),
  React.createElement('div', {}, 'Child2',
    React.createElement('div', {}, 'Child2_child')));
```

### `JSX` element, passing css class name and value

To get:
```jsx
<span className='song-name'>
  {props.song.name}
</span>
```
run:
```jsx
React.createElement('span',
  { className: 'song-name' },
  props.song.name);
```

### Composing of `JSX` components

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

### Requirements to `JSX` components

* (recommendation, not a requirement) wrap multiline JSX with Parentheses
  ```jsx
  function HelloWorld() {
    return (
      <div>
          <Hello/> <World/>!
      </div>
    );
  }
  ```
  If you do not wrap return expression with () parentheses, the opening tag must be on the same line as the return, 
  which looks a bit awkward:
  ```jsx
  function HelloWorld() {
    return <div>
      <Hello/> <World/>!
    </div>
  }
  ```
  * Component can return a single element or an array or `null`
    * ~~you cannot return an array as a single element.~~ As of React v16 arrays are a valid return value for Elements.
    * if you must return more than a single component, you can:
      * return an array of the elements:
      ```jsx
      function HelloWorld() {
        return [<Hello/>, ' ', <World/>];
      }
      ```
      * wrap them inside of `<span>` element (or probably `<div>`)
        ```jsx
      function HelloWorld() {
        return <span>
          <Hello/> <World/>!
        </span>
      }
      ```
    * you cannot return `undefined`, return `null` instead

* JSX requires that every element be closed, similar to XML or XHTML.
  The html elements you might be used to leaving open in HTML5, like `<br>` or `<input>` or maybe even `<li>`, 
  must be close:
  ```text
  return <br/>;
  return <input type='password' .../>;
  return <li>text</li>;
  ```
  You cannot define them without closing by `/` as:
  ```
  return <br>;
  return <input type='password' ...>;
  return <li>text;
  ```

### Returning JS array

Arrays are, as of React v16 a valid return value for Elements.

### Using JS code inside `JSX`

You can use only JavaScript expressions (produce something), like:
```javascript
1 + 2
buttonLabel
aFunctionCall()
aFunctionName
```
but not statements (do not produce value) like:
```javascript
var a = 5
if(true) { 17; }
while(i < 7) { i++ }
```

Surround JS expressions with single braces like this:
```jsx
function SubmitButton() {
  var buttonLabel = "Submit";
  return (
    <button>{buttonLabel}</button>
  );
}
```

Note: all the rules that apply to function arguments apply to JSX expressions. 
Could you call a function like this: `myFunc(var x = true; x && 'is true');`?

### Use string template literal inside `JSX`

Wrap JS expression with `{` and `}`, variable inside string template literals wrap with: `${` and `}`
```jsx
function SubmitButton() {
  var buttonLabel = "Submit";
  return (
    <button>{`prefix-${buttonLabel}-suffix`}</button>
  );
}
```

### Using conditional expressions

* using the ternary operator ( ? ):
  ```jsx
  function ValidIndicator() {
    var isValid = true;
    return (
      <span>{isValid ? 'valid' : 'not valid'}</span>
    );
  }
  ```
* using boolean operators such as `&&`:
  ```jsx
  function ValidIndicator() {
    var isValid = true;
    return (
      <span>
        {isValid && 'valid'}
        {!isValid && 'not valid'}
      </span>
    );
  }
  ```

### What if you need some code with multiple statement inside JSX?

Extract the multiple statements to the function. Name it accordingly:
```jsx
function getRetweetCount(count) {
  if(count > 0) {
    return (
      <span className="retweet-count">
        {count}
      </span>
      );
  } else {
    return null;
  }
}
```
and use this function:
```jsx
const RetweetButton = ({ count }) => (
  <span className="retweet-button">
    <i className="fa fa-retweet"/>
    {getRetweetCount(count)}
  </span>
  );
```

### Use JS expression, that return `JSX`. Accessing variables in this expression outside and inside of `JSX` part

* JS expression is wrapped with `{` and `}` as expected.
* Variables inside JS expression, but outside `JSX` part, like `count` and `a` are not wrapped.
* Variables inside JS expression, located inside of `JSX` part, are additionally wrapped with `{` and `}`

```jsx
const LikeButton = () => {
  const count = 2;
  const a = 3;
  const b = 5;
  return (
    <div className="like-button">
      {count > 0 && a < 4 &&
      <span className="like-count">
        <div>count={count}</div>
        <div>a={a}</div>
        <div>b={b}</div>
      </span>}
  </div>
  );
}
```

### Using `alert` method

Do not use `;` symbol and it will alert: `alert('hi')`

### JSX and string values

* The quotes are displayed in the output as it is
* Spaces at trimmed and not visible in html. If you want to add a space at the beginning or at the end, use `&nbsp;`
* New line symbols are ignored in the output. If you want to see them in the browser output use `<br/>`
  TODO [How can I insert a line break into a <Text> component in React Native?](https://stackoverflow.com/questions/32469570/how-can-i-insert-a-line-break-into-a-text-component-in-react-native)
  TODO [Adding a new line in a JSX string inside a paragraph](https://stackoverflow.com/questions/50229792/adding-a-new-line-in-a-jsx-string-inside-a-paragraph-react)

### Comments in JSX

```jsx
// Double-slash comments are
{/* here is a comment */}
```

### Describe the following code:

1. Code snippet: 
```text
function HelloWorld() {
  return
    <div>
      <Hello/> <World/>!
    </div>;
}
```
You'll get the error:
```text
Expected an assignment or function call and instead saw an expression  no-unused-expressions
```
This is because JavaScript assumes you wanted a semicolon after that return (because of the newline), 
effectively turning it into this, which returns undefined:
```text
function HelloWorld() {
  return;
  <div>
  <Hello/> <World/>!
  </div>;
}
```
[Solution](#requirements-to-jsx-components)

2. Code snippet: 
```text
function HelloWorld() {
  return (<Hello/> <World/>!);
}
```
You’ll get an error:
```qute
Parsing error: Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?
```
`return (<Hello/> <World/>);` code is compiled to:
```text
return (
  React.createElement(Hello, null) React.createElement(World, null)
);
```
You could wrap with array:
```jsx
function HelloWorld() {
  return [<Hello/>, <World/>, "!"];
}
```
or wrap with `<div>`:
```jsx
function HelloWorld() {
  return (
    <div>
        <Hello/> <World/>!
    </div>
  );
}
```

3. Code snippet:
```text
return {x && 5; x && 7}
```
You'll get a compilation error:
```qute
Line 7:  Parsing error: Unexpected token, expected "}"
...
>  7 | 	  {  2 == 2; 1 == 1 }
|                  ^
```

4. Code snippet:
```text
  return (
    <div>
    { 
        if(true)
            return 'testIf';
    }
    </div>
    );
```
Error:
```qute
  Line 9:9:  Parsing error: Unexpected token

   7 |     <div>
   8 |     { 
>  9 |         if(true)
     |         ^
  10 |             return 'testIf';
  11 |     }
  12 |     </div>

```
5. Code snippet:
```text
  return (
    <div>
    "some value"
    </div>
    );
```
Output includes the quotes:
```qute
"some value"
```
6. Code snippet:
```text
  return (
    <div>
    Newline
    Test
    </div>
    );
```
Output ignores new line symbol:
```qute
Newline Test
```
7. d
```text
function hello() {
  return (
    <div>hello!</div>
    );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<hello />
);
```
Error:
```qute
Warning: The tag <hello> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.
```
8. 