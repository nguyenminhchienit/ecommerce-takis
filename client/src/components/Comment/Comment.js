import React from "react";
import moment from "moment";
import { renderStarProduct } from "../../utils/helpers";

const Comment = ({ name = "Anonymous", updatedAt, comment, star, image }) => {
  return (
    <div className="flex w-full gap-3">
      <div className="flex-none">
        <img
          src={
            image
              ? image
              : "https://img.freepik.com/premium-vector/blue-silhouette-person-s-face-against-white-background_754208-70.jpg"
          }
          alt="user"
          className="w-[30px] h-30px] object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col flex-auto mb-2 border p-4 rounded-md bg-gray-100">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{name}</h3>
          <span className="text-xs">{moment(updatedAt)?.fromNow()}</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs">Ratings: </span>
            <span className="flex py-2">
              {renderStarProduct(star)?.map((item, index) => (
                <span key={index}>{item}</span>
              ))}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-xs">Comment: </span>
            <span className="text-xs">{comment}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
