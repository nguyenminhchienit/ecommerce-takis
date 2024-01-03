import React from "react";
import usePagination from "../../hooks/usePagination";
import PaginationItem from "./PaginationItem";

const Pagination = ({ totalCount = 66 }) => {
  const pagination = usePagination(totalCount, 2);
  return (
    <div className="flex items-center mt-5">
      {pagination?.map((item) => (
        <PaginationItem key={item}>{item}</PaginationItem>
      ))}
    </div>
  );
};

export default Pagination;
