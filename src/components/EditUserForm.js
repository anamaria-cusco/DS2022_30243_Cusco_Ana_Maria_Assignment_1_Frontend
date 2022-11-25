import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import {useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

const EditUserForm = props => {
  const initialUserState = {
    id: null,
    name: "",
    username:"",
    email:"",
    address: "",
    role: "",
  };
  const [currentUser, setCurrentUser] = useState(initialUserState);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  

  const getUser = id => {
    UserService.getUser(id)
      .then(response => {
        setCurrentUser(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser(location.state.userId);
  }, [location.state.userId]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const updateUser = () => {
    UserService.editUser(currentUser.id, currentUser)
      .then(response => {
        console.log(response.data);
        setMessage("The User was updated successfully!");
        navigate("/manage_users");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteUser = () => {
    UserService.deleteUser(currentUser.id)
      .then(response => {
        console.log(response.data);
        navigate("/manage_users");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="autumn">
      {currentUser ? (
        <div className="edit-form">
          <h4>User</h4>
          <form>
          <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentUser.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={currentUser.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={currentUser.email}
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
                value={currentUser.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                className="form-control"
                id="role"
                name="role"
                value={currentUser.role}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button
            type="submit"
            className="btn btn-sm btn-primary"
            onClick={updateUser}>
            Update
          </button>
          <button className="btn btn-sm btn-danger mr-2" onClick={deleteUser}>
            Delete
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a User...</p>
        </div>
      )}
    </div>
  );
};

export default EditUserForm;