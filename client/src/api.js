import axios from "axios";

function getCookie(name) {
  const cookie = document.cookie // 👉 এটা browser-এর সব cookie একসাথে string আকারে দেয়. Example:"userId=123; token=abc123; theme=dark"
    .split("; ")  // 👉 cookie string কে "; " দিয়ে ভাগ করে একটা array বানায়. Example ["userId=123", "token=abc123", "theme=dark"]
    .find((item) => item.startsWith(`${name}=`)); //👉 array থেকে সেই item খুঁজে বের করে যেটা "name=" দিয়ে শুরু হয়. Example: যদি name "token" হয়, তাহলে এটা "token=abc123" item খুঁজে বের করবে.
  
return cookie ? decodeURIComponent(cookie.split("=")[1]) : ""; //decodeURIComponent(...) 👉 encoded value থাকলে decode করে.Exapmle: "name=Yeasin%20Mazumder" 👉 decode করলে: "Yeasin Mazumder"
}

const apiBaseUrl = import.meta.env.VITE_API_URL;

if (!apiBaseUrl) {
  throw new Error("vite api url is missing");
}

const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const method = (config.method || "get").toUpperCase();

  if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    const csrfToken = getCookie("csrf_token");

    if (csrfToken) {
      config.headers = config.headers || {};
      config.headers["x-csrf-token"] = csrfToken;

      // যদি headers already থাকে → সেটাই use করো
      // না থাকলে → নতুন empty object {} বানাও

      // 👉 এটা null/undefined error avoid করার জন্য ✔️
    }
  }

  return config;
});

export default api;