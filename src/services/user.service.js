import axios from "axios";
import { authHeader } from "./auth.service";
const BASE_URL = "https://energy-utility-platform-amc.herokuapp.com/api/";
const API_URL = "https://energy-utility-platform-amc.herokuapp.com/api/admin/user/";


const getUser = (id) => {
  return axios.get(API_URL+ `${id}`, { headers: authHeader() });
}

const getAllUsers = () => {
  return axios.get(API_URL +"all", { headers: authHeader() });
}

const addUser = () => {
  return axios.post(API_URL +"add", { headers: authHeader() });
}

const editUser = (id, data) => {
  return axios.put(API_URL+ `edit/${id}`, data, { headers: authHeader() });
}

const deleteUser = (id) => {
  return axios.delete(API_URL+`delete/${id}`, { headers: authHeader() });
}


const findByName = (name) =>{
  return axios.get(API_URL + `search/${name}`, {headers: authHeader()});
}

const getPublicContent = () => {
  return axios.get(BASE_URL + "all");
};


const UserService ={
  getPublicContent,
  getUser,
  getAllUsers,
  editUser,
  deleteUser,
  addUser,
  findByName
}

export default UserService;



