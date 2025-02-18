import axios from "axios";
const instance = axios.create({
  baseURL:
    "https://my-dating-mern-backend.herokuapp.com" || "http://localhost:8001",
});

export default instance;
