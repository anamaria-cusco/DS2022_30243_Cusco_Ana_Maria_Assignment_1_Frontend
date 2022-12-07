import axios from "axios";
import { authHeader } from "./auth.service";

const API_URL = "https://energy-platform-am-backend.herokuapp.com/api/user/";

  
  const getDailyConsumption = (id, date) => {
    return axios.get(API_URL + `device/${id}/daily_consumption/${date}`, {headers: authHeader()}); //map<hour,consumption>
  }
  
  const getUserDevices = (id) => {
    return axios.get(API_URL + `devices/${id}`, {headers: authHeader()});
  }
  
const ClientService = {
  getDailyConsumption,
  getUserDevices,

}

export default ClientService;

