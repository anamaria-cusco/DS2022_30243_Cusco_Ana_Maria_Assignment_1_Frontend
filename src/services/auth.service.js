import axios from "axios";

const API_URL = "https://energy-platform-am-backend.herokuapp.com/api/auth/";


export function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    console.log("Access Token:"+ user.token);
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
};

const register = (data) => {
  return axios.post(API_URL + "sign-up", data);
};

const login = (username, password) => {
  return axios
    .post(API_URL + "sign-in", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      console.log(response.data);
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout", { headers: authHeader() }).then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}


export default AuthService;
