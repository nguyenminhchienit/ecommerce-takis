import React, { memo } from "react";
import Button from "../Button";
import Comment from "../Comment/Comment";

const Ratings = ({ handleToggleVote, ratings }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 mt-4">
      <span>Do you reviews this product?</span>
      <Button name={"Vote now!"} handleOnClick={handleToggleVote} fw={false} />
      {ratings.map((item) => {
        return (
          <Comment
            name={`${item.postedBy.lastName} ${item.postedBy.firstName}`}
            star={item.star}
            comment={item.comment}
            updatedAt={item.updatedAt}
          />
        );
      })}
    </div>
  );
};

export default memo(Ratings);
