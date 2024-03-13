import React from "react";
import logo from "../assets/images/logo.png";
import icons from "../utils/icons";
import { Link } from "react-router-dom";
import path from "../utils/path";
import { useSelector } from "react-redux";

const Header = () => {
  const { MdLocalPhone, IoMdMail, HiMiniUserCircle, BsFillHandbagFill } = icons;
  const { isLoggedIn, current } = useSelector((state) => state.user);
  return (
    <div className="flex justify-between w-main h-[80px] py-[25px]">
      <div>
        <Link to={`/${path.HOME}`}>
          <img src={logo} alt="logo" className="w-[234px] object-contain" />
        </Link>
      </div>
      <div className="flex text-[12px]">
        <div className="flex flex-col items-center px-4 border-r">
          <div className="flex items-center gap-2">
            <MdLocalPhone color="red" />
            <span className="font-semibold">(+1800) 000 8808</span>
          </div>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>

        <div className="flex flex-col items-center px-4 border-r">
          <div className="flex items-center gap-2">
            <IoMdMail color="red" />
            <span className="font-semibold">support@takis.com</span>
          </div>
          <span>Online Support 24/7</span>
        </div>

        {isLoggedIn && current && (
          <>
            <div className="flex items-center justify-center gap-2 px-4 border-r">
              <BsFillHandbagFill color="red" />
              <span>0 item</span>
            </div>
            <Link
              className="flex items-center justify-center gap-2 px-4 border-r"
              to={
                current?.role === "admin"
                  ? `/${path.ADMIN}/${path.DASHBOARD}`
                  : `/${path.MEMBER}/${path.PERSONAL}`
              }
            >
              <HiMiniUserCircle size={24} color={"red"} />
              <span>Profile</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
