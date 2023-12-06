import React from "react";
import type { PropsWithClassName } from "@/types";
import SmallPagination from "./Pagination.sm";
import MiddlePagination from "./Pagination.md";

export interface PaginationProps {
  pageData: number;
  pageSize: number;
  /** 当前页码的范围 */
  rangePage: string;
  pageCount: number;
  pageIndex: number;
  total: number;
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

const Pagination: React.FC<PaginationProps & PropsWithClassName> = (props) => {
  return (
    <>
      <SmallPagination className="md:hidden mt-[20px]" {...props} />
      <MiddlePagination className="hidden md:flex mt-[40px]" {...props} />
    </>
  );
};

export default Pagination;
