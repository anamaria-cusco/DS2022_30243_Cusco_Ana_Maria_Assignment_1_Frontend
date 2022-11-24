import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Button } from "bootstrap";
import AuthService, { authHeader } from "./services/auth.service";

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
import Card from 'react-bootstrap/Card';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap"

import * as SockJS from 'sockjs-client'
import * as Stomp from 'stompjs'
import EventBus from "./common/EventBus";

const SOCKET_URL = 'http://localhost:8080/ws-message'



const App = () => {
  var stompClient = null;
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal); //Set hide or show modal
  const [notifications, setNotifications] = useState([]);


  const connect = () => {
    const websocket = new SockJS(SOCKET_URL)
    const stompClient = Stomp.over(websocket)
    stompClient.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      stompClient.subscribe('/topic/message', function(notification) {
        handleNotification(notification);
      })
      })
  }

  
  const handleNotification = (notification) => {
    var not = JSON.parse(notification.body)
    if (AuthService.getCurrentUser()) {
      if(not.username === AuthService.getCurrentUser().username){
        setNotifications(notifications => [...notifications, not]);
      }
  }
}
  
  const displayNotification = () => {
    return (
        <div>
        {notifications.map((notification, index) => ( 
            <Card className="mb-3 ">
            <Card.Header>Device Consumption</Card.Header>
            <Card.Body>
              <Card.Title>{notification.deviceDescription}</Card.Title>
              <Card.Text>Monitored value from {notification.deviceDescription} excedded max consumption value of device. </Card.Text>
              <Card.Text>  Timestamp: {notification.timestamp} </Card.Text>  
              <Card.Text>Current value: {notification.currentValue} (max value: {notification.maxValue}) </Card.Text>
            </Card.Body>
            </Card>
        ))}
        </div>
  )}
  
  const disconnected = () => {
    if (stompClient !== null) {
      stompClient.disconnect();
   }
    console.log("Disconnected");
    }


  useEffect(() => {
    connect();
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
          
          {!showAdminBoard && currentUser && (
            <div className="navbar-nav ml-auto">
            <li className="nav-item">
            <button className="btn btn-dark btn-m me-2" onClick={toggle}>
              <i className="fa fa-bell"></i>
            </button>
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
      
      
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Notifications</ModalHeader>
        <ModalBody>
          <div className="align-center">     
              {displayNotification()}
          </div>
        </ModalBody>
      </Modal>

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
          <Route exact path="/devices" element={<Devices/>} />
          <Route exact path="/view_daily_consumption/:id" element={<DailyConsumptionChart/>} />
        </Routes>
      </div>

      {/* <AuthVerify logOut={logOut}/> */}
      <Footer />
    </div>
  );
};

export default App;
