import React, { memo } from "react";

const InputSelect = ({ value, changeValue, options }) => {
  return (
    <select
      className="form-select border-gray-300 text-gray-500"
      value={value}
      onChange={(e) => changeValue(e.target.value)}
    >
      <option value={""}>Random</option>
      {options.map((item, index) => {
        return (
          <option key={index} value={item.value}>
            {item.text}
          </option>
        );
      })}
    </select>
  );
};

export default memo(InputSelect);
