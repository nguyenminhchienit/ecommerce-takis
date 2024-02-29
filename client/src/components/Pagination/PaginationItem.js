import React from "react";
import {
  useSearchParams,
  createSearchParams,
  useParams,
  useNavigate,
} from "react-router-dom";

const PaginationItem = ({ children }) => {
  const [params] = useSearchParams();
  const { category } = useParams();
  const navigate = useNavigate();
  const handlePagination = () => {
    let param = [];
    for (let i of params.entries()) {
      param.push(i);
    }
    const queries = {};
    for (let i of param) {
      queries[i[0]] = i[1];
    }
    if (Number(children)) {
      queries.page = children;
    }
    navigate({
      pathname: category !== undefined ? `/products/${category}` : `/products`,
      search: createSearchParams(queries).toString(),
    });
    console.log(queries);
  };
  return (
    <button
      className="p-4 w-10 h-10 cursor-pointer flex justify-center items-center hover:rounded-full hover:bg-gray-300"
      onClick={handlePagination}
      disabled={!Number(children)}
    >
      {children}
    </button>
  );
};

export default PaginationItem;
