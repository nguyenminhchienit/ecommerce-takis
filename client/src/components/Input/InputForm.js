import clsx from "clsx";
import React, { memo } from "react";

const InputForm = ({
  label,
  disabled,
  register,
  errors,
  id,
  style,
  validate,
  placeholder,
  fw,
  type = "text",
  defaultValue,
}) => {
  return (
    <div className={clsx("h-[60px] gap-1 flex flex-col my-4", style)}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        {...register(id, validate)}
        disabled={disabled}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={clsx("form-input rounded-md", fw && "w-full")}
      />
      {errors[id] && (
        <small className="text-red-500 pt-1">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default memo(InputForm);
