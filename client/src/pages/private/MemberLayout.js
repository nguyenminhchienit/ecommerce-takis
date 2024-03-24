import React from "react";
import path from "../../utils/path";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SideBarMember from "../../components/SiderBar/SideBarMember";

const MemberLayout = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  if (!isLoggedIn || !current) {
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  }
  return (
    <div className="flex">
      <SideBarMember />
      <div className="flex-auto bg-gray-200 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default MemberLayout;
