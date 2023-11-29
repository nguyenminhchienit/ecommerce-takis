import React, { memo, useState } from "react";

const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  inValidField,
  setInValidField,
}) => {
  const [isHover, setIsHover] = useState(false);
  const customNameKey = nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1);
  return (
    <div className="w-full my-4 relative">
      {isHover && (
        <label
          className="text-[12px] absolute animate-slide-top-sm top-[-10px] left-[12px] block bg-white px-2"
          htmlFor={nameKey}
        >
          {customNameKey}
        </label>
      )}
      <input
        type={type || "text"}
        className="px-4 py-2 rounded-md w-full border outline-none focus-within:border-main"
        placeholder={customNameKey}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
        onFocus={() => setIsHover(true)}
        onBlur={() => setIsHover(false)}
      />
    </div>
  );
};

export default memo(InputField);
