import React, { memo } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
  return (
    <div>
      <ClipLoader color="#12CBC4" />
    </div>
  );
};

export default memo(Loading);
