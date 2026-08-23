import axios from "axios";

const api = axios.create({ baseURL: "http://projects-test:8000" });

api.interceptors.request.use((config) => {
  const token = window.sessionStorage.getItem("access_token");
  if (token) {
    config.headers.set("Authorization", `Token ${token}`);
  }
  return config;
});
export default api