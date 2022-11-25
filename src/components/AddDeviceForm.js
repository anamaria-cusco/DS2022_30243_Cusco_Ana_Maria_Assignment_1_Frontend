import React, { useState, useEffect } from "react";
import DeviceService from "../services/device.service";
import {useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

const AddDeviceForm = () => {
  const initialDeviceState = {
    id: null,
    description: "",
    address: "",
    maxConsumption: 0
  };
  const [currentDevice, setCurrentDevice] = useState(initialDeviceState);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  


  useEffect(() => {
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentDevice({ ...currentDevice, [name]: value });
  };

  const addDevice = () => {
    DeviceService.addDevice(location.state.userId, currentDevice)
      .then(response => {
        console.log(response.data);
        setMessage("The device was added successfully!");
        navigate("/manage_devices");
      })
      .catch(e => {
        console.log(e);
      });
  };


  return (
    <div className="autumn">
        <div className="add-form">
          <h4> Add Device</h4>
          <form>
          <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentDevice.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={currentDevice.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="maxConsumption">Max Consumption</label>
              <input
                type="text"
                className="form-control"
                id="maxConsumption"
                name="maxConsumption"
                value={currentDevice.maxConsumption}
                onChange={handleInputChange}
              />
            </div>
          </form>
          <button className="btn btn-sm btn-danger mr-2" onClick={addDevice}>
            Add
          </button>
          <p>{message}</p>
        </div>
    </div>
    );
}


export default AddDeviceForm;