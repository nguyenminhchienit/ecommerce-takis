import React from "react";

const PaginationItem = ({ children }) => {
  return (
    <div className="p-4 w-10 h-10 cursor-pointer flex justify-center items-center hover:rounded-full hover:bg-gray-300">
      {children}
    </div>
  );
};

export default PaginationItem;
