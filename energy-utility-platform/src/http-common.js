import axios from "axios"

export const BASE_URL = "http://localhost:8080/api/";
export const USER_URL = "http://localhost:8080/api/user";

export default axios.create({
  BASE_URL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});
