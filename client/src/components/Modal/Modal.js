import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "../../store/app/appSlice";

const Modal = ({ children }) => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() =>
        dispatch(showModal({ isShowModal: false, childrenModal: null }))
      }
      className="absolute inset-0 z-50 bg-gray-100 bg-opacity-50 flex justify-center items-center"
    >
      {children}
    </div>
  );
};

export default memo(Modal);
