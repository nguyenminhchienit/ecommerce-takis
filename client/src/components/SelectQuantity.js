import React, { useState, memo } from "react";

const SelectQuantity = () => {
  const [quantity, setQuantity] = useState(1);
  const handleDecrement = (e) => {
    if (quantity <= 0) {
      alert("Số lượng mặt hàng phải lớn hơn 0");
    } else {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrement = (e) => {
    setQuantity((prev) => prev + 1);
  };

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
