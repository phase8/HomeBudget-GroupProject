import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3001/api", // its should be a env variable
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "application/json"
  }
});
