The default rest client is responsible for:

* [Control url redirection for prod and test environment](#control-url-redirection-for-prod-and-test-environment)
* [Set default error handler TODO]

See the component and its usage:
* [`restClient.js`](../react-axios-app/src/rest/restClient.js)
* [its usage as a separate module](../react-axios-app/src/components/users/usersRest.js)
* [its usage as part of the React component](../react-axios-app/src/components/products/ProductsComponent.js)

### Control url redirection for prod and test environment.

1. Control the application content root, if it is used.

    For instance you web application will be hosted on:

    `${public.address}/${content.root}`
    
    And its rest services are exposed on:

    `${public.address}/${content.root}/${rest.url}`

    You could set `baseURL` that contains `content.root`. By default it has no root content.

2. Send all requests for test environment to `json-server`

```javascript
import axios from "axios";

export const APP_CONTENT_ROOT = "/my/app";

const APP_CONTENT_REST_ROOT = `${APP_CONTENT_ROOT}/rest`

const defaultBaseUrl = () => {
   if (window.location.port === "3000") {
      return `http://localhost:3500${APP_CONTENT_REST_ROOT}`;
   } else {
      const wl = window.location; //to shorten
      return `${wl.protocol}//${wl.hostname}:${wl.port}${APP_CONTENT_REST_ROOT}`
   }
}

// you could just assign base url via:
// axios.defaults.baseURL = defaultBaseUrl();

// alternatively we could configure `axiosClient` and export it
const axiosClient = axios.create({
   baseURL: defaultBaseUrl(),
   headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
   }
});

export default axiosClient;
```