import React, { useEffect, useMemo, useState } from "react";
import type { PropsWithClassName } from "@/types";
import { cn } from "@/utils";
import { cardData, type TCardData } from "./cardData";
import CardItem from "./CardItem";
import { useStore } from "@nanostores/react";
import { ecosystemTabExpandKey } from "@/store";
import { getPageData } from "@/utils/strapi";
import type { PaginationProps } from "@/components/Pagination";
import Pagination from "@/components/Pagination";

const CardList: React.FC<PropsWithClassName> = (props) => {
  const [list, setList] = useState<TCardData[]>(cardData);
  const [pageIndex, setPageIndex] = useState(1);
  const expandKey = useStore(ecosystemTabExpandKey) || "All";

  useEffect(() => {
    const filteredList =
      expandKey === "All"
        ? cardData
        : cardData.filter((item) => item.category === expandKey);
    setList(filteredList);
    setPageIndex(1);
  }, [expandKey]);

  const { pageIndexData, pagination } = useMemo(() => {
    const pageSize = 6;
    const pageData = getPageData(list, pageSize, pageIndex);
    const pageCount = pageData.length;
    const pageIndexData = pageData[pageIndex - 1];
    return {
      pageIndexData,
      pagination: {
        pageIndex,
        pageSize,
        rangePage:
          pageIndexData.length === 1 ? "1" : `1-${pageIndexData.length}`,
        pageCount,
        total: list.length,
        hasPrevious: pageIndex > 1,
        hasNext: pageIndex < pageCount,
        onPrevious: () => {
          setPageIndex(pageIndex - 1);
        },
        onNext: () => {
          setPageIndex(pageIndex + 1);
        },
      } as PaginationProps,
    };
  }, [list, pageIndex]);

  return (
    <div>
      <div
        className={cn(
          "flex flex-wrap",
          "mx-[-20px] mt-[50px]",
          /** 375 */
          "mt-[61px]",
          /** 768 */
          "md:mt-[40px]",
          /** 1024 */
          "lg:mt-[50px]"
        )}
      >
        {pageIndexData.map((item) => {
          return <CardItem key={item.title} data={item} />;
        })}
      </div>
      <Pagination {...pagination} />
    </div>
  );
};

export default CardList;
