import React from "react";
import formatPrice from "../utils/formatPrice";
import { renderStarProduct } from "../utils/helpers";

const FeatureCard = ({ title, image, totalRating, price }) => {
  return (
    <div className="w-1/3 flex-auto px-[10px] pb-[20px]">
      <div className="flex w-full border">
        <img src={image} alt="product" className="w-[100px] object-cover" />
        <div className="p-4 flex flex-col text-base">
          <span className="line-clamp-1 uppercase">{title}</span>
          <span className="flex py-2">
            {renderStarProduct(totalRating)?.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </span>
          <span>{formatPrice(price)}</span>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
