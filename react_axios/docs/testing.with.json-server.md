## `json-server` for testing purposes

### Install both `npm-run-all` to run scripts in parallel and `json-server`

```bash
npm install npm-run-all --save-dev
npm install json-server --save-dev
```
Alternatively, instead of `npm-run-all` you could install `concurrently`.

### Create `api.routes.json` file for rest calls redirection for `json-server`

[`api.routes.json`](../react-axios-app/test-json-server/api.routes.json)

This is useful, when the deployed web application has a configured content root.
The web application in this example has react app and backend rest services defined as part of the same application.

Example:
* you assume that your application will be hosted at `http://my-domain.com`
* different applications/microservices are hosted on this `my-domain.com` domain
* our web application, as an example, is going to have `/my/app` content root
* [our application has `APP_CONTENT_ROOT = "/my/app";` defined](../react-axios-app/src/rest/restClient.js)
* It means, when our application is deployed, the react application/components will be accessible via
  `http://my-domain.com/my/app`. The backend rest services, if they are part of our web application,
  will be accessible via: `http://my-domain.com/my/app/rest`
* When application is started locally for test purposes, we must redirect all our backend rest services to `json-server`

Use `APP_CONTENT_REST_ROOT` defined as:
```javascript
export const APP_CONTENT_ROOT = "/my/app";
const APP_CONTENT_REST_ROOT = `${APP_CONTENT_ROOT}/rest`
```
as a key in the following in `api.routes.json`:
```json
{ "/my/app/rest/*": "/$1" }
```

### Create `testData.json`:

[`testData.json`](../react-axios-app/test-json-server/testData.json)

Based on `testData.json` file, you can send requests to get:
* [users](http://localhost:3500/my/app/rest/users)
* [products](http://localhost:3500/my/app/rest/products)

### Configure in `package.json` to start react application together with `json-server`

In [`package.json`](../react-axios-app/package.json) instead of original `start`:
```json
{
  "scripts": {
    "start": "react-scripts start"
  }
}
```
Copy `start` into `reactstart`, add `json-server` script and adopt `start` to start both in parallel:
```json 
{
  "scripts": {
    "start": "npm-run-all --parallel reactstart json-server",
    "reactstart": "react-scripts start",
    "json-server": "json-server --p 3500 -r test-json-server/api.routes.json test-json-server/testData.json"
  }
}
```
