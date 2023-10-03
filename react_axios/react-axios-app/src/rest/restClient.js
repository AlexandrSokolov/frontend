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

//set default error handler:
axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error.response;
    if (res.status === 401) {
      const wl = window.location; //to shorten
      window.location.href = `${wl.protocol}//${wl.hostname}:${wl.port}/login`;
    }
    console.error(`Error response Code:${res.status}`);
    return Promise.reject(error);
  }
);

export default axiosClient;