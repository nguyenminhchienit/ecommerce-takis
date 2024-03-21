import React from "react";
import usePagination from "../../hooks/usePagination";
import PaginationItem from "./PaginationItem";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ totalCount = 60 }) => {
  const [params] = useSearchParams();
  const pagination = usePagination(totalCount, +params.get("page") || 1);
  return (
    <div className="flex items-center mt-5">
      {pagination?.map((item) => (
        <PaginationItem key={item}>{item}</PaginationItem>
      ))}
    </div>
  );
};

export default Pagination;
