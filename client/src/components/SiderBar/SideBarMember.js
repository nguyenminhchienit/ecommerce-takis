import React, { useState } from "react";
import avatar from "../../assets/images/avatar.avif";
import { memberSidebar } from "../../utils/constants";
import { NavLink } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import clsx from "clsx";
import { useSelector } from "react-redux";

const SideBarAdmin = () => {
  const { current } = useSelector((state) => state.user);
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
    <div className="bg-white h-full w-[300px]">
      <div className="py-4 flex flex-col items-center">
        <img
          src={current?.avatar || avatar}
          alt="logo"
          className="w-36 h-36 rounded-full"
        />
        <span className="pt-4 font-bold text-gray-600">{` ${current?.lastName} ${current?.firstName}`}</span>
        <div className="w-full mt-4 flex flex-col gap-3 justify-center transition-all">
          {memberSidebar.map((item) => {
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
