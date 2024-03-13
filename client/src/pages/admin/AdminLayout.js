import React from "react";
import path from "../../utils/path";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminLayout = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  if (!isLoggedIn || current.role !== "admin" || !current) {
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  }
  return (
    <div>
      AdminLayout
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
