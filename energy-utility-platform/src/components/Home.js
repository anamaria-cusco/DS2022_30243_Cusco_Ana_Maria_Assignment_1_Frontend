import React, { useState, useEffect } from "react";
import "./Animation/styles.css"
import Header from "./Animation/Header";
import Body from "./Animation/Body";
import "@animxyz/core";
import { XyzTransition } from "@animxyz/react";
import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  
  return (
    <XyzTransition appear duration="auto">
      <div className="page-wrap autumn">
        <Header />
        <Body />
      </div>
    </XyzTransition>
  );
};

export default Home;