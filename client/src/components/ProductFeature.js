import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../api/product";
import FeatureCard from "../components/FeatureCard";

const ProductFeature = () => {
  const [productFeature, setProductFeature] = useState([]);
  const fetchProducts = async () => {
    const response = await apiGetProducts({ limit: 9, totalRating: 5 });
    if (response.success) {
      setProductFeature(response.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="mt-[15px]">
      <div className="uppercase font-semibold text-[20px] border-main border-b-2 ">
        Feature Product
      </div>
      <div className="flex flex-wrap mt-[30px] mx-[-10px]">
        {productFeature?.map((item) => {
          return (
            <FeatureCard
              key={item._id}
              image={item.thumb}
              price={item.price}
              title={item.title}
              totalRating={item.totalRating}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductFeature;
