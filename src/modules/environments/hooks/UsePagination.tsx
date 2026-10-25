import { useState } from "react";

export const usePaginationState = (
  initialPageSize = 10,
  initialPageNumber = 0
) => {
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [pageNumber, setPageNumber] = useState(initialPageNumber);

  const resetPagination = () => {
    setPageSize(initialPageSize);
    setPageNumber(initialPageNumber);
  };

  return {
    pageSize,
    setPageSize,
    pageNumber,
    setPageNumber,
    resetPagination,
  };
};
