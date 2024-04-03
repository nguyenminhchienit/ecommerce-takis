import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { showCart } from "../store/app/appSlice";
import { useDispatch, useSelector } from "react-redux";
import formatPrice from "../utils/formatPrice";
import Button from "./Button";
import { IoTrashOutline } from "react-icons/io5";
import withBaseComponent from "../pages/hocs/withBaseComponent";
import path from "../utils/path";
import { apiRemoveCart } from "../api/user";
import { toast } from "react-toastify";
import { apiGetUserCurrent } from "../store/user/asyncActions";

const Cart = ({ navigate }) => {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.user);

  const handleDeleteProductInCart = async (pid, color) => {
    const response = await apiRemoveCart(pid, color);
    if (response?.success) {
      dispatch(apiGetUserCurrent());
    } else {
      toast.error(response?.data);
    }
  };

  return (
    <div
      className="w-[480px] h-screen bg-[#747d8c] text-white p-8 fixed grid grid-rows-10 z-99999999"
      onClick={(e) => e.stopPropagation()}
    >
      <header className="py-4 h-full border-b row-span-1 border-white-500 flex justify-between items-center font-bold text-2xl">
        <span>Your cart</span>
        <span className="cursor-pointer" onClick={() => dispatch(showCart())}>
          <IoIosCloseCircle size={24} />
        </span>
      </header>
      <section className="row-span-7 h-full max-h-full overflow-y-auto flex gap-5 flex-col mt-5 w-full">
        {!current?.cart && <div>Your cart empty!</div>}
        {current?.cart?.map((item) => (
          <div key={item._id} className="flex gap-3 w-full">
            <img
              src={item?.thumbnail}
              alt="product-cart"
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex flex-col justify-center gap-3 w-full">
              <div className="flex justify-between gap-3 w-full">
                <span className="text-main">{item?.title}</span>
                <span
                  className=" flex justify-end items-center mt-3 cursor-pointer hover:text-main"
                  onClick={() =>
                    handleDeleteProductInCart(item?.product?._id, item?.color)
                  }
                >
                  <IoTrashOutline size={20} />
                </span>
              </div>
              <div className="flex justify-between gap-3 w-full">
                <span className="">Price: {formatPrice(item?.price)}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="row-span-2 h-full border-t border-white-500 flex flex-col gap-4 z-100">
        <div className="font-bold flex items-center justify-between mt-3">
          SubTotal:
          <span>
            {formatPrice(
              current?.cart?.reduce((sum, item) => sum + Number(item?.price), 0)
            )}
          </span>
        </div>
        <div>
          <span className="text-sm">
            GIẢM NGAY 50K khi bạn mua thêm hoá đơn trên 1 triệu
          </span>
        </div>

        <Button
          name={"Shopping Cart"}
          handleOnClick={() => {
            dispatch(showCart());
            navigate(`/${path.DETAIL_CART}`);
          }}
        />
      </div>
    </div>
  );
};

export default withBaseComponent(Cart);
