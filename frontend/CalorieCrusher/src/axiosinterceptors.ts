import axios from "axios";

const api = axios.create({ baseURL: "http://projects-test:8000/api/v1/" });

api.interceptors.request.use((config) => {
  const token = window.sessionStorage.getItem("access_token");
  if (token) {
    config.headers.set("Authorization", `Token ${token}`);
  }
  return config;
});
export default api

// export const foodapi = axios.create({ baseURL: "https://api.example.com" });

// // Fat secret API 

// foodapi.interceptors.request.use((config) => {
//   const token = localStorage.getItem("fatsecret_access_token");
//   if (token) {
//     config.headers.set("Authorization", `Bearer ${token}`);
//   }
//   return config;
// });
