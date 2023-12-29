import React, { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import path from "../utils/path";
import { apiGetUserCurrent } from "../store/user/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import icons from "../utils/icons";
import Tooltip from "./ToolTip";
import { logout } from "../store/user/userSlice";

const { TbLogout2 } = icons;

const TopHeader = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const setTimerId = setTimeout(() => {
      if (isLoggedIn) {
        dispatch(apiGetUserCurrent());
      }
    }, 500);

    return () => {
      clearTimeout(setTimerId);
    };
  }, [isLoggedIn, dispatch]);
  return (
    <div className="w-full bg-main flex justify-center">
      <div className="w-main h-[38px]  text-white flex items-center justify-between">
        <div className="text-sm">ORDER ONLINE OR CALL US (+1800) 888 8888</div>

        {isLoggedIn ? (
          <div className="flex gap-2 items-center">
            <span className="text-sm">{`Welcome, ${current?.lastName} ${current?.firstName}`}</span>

            <Tooltip message={"Đăng xuất"}>
              <span
                onClick={() => dispatch(logout())}
                className="hover:bg-gray-300 p-2 hover:rounded-xl hover:text-main cursor-pointer"
              >
                <TbLogout2 size={18} />
              </span>
            </Tooltip>
          </div>
        ) : (
          <Link to={`/${path.LOGIN}`} className="text-sm hover:opacity-70">
            Sign In or Create Account
          </Link>
        )}
      </div>
    </div>
  );
};

export default memo(TopHeader);
