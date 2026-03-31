import axios from "axios";

const hostname =
  typeof window != "undefined" ? window.location.hostname : "localhost";
const ax = axios.create({
  baseURL: `http://${hostname}:80/api`,
  // baseURL: `https://sapphire-wheel-linear-neo.trycloudflare.com/api`,
  withCredentials: true,
});

ax.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);

export default ax;
