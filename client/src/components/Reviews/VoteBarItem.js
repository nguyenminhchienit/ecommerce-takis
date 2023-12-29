import React, { useRef, useEffect } from "react";
import icons from "../../utils/icons";

const { FaStar } = icons;

const VoteBar = ({ number, totalRating, totalCount }) => {
  const percentRef = useRef();
  useEffect(() => {
    const percent = totalCount
      ? Math.round((totalCount * 100) / totalRating)
      : 0;
    percentRef.current.style.cssText = `right: ${100 - percent}%`;
  }, [totalCount, totalRating]);
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-2 items-center w-[10%]">
        <span className="w-2 font-semibold">{number}</span>
        <FaStar color="orange" />
      </div>
      <div className="h-[6px] relative bg-gray-200 w-[70%] rounded-full overflow-hidden">
        <div ref={percentRef} className="absolute bg-orange-500 inset-0"></div>
      </div>
      <div className="w-[20%] flex justify-end">
        <span className="text-[12px]">{`${totalCount || 0} rev`}</span>
      </div>
    </div>
  );
};

export default VoteBar;
