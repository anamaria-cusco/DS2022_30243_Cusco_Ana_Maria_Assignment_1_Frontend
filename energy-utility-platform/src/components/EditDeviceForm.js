import React, { useState, useEffect } from "react";
import DeviceService from "../services/device.service";
import {useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

const EditDeviceForm = props => {
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
  

  const getDevice = id => {
    DeviceService.getDevice(id)
      .then(response => {
        setCurrentDevice(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getDevice(location.state.deviceId);
  }, [location.state.deviceId]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentDevice({ ...currentDevice, [name]: value });
  };

  const updateDevice = () => {
    DeviceService.editDevice(currentDevice.id, currentDevice)
      .then(response => {
        console.log(response.data);
        setMessage("The device was updated successfully!");
        navigate("/manage_devices");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteDevice = () => {
    DeviceService.deleteDevice(currentDevice.id)
      .then(response => {
        console.log(response.data);
        navigate("/manage_devices");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="autumn">
      {currentDevice ? (
        <div className="edit-form">
          <h4> Edit Device</h4>
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

          <button
            type="submit"
            className="btn btn-sm btn-primary"
            onClick={updateDevice}>
            Update
          </button>
          <button className="btn btn-sm btn-danger mr-2" onClick={deleteDevice}>
            Delete
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Device...</p>
        </div>
      )}
    </div>
  );
};

export default EditDeviceForm;