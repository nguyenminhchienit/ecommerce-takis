import React from "react";
import { navigation } from "../utils/constants";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="w-main h-[30px] py-2 gap-8 flex items-center text-sm">
      {navigation.map((item) => {
        return (
          <NavLink
            to={item.path}
            key={item.id}
            className={({ isActive }) =>
              isActive
                ? "py-2 hover:text-main text-main"
                : "py-2 hover:text-main "
            }
          >
            {item.value}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Navigation;
