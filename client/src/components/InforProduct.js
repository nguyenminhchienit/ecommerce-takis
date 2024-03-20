import React, { useState } from "react";
import formatPrice from "../utils/formatPrice";
import { renderStarProduct } from "../utils/helpers";
import Button from "./Button";
import icons from "../utils/icons";
import SelectQuantity from "./SelectQuantity";
import DOMPurify from "dompurify";

const { GoPlus, GrFormSubtract } = icons;

const InforProduct = ({ product }) => {
  return (
    <div className="mx-3">
      <h3 className="font-bold text-[24px]">{formatPrice(product?.price)}</h3>
      <span className="flex py-2">
        {renderStarProduct(product?.totalRating)?.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </span>
      <ul className="flex flex-col mt-2 list-square">
        {product?.description?.length > 1 && (
          <div>
            {" "}
            {product?.description?.map((item, index) => {
              return (
                <li key={index} className="text-[16px] text-gray-500">
                  {item}
                </li>
              );
            })}
          </div>
        )}
        {product?.description?.length === 1 && (
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product?.description),
            }}
          ></div>
        )}
      </ul>

      <div className="mt-4 flex items-center">
        <span className="font-semibold mr-4">Quantity</span>
        <div className="flex items-center">
          {/* <GrFormSubtract size={30} />
          <span className="mx-4 text-[24px]">{quantity}</span>
          <GoPlus size={30} /> */}
          <SelectQuantity />
        </div>
      </div>

      <div className="mt-4">
        <Button name={"ADD TO CARD"} />
      </div>
    </div>
  );
};

export default InforProduct;
