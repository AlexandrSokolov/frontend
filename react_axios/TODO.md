* ### use-axios-client

[How to Create a Custom useAxios Hook](https://www.freecodecamp.org/news/how-to-use-axios-with-react/#how-to-create-a-custom-useaxios-hook)

* [How To Use Axios with React](https://www.digitalocean.com/community/tutorials/react-axios-react)
* [Complete Guide to Axios HTTP Client](https://reflectoring.io/tutorial-guide-axios/)
* [ReactJS Tutorial: How to fetch data with Axios and display it](https://blog.devgenius.io/reactjs-tutorial-how-to-fetch-data-with-axios-and-display-it-b288321cfc07)
* [ReactJS Axios GET, POST, PUT and DELETE Example Tutorial](https://www.javaguides.net/2020/08/reactjs-axios-get-post-put-and-delete-example-tutorial.html)
* [The Complete Guide to Use Axios With React](https://www.innuy.com/blog/axios-react/)
* [Axios Tutorial](https://github.com/john-smilga/axios-tutorial-react)
* [Using HTTP client Axios in a React Application: A Tutorial](https://www.cloudsigma.com/using-http-client-axios-in-a-react-application-a-tutorial/)
* [How to Display API Data Using Axios with React](https://rapidapi.com/blog/axios-react-api-tutorial/)
* [How to use Axios with React](https://dev.to/femi_dev/how-to-use-axios-with-react-5fom)
* [Axios in React: A Guide for Beginners](https://www.geeksforgeeks.org/axios-in-react-a-guide-for-beginners/)
* [How To Use Axios with React?](https://www.knowledgehut.com/blog/web-development/axios-in-react)
* a Custom `useAxios` Hook.
  Instead of using useEffect to fetch data when the component mounts, 
  you could create your own custom hook with Axios to perform the same operation as a reusable function.

  While you can make this custom hook yourself, there's a very good library that gives you a custom 
  `useAxios` hook called `use-axios-client`.

  ```bash
  npm install use-axios-client
  ```
  
  ```jsx
  import { useAxios } from "use-axios-client";
  
  export default function App() {
    const { data, error, loading } = useAxios({
      url: "https://jsonplaceholder.typicode.com/posts/1"
    });
  
    if (loading || !data) return "Loading...";
    if (error) return "Error!";
  
    return (
      <div>
        <h1>{data.title}</h1>
        <p>{data.body}</p>
      </div>
    ) 
  }
  ```
  Now you can call useAxios at the top of the app component, pass in the URL you want to make a request to, 
  and the hook returns an object with all the values you need to handle the different states: 
  `loading`, `error` and the resolved `data`.

  In the process of performing this request, the value `loading` will be true. 
  If there's an error, you'll want to display that error state. 
  Otherwise, if you have the returned data, you can display it in the UI.
* 