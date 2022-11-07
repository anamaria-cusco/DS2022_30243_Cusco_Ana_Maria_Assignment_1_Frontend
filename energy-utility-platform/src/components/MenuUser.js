import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import AuthService from "../services/auth.service";

const MenuUser = () => {
  const [content, setContent] = useState("");
  const user = AuthService.getCurrentUser();
  
  useEffect(() => {
   
    UserService.getUserMenu().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        {console.log(user)}
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default MenuUser;
