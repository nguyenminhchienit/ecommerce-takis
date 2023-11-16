import React from "react";
import { Sidebar, Banner } from "../../components";

const Home = () => {
  return (
    <div className="w-main flex mt-5">
      <div className="flex flex-col gap-3 w-[20%] flex-auto">
        <Sidebar />
        <span>Deal Daily</span>
      </div>
      <div className="flex flex-col gap-3 w-[80%] flex-auto pl-3">
        <Banner />
        <span>Best Seller</span>
      </div>
    </div>
  );
};

export default Home;
