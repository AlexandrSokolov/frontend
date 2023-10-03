
* [`get` http request for a list of items](#get-request-for-a-list-of-items)

### `get` request for a list of items

[See `ProductsComponent.js`](../react-axios-app/src/components/products/ProductsComponent.js)

1. Define `useState` and `useEffect` hooks:
```jsx
  const [products, setProducts] = useState([])

useEffect(() => {
  async function getProducts() {
    const response = await axiosClient.get("/products");
    setProducts(response.data);
  }
  getProducts();
}, []);
```
Note: make sure `useEffect` doesn't depend on `products`:
```jsx
useEffect(() => {
  async function getProducts() {
    const response = await axiosClient.get("/products");
    setProducts(response.data);
  }
  getProducts();
}, [products]);
```

In that case, the component sends constantly `get` requests. 
After each get request, React considers state has been updated, re-renders the component and sends request again.

2. Make sure you add a `key` attribute in the product element:
```jsx
  return (
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
```

# TODO:

### Display results of `get` requests in a component

Send `get` request when the component mounts.

```jsx
import axios from "axios";
import React from "react";

const baseURL = "https://jsonplaceholder.typicode.com/posts/1";

export default function App() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
```


### Create item with `post`

```jsx
import axios from "axios";
import React from "react";

const baseURL = "https://jsonplaceholder.typicode.com/posts";

export default function App() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(`${baseURL}/1`).then((response) => {
      setPost(response.data);
    });
  }, []);

  function createPost() {
    axios
      .post(baseURL, {
        title: "Hello World!",
        body: "This is a new post."
      })
      .then((response) => {
        setPost(response.data);
      });
  }

  if (!post) return "No post!"

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <button onClick={createPost}>Create Post</button>
    </div>
  );
}
```


### Update with `put` request
```jsx
import axios from "axios";
import React from "react";

const baseURL = "https://jsonplaceholder.typicode.com/posts";

export default function App() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(`${baseURL}/1`).then((response) => {
      setPost(response.data);
    });
  }, []);

  function updatePost() {
    axios
      .put(`${baseURL}/1`, {
        title: "Hello World!",
        body: "This is an updated post."
      })
      .then((response) => {
        setPost(response.data);
      });
  }

  if (!post) return "No post!"

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <button onClick={updatePost}>Update Post</button>
    </div>
  );
}
```

### Delete item with `delete` http method

You must ensure:
# request is sent successfully
# clean the related state
# update html structure or (and) notify customer

```jsx
import axios from "axios";
import React from "react";

const baseURL = "https://jsonplaceholder.typicode.com/posts";

export default function App() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(`${baseURL}/1`).then((response) => {
      setPost(response.data);
    });
  }, []);

  function updatePost() {
    axios
      .put(`${baseURL}/1`, {
        title: "Hello World!",
        body: "This is an updated post."
      })
      .then((response) => {
        setPost(response.data);
      });
  }

  if (!post) return "No post!"

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <button onClick={updatePost}>Update Post</button>
    </div>
  );
}
```
