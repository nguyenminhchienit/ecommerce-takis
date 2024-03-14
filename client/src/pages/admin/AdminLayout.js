import React from "react";
import path from "../../utils/path";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SideBarAdmin from "../../components/SiderBar/SideBarAdmin";

const AdminLayout = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  if (!isLoggedIn || current.role !== "admin" || !current) {
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  }
  return (
    <div className="flex w-full bg-gray-200 min-h-screen relative">
      <div className="w-[320px] top-0 bottom-0 flex-none fixed">
        <SideBarAdmin />
      </div>
      <div className="w-[320px]"></div>
      <div className="flex-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
