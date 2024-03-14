import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { adminSidebar } from "../../utils/constants";
import { NavLink } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import clsx from "clsx";

const SideBarAdmin = () => {
  const actived = "px-8 py-2 flex items-center gap-2 text-gray-200 bg-gray-500";
  const notActived =
    "px-8 py-2 flex items-center gap-2 text-gray hover:bg-gray-500 hover:text-gray-200 transition-all";

  const [active, setActive] = useState([]);
  const handleShowTabs = (tabID) => {
    if (active.some((el) => el === tabID)) {
      setActive((prev) => prev.filter((el) => el !== tabID));
    } else {
      setActive((prev) => [...prev, tabID]);
    }
  };
  return (
    <div className="bg-white h-full">
      <div className="py-4 flex flex-col items-center">
        <img src={logo} alt="logo" />
        <span className="pt-4 font-bold text-gray-600">Admin workspace</span>
        <div className="w-full mt-4 flex flex-col gap-3 justify-center transition-all">
          {adminSidebar.map((item) => {
            return (
              <div key={item.id} className="">
                {item.type === "SINGLE" && (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      clsx(isActive && actived, !isActive && notActived)
                    }
                  >
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </NavLink>
                )}
                {item.type === "PARENT" && (
                  <div onClick={() => handleShowTabs(item.id)}>
                    <div className="flex items-center justify-between px-8 py-2 gap-2 text-gray hover:bg-gray-500 hover:text-gray-200">
                      <div className="flex gap-2">
                        <span>{item.icon}</span>
                        <span>{item.text}</span>
                      </div>
                      <FaAngleDown />
                    </div>
                    {active.some((id) => id === item.id) && (
                      <div className="flex flex-col gap-3 justify-center mt-3 transition-all">
                        {item.submenu.map((sub) => {
                          return (
                            <NavLink
                              to={sub.path}
                              key={sub.text}
                              className={({ isActive }) =>
                                clsx(
                                  isActive && actived,
                                  !isActive && notActived,
                                  "pl-20"
                                )
                              }
                              onClick={(e) => e.stopPropagation()}
                            >
                              {sub.text}
                            </NavLink>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SideBarAdmin;
