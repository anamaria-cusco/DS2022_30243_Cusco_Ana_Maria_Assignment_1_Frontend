import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import {useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

const AddUserForm = () => {
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
  const navigate = useNavigate();
  

  useEffect(() => {
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };


  const addUser = () => {
    AuthService.register(currentUser)
      .then(response => {
        setMessage("The user was added successfully!");
        navigate("/manage_users");
      })
      .catch(e => {
        console.log(e);
        console.log(currentUser);
      });
  };

  return (
    <div className="autumn">
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
              <label htmlFor="password">Password</label>
              <input
                type="text"
                className="form-control"
                id="password"
                name="password"
                value={currentUser.password}
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
          <button className="btn btn-sm btn-danger mr-2" onClick={addUser}>
            Add Account
          </button>
    </div>
    </div>
    );
}



export default AddUserForm;