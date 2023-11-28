import React from "react";
import { useSelector } from "react-redux";
import SliderProduct from "./SliderProduct";

const ArrivalsProduct = () => {
  const { newProducts } = useSelector((state) => state.products);
  return (
    <div className="mt-[15px]">
      <div className="uppercase font-semibold text-[20px] border-main border-b-2 ">
        New Arrivals
      </div>
      <div className="flex flex-wrap mt-[30px] mx-[-10px]">
        <SliderProduct products={newProducts} />;
      </div>
    </div>
  );
};

export default ArrivalsProduct;
