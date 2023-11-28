import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../api/product";
import banner1 from "../assets/images/banner1-extend.png";
import banner2 from "../assets/images/banner2-extend.png";
import SliderProduct from "./SliderProduct";
import { useDispatch, useSelector } from "react-redux";
import { apiGetNewProducts } from "../store/product/asyncActions";

const tabs = [
  {
    id: 1,
    name: "Best Seller",
  },
  {
    id: 2,
    name: "New Product",
  },
];

const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [products, setProducts] = useState(bestSellers);
  const dispatch = useDispatch();

  const fetchProduct = async () => {
    const response = await apiGetProducts({ sort: "-sold" });
    if (response?.success) {
      setBestSellers(response.products);
      setProducts(response.products);
    }
  };

  const { newProducts } = useSelector((state) => state.products);

  const handleActiveTab = (item) => {
    setActiveTab(item.id);
  };

  useEffect(() => {
    if (activeTab === 1) {
      setProducts(bestSellers);
    } else if (activeTab === 2) {
      setProducts(newProducts);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchProduct();
    dispatch(apiGetNewProducts());
  }, []);
  return (
    <div>
      <div className="flex text-[16px] border-b-2 border-main py-2">
        {tabs.map((item) => {
          return (
            <span
              key={item.id}
              className={`uppercase cursor-pointer font-semibold text-gray-500 px-4 first:pl-0 last:border-none border-r ${
                activeTab === item.id ? "text-main" : ""
              }`}
              onClick={() => handleActiveTab(item)}
            >
              {item.name}
            </span>
          );
        })}
      </div>
      <div className="mt-2 mx-[-10px]">
        <SliderProduct products={products} />
      </div>
      <div className="flex gap-2 mt-4 w-[365px]">
        <img src={banner1} alt="banner" />
        <img src={banner2} alt="banner" />
      </div>
    </div>
  );
};

export default BestSeller;
