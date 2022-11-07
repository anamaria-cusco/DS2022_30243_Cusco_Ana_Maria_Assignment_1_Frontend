import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Footer from "./components/Footer";
import Login from "./components/Login";
import Home from "./components/Home";
import Devices from "./components/Devices";
import ManageDevices from "./components/ManageDevices";
import EditDeviceForm from "./components/EditDeviceForm";
import AddDeviceForm from "./components/AddDeviceForm";
import ManageUsers from "./components/ManageUsers";
import EditUserForm from "./components/EditUserForm";
import AddUserForm from "./components/AddUserForm";
import DailyConsumptionChart from "./components/DailyConsumptionChart"


// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      console.log("Current User:" + user.role);
      setShowAdminBoard(user.role.includes("ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Energy Platform
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home 
            </Link>
          </li>
        </div>

        {showAdminBoard && (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
            <Link to={"/manage_users"} className="nav-link">
              Manage Users
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/manage_devices"} className="nav-link">
              Manage Devices
            </Link>
          </li>
          </div>
        )}

          {!showAdminBoard && currentUser && (
            <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/devices"} className="nav-link">
                My Devices
              </Link>
            </li>
            </div>
          )}
      
          
        {currentUser ? (
        <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="App">
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/manage_devices" element={<ManageDevices />} />
          <Route exact path="/edit_device/:id" element={<EditDeviceForm />} />
          <Route exact path="/add_device/:id" element={<AddDeviceForm />} />
          <Route exact path="/manage_users" element={<ManageUsers />} />
          <Route exact path="/edit_user/:id" element={<EditUserForm />} />
          <Route exact path="/add_user" element={<AddUserForm />} />
          <Route exact path="/devices" element={<Devices />} />
          <Route exact path="/view_daily_consumption/:id" element={<DailyConsumptionChart/>} />
        </Routes>
      </div>

      {/* <AuthVerify logOut={logOut}/> */}
      <Footer />
    </div>
  );
};

export default App;
