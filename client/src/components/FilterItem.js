import React from "react";
import icons from "../utils/icons";

const { FaSortDown } = icons;

const FilterItem = ({ title, name, xl }) => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <button
          className={
            xl
              ? "border p-2 text-sm capitalize flex gap-2 text-gray-600 w-[200px] justify-between"
              : "border p-2 text-sm capitalize flex gap-2 text-gray-600"
          }
        >
          {name} <FaSortDown />
        </button>
      </div>
    </div>
  );
};

export default FilterItem;
