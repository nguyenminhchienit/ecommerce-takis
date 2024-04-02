import React, { memo, useRef, useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import { voteOption } from "../../utils/constants";
import icons from "../../utils/icons";
import Button from "../Button";

const { FaStar } = icons;

const ModalVote = ({ nameProduct, handleSubmitRatings }) => {
  const [star, setStar] = useState(null);
  const [comment, setComment] = useState("");
  const modalRef = useRef();
  useEffect(() => {
    modalRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={modalRef}
      className="bg-white p-6 rounded-md shadow-sm flex flex-col gap-4 items-center justify-center z-50"
    >
      <img src={logo} alt="logo" />
      <h2 className="text-center text-medium">{`Rating product ${nameProduct}`}</h2>
      <textarea
        className="form-textarea w-full"
        placeholder="Type somethings"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <div className="border border-gray-300 rounded-md p-4">
        <span>How do you like this product?</span>
        <div className="flex gap-3 p-4">
          {voteOption.reverse().map((item) => {
            return (
              <div
                onClick={() => setStar(item.id)}
                className="flex justify-center text-gray-500 hover:text-gray-600 hover:bg-gray-300 cursor-pointer items-center w-[100px] flex-col gap-3 p-4 bg-gray-200 rounded-md"
                key={item.id}
              >
                {Number(star) && star >= item.id ? (
                  <FaStar color="orange" />
                ) : (
                  <FaStar color="gray" />
                )}
                {item.text}
              </div>
            );
          })}
        </div>
      </div>
      <Button
        name={"Rating"}
        handleOnClick={() => handleSubmitRatings({ star, comment })}
      />
    </div>
  );
};

export default memo(ModalVote);
