
* [What must you think about when implement rest requests?](#what-must-you-think-about-when-implement-rest-requests)
* [Axios vs its alternatives](#axios-vs-its-alternatives)
* [How to structure code with rest calls?](#how-to-structure-code-with-rest-calls)
* [Sync vs async requst](#sync-or-async-request)
* [Send request using hooks vs listeners](#send-request-using-hooks-vs-listeners)
* [Error response handling](#error-response-handling)

* [The required packages installation](docs/packages.installation.md)
* [Testing rest calls](docs/testing.with.json-server.md)
* [Default rest client](docs/rest.client.md)
* [Http requests](docs/http.methods.md)

### What must you think about when implement rest requests?

* [Rest client/framework choice](#axios-vs-its-alternatives)
* [How to structure code with rest calls?](#how-to-structure-code-with-rest-calls)

### Axios vs its alternatives

#### Pros
1. Simplicity

   Axios is very simple to use. 
   * unlike the Fetch API, you only need one `.then()` callback to access your requested JSON data.
   * it has many built-in conveniences, like for work with JSON data. 
     Unlike the Fetch API, you often don't need to set your headers.
   * better error handling. `Axios` throws 400 and 500 range errors for you. 
     Unlike the Fetch API, where you have to check the status code and throw the error yourself.
   * you can set default options, like headers, base URl, error handling
2. Backwards compatibility

   `ES6 Fetch API` is relatively new and old browsers aren’t capable of using it. 
   `Axios` is built on top of Javascript’s `XMLHttpRequest` - an old version of JS in-built HTTP calling mechanism.
   `Axios` supports the following browsers that are not supported by `ES6 Fetch API`
3. `Axios` supports more features than `ES6 Fetch API`, like
      * request/response interceptors (you can use other third-parties to do so for `ES6 Fetch API`)
4. 
#### Cons
Too sophisticated and too large for small apps. Fetch is native to Javascript, Axios is not.


### How to structure code with rest calls?

1. [Define `Axios` default rest client](#axios-rest-client). 
   
   2. Decide where to put domain-specific rest code. You have 3 options.

      For instance create a separate domain rest client for `products`, `users`, `comments`.

      1. Put domain-specific rest clients under a shared `rest/domain` folder:
         ```bash
         src/rest
         ├── domain
         │    ├── assetsRest.js
         │    ├── productsRest.js
         │    └── usersRest.js
         └── restClient.js
         ```
         If you try to decouple such domain clients from components themselves, then you go in the same wrong way, 
         when man decouples logic (JS) from view (html structure) by locating them in different files.
         By nature they are coupled. Almost everytime you change logic, you have to change view. 
         Having different files does not help.
         
         In this case, domain-specific rest logic is coupled by nature to the component 
         and should be located as close as possible to them. 
      
      2. Alternatively, you could locate domain-specific rest clients under the folders with components, like:
         ```bash
         src
         ├── components
         │     ├── assets
         │     │     ├── AssetsComponent.js
         │     │     └── assetsRest.js
         │     ├── products
         │     │     ├── ProductsComponent.js
         │     │     └── productsRest.js
         │     └── users
         │         ├── UsersComponent.js
         │         └── usersRest.js
         ├── rest
         │     └── restClient.js
         ```
      3. Locate domain-specific rest logic in the related components.
         You should start with this approach because it is the simplest one.

         If rest-specific logic gets more complicated, you could extract it from a component into a separate file.

### Sync or Async request

TODO https://www.digitalocean.com/community/tutorials/react-axios-react#step-6-using-async-and-await

the Async-Await Syntax
```jsx
import axios from "axios";
import React from "react";

const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/posts" 
});

export default function App() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    async function getPost() {
      const response = await client.get("/1");
      setPost(response.data);
    }
    getPost();
  }, []);  return (
    <div className="products">
      <div>Products</div>
      {products && products.map(product =>
        <div key={product.id}>
          <span>id: </span><span>{product.id} </span>
          <span>name: </span><span>{product.name} </span>
          <span>price: </span><span>{product.price} </span>
        </div>
      )}
    </div>
  )

  async function deletePost() {
    await client.delete("/1");
    alert("Post deleted!");
    setPost(null);
  }

  if (!post) return "No post!"

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
}
```

However in useEffect, there's an async function called getPost.

Making it async allows you to use the await keword to resolve the GET request and set that data in state on the next line without the .then() callback.

Note that the getPost function is called immediately after being created.

Additionally, the deletePost function is now async, which is a requirement to use the await keyword which resolves the promise it returns (every Axios method returns a promise to resolve).

After using the await keyword with the DELETE request, the user is alerted that the post was deleted, and the post is set to null.

### Send request using hooks vs listeners

todo 

Examples:
* [with hooks, recommended way](react-axios-app/src/components/products/Products.js)
* [with listeners, outdated way](react-axios-app/src/components/products/ProductsWithListener.js)

### Error response handling

You must
* extract readable information for user, show it to him
* adopt the html structure or (and) notify customer

In this case, instead of executing the .then() callback, Axios will throw an error and run the .catch() callback function.

```jsx
import axios from "axios";
import React from "react";

const baseURL = "https://jsonplaceholder.typicode.com/posts";

export default function App() {
  const [post, setPost] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    // invalid url will trigger an 404 error
    axios.get(`${baseURL}/asdf`).then((response) => {
      setPost(response.data);
    }).catch(error => {
      setError(error);
    });
  }, []);
  
  if (error) return `Error: ${error.message}`;
  if (!post) return "No post!"

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
```



