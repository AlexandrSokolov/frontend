### Customization via children

More examples, extract into a separate file as demo, it must not be in FAQ

### prop-types validation options

Create demo, extract from FAQ

More examples, extract into a separate file as demo, it must not be in FAQ

### running commands in parallel

[`concurrently`](https://www.npmjs.com/package/concurrently)
[How can I run multiple npm scripts in parallel?](https://stackoverflow.com/questions/30950032/how-can-i-run-multiple-npm-scripts-in-parallel)
[concurrently vs npm-run-all](https://github.com/open-cli-tools/concurrently/issues/180)

#### npm install optional? what it means

npm install

-O, --save-optional: Package will appear in your optionalDependencies.


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

#### 