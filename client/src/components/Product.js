import React, { useState } from "react";
import formatPrice from "../utils/formatPrice";
import { renderStarProduct } from "../utils/helpers";
import SelectOption from "./SelectOption";
import icons from "../utils/icons";
import path from "../utils/path";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { apiUpdateCart } from "../api/user";
import Swal from "sweetalert2";
import { apiGetUserCurrent } from "../store/user/asyncActions";

const Product = ({ data }) => {
  const { IoEyeSharp, FaHeart, BsFillCartCheckFill, BsCartPlusFill } = icons;
  const [options, setOptions] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.user);

  const handleClickOption = async (e, flag) => {
    e.stopPropagation();
    if (flag === "ADD_CART") {
      if (!current) {
        Swal.fire({
          title: "Almost...",
          text: "You must login before add to cart",
          cancelButtonText: "Not now",
          showCancelButton: true,
          confirmButtonText: "Login",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/${path.LOGIN}`);
          }
        });
      } else {
        const response = await apiUpdateCart({
          pid: data?._id,
          color: data?.color,
        });
        if (response?.success) {
          toast.success(response?.data);
          dispatch(apiGetUserCurrent());
        } else {
          toast.error(response?.data);
        }
      }
    }
  };
  return (
    <div
      onClick={() =>
        navigate(
          `/${path.DETAIL_PRODUCT}/${data?.category}/${data?._id}/${data?.title}`
        )
      }
      className="flex flex-col border cursor-pointer"
      onMouseEnter={() => setOptions(true)}
      onMouseLeave={() => setOptions(false)}
    >
      <div className="relative">
        {options && (
          <div className="absolute left-0 right-0 bottom-0 justify-center gap-3 flex animate-slide-top">
            <span onClick={(e) => handleClickOption(e, "QUICK_VIEW")}>
              <SelectOption icon={<IoEyeSharp />} />
            </span>
            {current?.cart?.some(
              (item) => item?.product === data?._id.toString()
            ) ? (
              <span onClick={(e) => handleClickOption(e, "ADD_CART")}>
                <SelectOption
                  icon={<BsFillCartCheckFill color="green" size={22} />}
                />
              </span>
            ) : (
              <span onClick={(e) => handleClickOption(e, "ADD_CART")}>
                <SelectOption icon={<BsCartPlusFill size={22} />} />
              </span>
            )}
            <span onClick={(e) => handleClickOption(e, "WISHLIST")}>
              <SelectOption icon={<FaHeart />} />
            </span>
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
    </div>
  );
};

export default Product;
