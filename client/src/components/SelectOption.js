import React from "react";

const SelectOption = ({ icon }) => {
  return (
    <div className="w-10 h-10 rounded-full bg-white border shadow-md flex justify-center items-center hover:bg-gray-800 hover:text-white hover:border-gray-800">
      {icon}
    </div>
  );
};

export default SelectOption;
