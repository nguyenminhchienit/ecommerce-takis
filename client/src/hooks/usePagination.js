import { useMemo } from "react";
import { generateRange } from "../utils/helpers";
import { BsThreeDots } from "react-icons/bs";

const usePagination = (totalCountProduct, currentPage, siblingCount = 1) => {
  const paginationArray = useMemo(() => {
    // const pageSize = process.env.REACT_APP_PRODUCT_LIMIT || 10;
    const pageSize = 8;
    const paginationCount = Math.ceil(totalCountProduct / pageSize);
    const totalPaginationItem = siblingCount + 5;

    if (paginationCount <= totalPaginationItem) {
      return generateRange(1, paginationCount);
    }

    const isShowLeft = currentPage - siblingCount > 2;
    const isShowRight = currentPage + siblingCount < paginationCount - 1;

    if (isShowLeft && !isShowRight) {
      const rightStar = paginationCount - 4;
      const rightRange = generateRange(rightStar, paginationCount);
      return [1, <BsThreeDots />, ...rightRange];
    }

    if (!isShowLeft && isShowRight) {
      const leftEnd = 5;
      const leftRange = generateRange(1, leftEnd);
      return [...leftRange, <BsThreeDots />, paginationCount];
    }

    const siblingLeft = Math.max(currentPage - siblingCount, 1);
    const siblingRight = Math.min(currentPage + siblingCount, paginationCount);

    if (isShowLeft && isShowRight) {
      const middleRange = generateRange(siblingLeft, siblingRight);
      return [
        1,
        <BsThreeDots />,
        ...middleRange,
        <BsThreeDots />,
        paginationCount,
      ];
    }
  }, [totalCountProduct, currentPage, siblingCount]);

  return paginationArray;
};

export default usePagination;
