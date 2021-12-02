import React, { FunctionComponent } from "react";
import Header from "../common/header/index";
import { Outlet } from "react-router-dom";
import Chat from "../features/chat/Chat";

const BigScreen: FunctionComponent = () => (
  <div className="m-0 p-0 h-100 d-md-flex flex-column">
    <Header />
    <div className="container-fluid d-flex h-100 flex-column">
      <div className="row flex-fill d-flex">
        <Outlet />
        <Chat />
      </div>
    </div>
  </div>
);

export default BigScreen;
