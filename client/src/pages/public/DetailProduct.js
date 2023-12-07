import React from "react";
import { useParams } from "react-router-dom";
import { Breadcrumbs } from "../../components";

const DetailProduct = () => {
  const { pid, title, category } = useParams();
  return (
    <div className="w-full bg-gray-100 h-[70px] flex justify-center flex-col">
      <div className="ml-2">
        <div>{title}</div>
        <Breadcrumbs title={title} category={category} />
      </div>
    </div>
  );
};

export default DetailProduct;
