import React, { useState } from "react";
import formatPrice from "../utils/formatPrice";
import { renderStarProduct } from "../utils/helpers";
import SelectOption from "./SelectOption";
import icons from "../utils/icons";
import { Link } from "react-router-dom";
import path from "../utils/path";

const Product = ({ data }) => {
  const { MdMenuBook, IoEyeSharp, FaHeart } = icons;
  const [options, setOptions] = useState(false);
  return (
    <Link
      to={`/${path.DETAIL_PRODUCT}/${data?._id}/${data?.title}`}
      className="flex flex-col border"
      onMouseEnter={() => setOptions(true)}
      onMouseLeave={() => setOptions(false)}
    >
      <div className="relative">
        {options && (
          <div className="absolute left-0 right-0 bottom-0 justify-center gap-3 flex animate-slide-top">
            <SelectOption icon={<IoEyeSharp />} />
            <SelectOption icon={<MdMenuBook />} />
            <SelectOption icon={<FaHeart />} />
          </div>
        )}
        <img
          src={
            data.thumb ||
            "https://png.pngtree.com/template/20220419/ourmid/pngtree-photo-coming-soon-abstract-admin-banner-image_1262901.jpg"
          }
          alt="thumb-nail"
          className="w-[243px] h-[243px] object-cover"
        />
      </div>
      <div className="p-4 flex flex-col text-base">
        <span className="truncate uppercase">{data.title}</span>
        <span className="flex py-2">
          {renderStarProduct(data.totalRating)?.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </span>
        <span>{formatPrice(data.price)}</span>
      </div>
    </Link>
  );
};

export default Product;
