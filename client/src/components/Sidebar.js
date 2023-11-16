import React from "react";
import icons from "../utils/icons";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { TbCategoryFilled, MdOutlineStart } = icons;
  const { categories } = useSelector((state) => state.app);
  return (
    <div className="border">
      <div className="bg-main flex items-center p-2 gap-4">
        <TbCategoryFilled color="white" />
        <span className="text-center font-semibold text-white">CATEGORY</span>
      </div>

      <div className="flex flex-col gap-3 p-2 text-sm ">
        {categories &&
          categories?.map((item) => {
            return (
              <div className="flex gap-6 items-center">
                <MdOutlineStart />
                <NavLink
                  to={item.slug}
                  key={item._id}
                  className={({ isActive }) =>
                    isActive
                      ? "hover:text-main text-main uppercase"
                      : "hover:text-main uppercase"
                  }
                >
                  {item.title}
                </NavLink>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Sidebar;
