import React, { memo, useState } from "react";
import clsx from "clsx";

const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  inValidField,
  setInValidField,
  placeholder,
  styleCustom,
}) => {
  const [isHover, setIsHover] = useState(false);
  const customNameKey = nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1);
  console.log(value);
  return (
    <div className="w-full mb-4 relative">
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
        className={clsx(
          "px-4 py-2 rounded-md w-full border outline-none focus-within:border-main",
          styleCustom
        )}
        placeholder={placeholder || customNameKey}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
        onFocus={() => {
          !placeholder && setIsHover(true);
          setInValidField && setInValidField([]);
        }}
        onBlur={() => setIsHover(false)}
      />
      {inValidField?.some((item) => item.name === nameKey) && (
        <small className="text-red-600 italic ml-1">
          {inValidField?.find((item) => item.name === nameKey).mes}
        </small>
      )}
    </div>
  );
};

export default memo(InputField);
