import React from "react";
import VoteBar from "./VoteBarItem";
import { renderStarProduct } from "../../utils/helpers";

const Review = ({ totalRating, totalCountRating, ratings }) => {
  return (
    <div className="flex w-full">
      <div className="flex-2 border flex flex-col items-center justify-center">
        <span className="font-semibold text-[18px] flex items-center">{`${totalRating}/5`}</span>
        <span className="flex py-2">
          {renderStarProduct(totalRating)?.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </span>
        <span className="text-[12px]">{`${ratings?.length} reviewers and comments`}</span>
      </div>
      <div className="flex-3 border p-4 flex flex-col gap-2">
        {Array.from(Array(5).keys())
          .reverse()
          .map((item) => (
            <VoteBar
              key={item}
              number={item + 1}
              totalCount={ratings?.filter((i) => i.star === item + 1).length}
              totalRating={ratings?.length}
            />
          ))}
      </div>
    </div>
  );
};

export default Review;
