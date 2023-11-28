import React from "react";
import {
  Sidebar,
  Banner,
  BestSeller,
  DealDaily,
  ProductFeature,
} from "../../components";
import ArrivalsProduct from "../../components/ArrivalsProduct";
import HotCollection from "../../components/HotCollection";

const Home = () => {
  return (
    <>
      <div className="w-main flex mt-5">
        <div className="flex flex-col gap-3 w-[25%] flex-auto">
          <Sidebar />
          <DealDaily />
        </div>
        <div className="flex flex-col gap-3 w-[75%] flex-auto pl-3">
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div>
        <ProductFeature />
      </div>
      <div className="">
        <ArrivalsProduct />
      </div>
      <div className="">
        <HotCollection />
      </div>
    </>
  );
};

export default Home;
