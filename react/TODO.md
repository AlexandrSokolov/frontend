### create list componnt
  `key` attribute issue
  export, default export
  why we need index.js file
  unit test with gist
  its usage
### https://blog.logrocket.com/guide-usestate-react/#usestate-vs-useeffect
### https://react.dev/reference/react/useEffect
### https://overreacted.io/a-complete-guide-to-useeffect/
### https://blog.logrocket.com/react-hooks-cheat-sheet-solutions-common-problems/
### https://betterprogramming.pub/understanding-the-useeffect-dependency-array-2913da504c44
### https://legacy.reactjs.org/docs/hooks-intro.html
### https://legacy.reactjs.org/docs/hooks-faq.html
### https://blog.logrocket.com/solve-react-useeffect-hook-infinite-loop-patterns/
### https://blog.logrocket.com/react-useeffect-vs-uselayouteffect-hooks-examples/
### https://blog.logrocket.com/understanding-react-useeffect-cleanup-function/
### https://react.dev/learn/synchronizing-with-effects
### https://react.dev/learn/you-might-not-need-an-effect
### https://react.dev/learn/separating-events-from-effects
### https://react.dev/learn/lifecycle-of-reactive-effects
### https://react.dev/learn/removing-effect-dependencies
### https://react.dev/learn/reusing-logic-with-custom-hooks
### https://blog.logrocket.com/using-react-useeffect-hook-lifecycle-methods/

### [Hooks FAQ](https://legacy.reactjs.org/docs/hooks-faq.html)

### [Functional updates](https://legacy.reactjs.org/docs/hooks-reference.html#functional-updates)

### [React useState(0) vs useState( () => 0 )](https://stackoverflow.com/questions/72585007/react-usestate0-vs-usestate-0)

### How do lifecycle methods correspond to Hooks?

* constructor: Function components don’t need a constructor. You can initialize the state in the useState call. If computing the initial state is expensive, you can pass a function to useState.
* getDerivedStateFromProps: Schedule an update while rendering instead.
* shouldComponentUpdate: See React.memo below.
* render: This is the function component body itself.
* componentDidMount, componentDidUpdate, componentWillUnmount: The useEffect Hook can express all combinations of these (including less common cases).
* getSnapshotBeforeUpdate, componentDidCatch and getDerivedStateFromError: There are no Hook equivalents for these methods yet, but they will be added soon.

https://legacy.reactjs.org/docs/hooks-faq.html#can-i-skip-an-effect-on-updates

https://legacy.reactjs.org/docs/hooks-faq.html#can-i-run-an-effect-only-on-updates

### How can I do data fetching with Hooks?

https://legacy.reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes

### Can I run an effect only on updates?

https://legacy.reactjs.org/docs/hooks-faq.html#can-i-run-an-effect-only-on-updates

This is a rare use case. If you need it, you can use a mutable ref to manually store a boolean value corresponding to whether you are on the first or a subsequent render, then check that flag in your effect. (If you find yourself doing this often, you could create a custom Hook for it.)

### How to get the previous props or state?

https://legacy.reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state

### Why am I seeing stale props or state inside my function?

https://legacy.reactjs.org/docs/hooks-faq.html#why-am-i-seeing-stale-props-or-state-inside-my-function

### Is there something like instance variables?

https://legacy.reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables

### [A guide to choosing the right React state management solution](https://blog.logrocket.com/guide-choosing-right-react-state-management-solution/)

###

https://stackoverflow.com/questions/54625831/how-to-sync-props-to-state-using-react-hooks-setstate

### hooks api

https://blog.logrocket.com/react-reference-guide-hooks-api/

### 

https://blog.logrocket.com/react-hooks-cheat-sheet-solutions-common-problems/

### Customization via children

More examples, extract into a separate file as demo, it must not be in FAQ

### prop-types validation options

Create demo, extract from FAQ

More examples, extract into a separate file as demo, it must not be in FAQ

### todo practice

counter with parent/child to describe how state functions

### react hooks motiviation and the related issues

https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889
[Building Your Own Hooks](https://legacy.reactjs.org/docs/hooks-custom.html)

### running commands in parallel

[`concurrently`](https://www.npmjs.com/package/concurrently)
[How can I run multiple npm scripts in parallel?](https://stackoverflow.com/questions/30950032/how-can-i-run-multiple-npm-scripts-in-parallel)
[concurrently vs npm-run-all](https://github.com/open-cli-tools/concurrently/issues/180)

#### npm install optional? what it means

npm install

-O, --save-optional: Package will appear in your optionalDependencies.

### useState vs. useEffect

https://blog.logrocket.com/guide-usestate-react/
https://legacy.reactjs.org/docs/hooks-rules.html#explanation

### Understanding the useReducer Hook

https://blog.logrocket.com/guide-usestate-react/

### ESLint Plugin
https://legacy.reactjs.org/docs/hooks-rules.html#eslint-plugin

#### state updae via `React.useState`

const [post, setPost] = React.useState(null);

React.useEffect(() => {
axios.get(`${baseURL}/1`).then((response) => {
setPost(response.data);
});
}, []);

function deletePost() {
axios
.delete(`${baseURL}/1`)
.then(() => {
alert("Post deleted!");
setPost(null)
});
}

#### validaton -extract from questions, make questions very general, real validation with examples, not for practice
#### practice Example: static `Tweet Component`
#### practice Example: Tweet With Props
#### Example: Tweet with PropTypes
#### PropTypes Exercises from book
#### test it:

$ cp -a static-tweet props-tweet && cd props-tweet
$ npm start
Note: Don’t use cp -r since it does not preserve symlinks, and will break npm start.

#### create a component exampl that has:
* className attribute
* properties, all possible validations and custom validator
* children with passing certain parameters to children
* state
* 
#### eslint

Adding css files in the project. How it works?

01_React_Basics

####

Imagine that we constructed our own “API” of sorts for expressing a navigation header:
<Nav>
<NavItem url='/'>Home</NavItem>
<NavItem url='/about'>About</NavItem>
<NavItem url='/contact'>Contact</NavItem>
</Nav>
How to insert a separator between each item?

04_JSX_Children

#####

added 3 packages, and audited 1513 packages in 6s

245 packages are looking for funding
run `npm fund` for details

6 high severity vulnerabilities

To address all issues (including breaking changes), run:
npm audit fix --force

Run `npm audit` for details.

9403  npm outdated -g --depth=0
9404  npx npm-check-updates
9405  npx npm-check-updates -u

9409  npm update
9410  npm update --force
9411  npm audit

9378  npm audit fix
9379  npm audit fix --force

9408  npm install @mui/material @emotion/react @emotion/styled --legacy-peer-deps

####  hooks

https://react.dev/reference/react

### form

function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  function updateEmailHandler(event) {
    // could add email validation here
    setEmail(event.target.value);
  };
  function updateAgreementHandler(event) {
    setAgreed(event.target.checked); // checked is a default JS boolean
property
  };
  function signupHandler(event) {
    event.preventDefault(); // prevent browser default of sending a Http
request
    const userData = {userEmail: email, userAgrees: agreed};
    // doWhateverYouWant(userData);
  };
  return (
    <form onSubmit={signupHandler}>
      <div>
        <label htmlFor="email">Your email</label>
        <input type="email" id="email" onChange={updateEmailHandler}/>
      </div>
      <div>
        <input type="checkbox" id="agree"
onChange={updateAgreementHandler}/>
        <label htmlFor="agree">Agree to terms and conditions</label>
      </div>
    </form>
  );
};

> In the preceding code example, you might've noticed a new prop that
> wasn't used before in this book: htmlFor . This is a special prop, built into
> React and the core JSX elements it provides. It can be added to <label>
> elements in order to set the for attribute for these elements. The reason
> it is called htmlFor instead of just for is that, as explained earlier in the
> book, JSX looks like HTML but isn't HTML. It's JavaScript under the hood.
> And in JavaScript, for is a reserved keyword for for loops. To avoid
> problems, the prop is therefore named htmlFor .

### Execute an effect only once when a certain condition is met

https://blog.logrocket.com/useeffect-hook-complete-guide/

### Access data from previous renders

https://blog.logrocket.com/useeffect-hook-complete-guide/

### Additional thoughts on functions used inside of effects

https://blog.logrocket.com/useeffect-hook-complete-guide/


### Using async functions inside of useEffect

https://blog.logrocket.com/useeffect-hook-complete-guide/

### Unit testing of effects
https://blog.logrocket.com/useeffect-hook-complete-guide/

####

More on prop changes and using the useCallback Hook
React.memo

https://blog.logrocket.com/useeffect-hook-complete-guide/

### useCallback with useContext

### custom hooks

useEffect inside of custom Hooks
https://blog.logrocket.com/useeffect-hook-complete-guide/
https://blog.logrocket.com/react-custom-hooks-and-the-death-of-render-props-a0ce5cba387f/


