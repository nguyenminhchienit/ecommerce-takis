import React, { memo } from "react";
import { Link } from "react-router-dom";
import path from "../utils/path";

const TopHeader = () => {
  return (
    <div className="w-full bg-main flex justify-center">
      <div className="w-main h-[30px]  text-white flex items-center justify-between">
        <div className="text-sm">ORDER ONLINE OR CALL US (+1800) 888 8888</div>

        <Link to={`/${path.LOGIN}`} className="text-sm hover:opacity-70">
          Sign In or Create Account
        </Link>
      </div>
    </div>
  );
};

export default memo(TopHeader);
