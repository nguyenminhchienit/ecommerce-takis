import React from "react";
import { useParams } from "react-router-dom";

const DetailProduct = () => {
  const { pid } = useParams();
  console.log("Check pid: ", pid);
  return <div>DetailProduct</div>;
};

export default DetailProduct;
