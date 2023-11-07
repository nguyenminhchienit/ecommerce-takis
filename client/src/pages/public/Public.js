import React from "react";
import { Outlet } from "react-router-dom";

const Public = () => {
  return (
    <>
      <div>Public</div>
      <Outlet></Outlet>
    </>
  );
};

export default Public;
