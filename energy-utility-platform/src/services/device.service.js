import axios from "axios";
import { authHeader } from "./auth.service";
const API_URL = "https://energy-utility-platform-amc.herokuapp.com/api/admin/device/";


const getAllDevices = () =>  {
  console.log(authHeader());
  return axios.get(API_URL +"all", { headers: authHeader() });
}


const getDevice = (id) => {
  return axios.get(API_URL+ `${id}`, { headers: authHeader() });
}

const addDevice = (id, data) => {
  return axios.post(API_URL+ `add/${id}`, data, { headers: authHeader() });
}

const editDevice = (id, data) => {
  return axios.put(API_URL+ `edit/${id}`, data, { headers: authHeader() });
}

const deleteDevice = (id) => {
  return axios.delete(API_URL+`delete/${id}`, { headers: authHeader() });
}

const deleteAll = () =>{
  return axios.delete(API_URL+`delete/all`, { headers: authHeader() } );
}

const findByDescription = (description) =>{
  return axios.get(API_URL + `search/${description}`, {headers: authHeader()});
}

const DeviceService = {
  getAllDevices,
  getDevice,
  addDevice,
  editDevice,
  deleteDevice,
  deleteAll,
  findByDescription
}

export default DeviceService;
/*
deleteAll() {
  return http.delete(`/devices`);
}


findUserDevices(id) {
  return axios.get(USER_URL+`/get_devices?id=${id}`);
}
*/
