import React, { memo, useEffect } from "react";
import icons from "../utils/icons";
import { useState } from "react";
import { color } from "../utils/constants";
import { createSearchParams, useParams, useNavigate } from "react-router-dom";
import Button from "./Button";

const { FaSortDown } = icons;

const FilterItem = ({
  name,
  xl,
  handleChangeClick,
  activeClick,
  type = "checkbox",
}) => {
  const [selected, setSelected] = useState([]);
  const [price, setPrice] = useState({
    from: "",
    to: "",
  });

  const { category } = useParams();
  const navigate = useNavigate();

  const handleSelect = (e) => {
    const already = selected.find((item) => item === e.target.defaultValue);
    if (already) {
      setSelected((prev) =>
        prev.filter((item) => item !== e.target.defaultValue)
      );
    } else {
      setSelected((prev) => [...prev, e.target.defaultValue]);
    }
  };

  useEffect(() => {
    navigate({
      pathname: category !== undefined ? `/products/${category}` : `/products`,
      search:
        selected.length > 0 &&
        createSearchParams({
          color: selected.join(","),
        }).toString(),
    });
  }, [selected]);

  const handleClickFilterPrice = () => {
    const dataPrice = {
      from: price.from,
      to: price.to,
    };
    navigate({
      pathname: category !== undefined ? `/products/${category}` : `/products`,
      search:
        price.from !== "" &&
        price.to !== "" &&
        createSearchParams(dataPrice).toString(),
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-2 relative">
        <button
          className={
            xl
              ? "border p-2 text-sm capitalize flex gap-2 text-gray-600 w-[200px] justify-between "
              : "border p-2 text-sm capitalize flex gap-2 text-gray-600 "
          }
          onClick={() => handleChangeClick(name)}
        >
          {name} <FaSortDown />
        </button>

        {activeClick === name && (
          <div className="absolute top-full left-0 w-fit bg-white border z-10 min-w-[180px] p-2">
            <div>
              {type === "checkbox" && (
                <div className="flex flex-col gap-2">
                  <div className="text-sm flex justify-between font-semibold pb-2 border-b">
                    <span>{`${selected.length} Selected`}</span>
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        setSelected([]);
                        handleChangeClick(null);
                      }}
                    >
                      Reset
                    </span>
                  </div>
                  {color.map((item, index) => {
                    return (
                      <div
                        className="flex gap-3 items-center text-sm text-gray-500 cursor-pointer"
                        key={index}
                      >
                        <input
                          type={type}
                          id={item}
                          value={item}
                          onChange={(e) => handleSelect(e)}
                          checked={selected.some(
                            (itemSelected) => itemSelected === item
                          )}
                        />
                        <label htmlFor={item} className="capitalize">
                          {item}
                        </label>
                      </div>
                    );
                  })}
                </div>
              )}

              {type === "input" && (
                <div className="flex flex-col gap-2 p-4 min-w-[260px]">
                  <div className="text-sm flex justify-between items-center text-gray-500 pb-2 border-b">
                    <span className=" w-[70%]">{`The highest price is 31.619.610,49 VND`}</span>
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        setPrice({
                          from: "",
                          to: "",
                        });
                        handleChangeClick(null);
                      }}
                    >
                      Reset
                    </span>
                  </div>
                  <div className="flex gap-2 items-center mt-4">
                    <div className="flex gap-2 items-center">
                      <input
                        id="from"
                        className="form-input border outline-none p-3 bg-gray-200 w-[120px] h-[40px]"
                        type="number"
                        placeholder="From"
                        value={price.from}
                        onChange={(e) => {
                          setPrice((prev) => ({
                            ...prev,
                            from: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <span>-</span>
                    <div className="flex gap-2 items-center">
                      <input
                        id="from"
                        className="form-input border outline-none p-3 bg-gray-200 w-[120px] h-[40px]"
                        type="number"
                        placeholder="To"
                        value={price.to}
                        onChange={(e) => {
                          setPrice((prev) => ({
                            ...prev,
                            to: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  </div>
                  <Button
                    name={"Submit"}
                    handleOnClick={handleClickFilterPrice}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(FilterItem);
