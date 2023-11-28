import React from "react";
import { useSelector } from "react-redux";
import icons from "../utils/icons";

const HotCollection = () => {
  const { categories } = useSelector((state) => state.app);
  const { IoIosArrowForward } = icons;
  console.log(categories);
  return (
    <div>
      <div className="mt-[15px]">
        <div className="uppercase font-semibold text-[20px] border-main border-b-2 ">
          Hot Collection
        </div>
        <div className="flex flex-wrap gap-4 mt-[30px]">
          {categories.map((item) => (
            <div className="w-[322px]" key={item._id}>
              <div className="border flex p-4 min-h-[200px] ">
                <img
                  src={item?.image}
                  alt="hot collection"
                  className="w-[144px] h-[122px] flex-1 object-cover"
                />
                <div className="flex-1 ml-4">
                  <span className="text-gray-600 font-semibold mb-2 inline-block">
                    {item.title}
                  </span>
                  <ul className="inline-block">
                    {item?.brand?.map((item) => (
                      <span className="flex gap-2 items-center text-gray-500 cursor-pointer hover:text-main">
                        <IoIosArrowForward size={12} />
                        <li className="text-sm ">{item}</li>
                      </span>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotCollection;
