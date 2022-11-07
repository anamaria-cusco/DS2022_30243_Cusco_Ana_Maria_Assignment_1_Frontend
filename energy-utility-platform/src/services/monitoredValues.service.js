import axios from "axios";

const API_URL = "http://localhost:3000/api/admin/device/monitored_values/";

class MonitoredValueService {
  
  getDeviceMonitoresValues(id) {
    return axios.get(API_URL+ `${id}`);
  }

  addMonitoredValue(id) {
    return axios.post(API_URL+`add/${id}`);
  }

}

export default MonitoredValueService;


const MonitoredValueService = {
  getDeviceMonitoresValues,
  addMonitoredValue
}

/*
deleteAll() {
  return http.delete(`/devices`);
}


findUserDevices(id) {
  return axios.get(USER_URL+`/get_devices?id=${id}`);
}
*/
