import React, { useEffect, useState } from "react";
import formatPrice from "../utils/formatPrice";
import { renderStarProduct } from "../utils/helpers";
import Button from "./Button";
import icons from "../utils/icons";
import SelectQuantity from "./SelectQuantity";
import DOMPurify from "dompurify";
import clsx from "clsx";

const { GoPlus, GrFormSubtract } = icons;

const InforProduct = ({
  product,
  setCurrentProduct,
  currentProduct,
  setImage,
}) => {
  const [variants, setVariants] = useState(null);

  useEffect(() => {
    setCurrentProduct({
      title: product?.variants?.find((item) => item._id === variants)?.title,
      color: product?.variants?.find((item) => item._id === variants)?.color,
      price: product?.variants?.find((item) => item._id === variants)?.price,
      thumb: product?.variants?.find((item) => item._id === variants)?.thumb,
      images: product?.variants?.find((item) => item._id === variants)?.images,
    });
  }, [variants]);
  return (
    <div className="mx-3">
      <h3 className="font-bold text-[24px]">
        {formatPrice(currentProduct?.price || product?.price)}
      </h3>
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
            className="line-clamp-[10] mb-8"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product?.description),
            }}
          ></div>
        )}
      </ul>

      <span className="font-bold block mb-2">Color </span>
      <div className="flex flex-wrap gap-3 w-full">
        <div>
          <div
            className={clsx(
              "flex flex-col px-10 py-2 border text-xs min-w-[160px] cursor-pointer",
              !variants && "border-main"
            )}
            onClick={() => {
              setVariants(null);
              setImage("");
            }}
          >
            <span>{product?.color}</span>
            <span>{product?.price}</span>
          </div>
        </div>
        {product?.variants?.map((item) => {
          return (
            <div className="cursor-pointer">
              <div
                className={clsx(
                  "flex flex-col px-10 py-2 border text-xs min-w-[160px] cursor-pointer",
                  variants === item._id && "border-main"
                )}
                onClick={() => {
                  setVariants(item._id);
                  setImage("");
                }}
              >
                <span>{item?.color}</span>
                <span>{item?.price}</span>
              </div>
            </div>
          );
        })}
      </div>

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
