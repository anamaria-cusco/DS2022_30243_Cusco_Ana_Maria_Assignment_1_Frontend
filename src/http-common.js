import axios from "axios"

export const BASE_URL = "https://energy-platform-am-backend.herokuapp.com/api/";
export const USER_URL = "https://energy-platform-am-backend.herokuapp.com/api/user";

export default axios.create({
  BASE_URL: "https://energy-platform-am-backend.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});
