import React, { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";

const Popout: FunctionComponent = () => (
  <div className="container-fluid h-100">
    <div className="row row-cols-1 d-flex justify-content-center h-100">
      <div className="col popout align-self-center">
        <Outlet />
      </div>
    </div>
  </div>
);

export default Popout;
