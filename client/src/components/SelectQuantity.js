import React, { useState, memo, useEffect } from "react";
import { apiUpdateCart } from "../api/user";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { apiGetUserCurrent } from "../store/user/asyncActions";

const SelectQuantity = ({ defaultValue, onQuantity, data }) => {
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (defaultValue) {
      setQuantity(defaultValue);
    }
  }, []);
  const handleDecrement = async (e) => {
    if (quantity <= 1) {
      alert("Số lượng mặt hàng phải lớn hơn 1");
    } else {
      setQuantity((prev) => prev - 1);
      const response = await apiUpdateCart({
        pid: data?.product?._id,
        color: data?.color,
        quantity: -1,
      });
      if (response?.success) {
        toast.success("Giảm số lượng hàng");
        dispatch(apiGetUserCurrent());
      } else {
        toast.error(response?.data);
      }
    }
  };

  const handleIncrement = async (e) => {
    console.log("check: ", data.color);
    setQuantity((prev) => prev + 1);
    const response = await apiUpdateCart({
      pid: data?.product?._id,
      color: data?.color,
      quantity: 1,
    });
    if (response?.success) {
      toast.success("Tăng số lượng hàng");
      dispatch(apiGetUserCurrent());
    } else {
      toast.error(response?.data);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (onQuantity) {
      onQuantity(quantity);
    }
  }, [quantity]);

  return (
    <div>
      <div className="custom-number-input h-10 w-32">
        <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
          <button
            className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
            onClick={() => handleDecrement()}
          >
            <span className="m-auto text-2xl font-thin">−</span>
          </button>
          <input
            type="number"
            className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black flex items-center text-gray-700 "
            name="custom-input-number"
            value={quantity}
          ></input>
          <button
            className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
            onClick={() => handleIncrement()}
          >
            <span className="m-auto text-2xl font-thin">+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(SelectQuantity);
