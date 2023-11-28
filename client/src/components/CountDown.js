import React from "react";

const CountDown = ({ unit, number }) => {
  return (
    <div className="w-[30%] h-[60px] rounded-md bg-gray-200 text-gray-600 justify-center flex flex-col items-center">
      <span className="font-semibold">{number}</span>
      <span className="text-xs">{unit}</span>
    </div>
  );
};

export default CountDown;
