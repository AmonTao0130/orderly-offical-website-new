import useSWR from "swr";
import { useState, useMemo, useEffect } from "react";
import { type Article, type TPagination } from "@/strapi/type";
import { fetcher } from "@/utils";
import { STRAPI_MAX_PAGE_SIZE } from "@/strapi/services";

interface UseArticlesProps {
  displaySize?: number;
  category?: string;
  articles: Article[];
  total: number;
}
export function useArticles(props: UseArticlesProps) {
  const { displaySize = 6, category = "" } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [dataSource, setDataSource] = useState<Article[]>(props.articles || []);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasNextBatch, setHasNextBatch] = useState(false);
  const [currentBatch, setCurrentBatch] = useState(1);

  const filterArticles = useMemo(() => {
    if (category) {
      return props.articles?.filter(
        (article) =>
          article?.attributes?.category?.data?.attributes?.slug === category
      );
    }

    return props.articles;
  }, [category, props.articles]);

  useEffect(() => {
    const resetState = () => {
      setCurrentPage(1);
      setIsLoadingMore(false);
      setHasNextBatch(false);
      setCurrentBatch(1);
      setDataSource(filterArticles);
    };

    resetState();
  }, [category, filterArticles]);

  const getUrl = (page = 1) => {
    // 接口固定每次请求 100 条数据，所以不需要添加 pageSize 参数
    const categoryStr = category ? `&category=${category}` : "";
    return `/api/articles?page=${page}${categoryStr}`;
  };

  const { data: firstPageData, isLoading } = useSWR(getUrl(), fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 1000 * 60 * 5,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  });

  const total = useMemo(() => {
    return (
      firstPageData?.meta?.pagination?.total ||
      (category ? filterArticles.length : props.total) ||
      0
    );
  }, [firstPageData, filterArticles, category]);

  useEffect(() => {
    if (!firstPageData || isLoading) {
      return;
    }

    if (Array.isArray(firstPageData.data) && firstPageData.data.length > 0) {
      setDataSource(firstPageData.data);

      const totalPages = Math.ceil(total / STRAPI_MAX_PAGE_SIZE);
      setHasNextBatch(totalPages > 1);
    }
  }, [firstPageData, isLoading, total]);

  // 在编译阶段，会全部获取已发布的文章，然后分页展示，所以切换到下一页的时候不再需要请求 api
  // TODO: 目前文章总数不到 200，后续文章数量多了，需要考虑是否需要分页请求
  useEffect(() => {
    const loadNextBatch = async () => {
      if (!hasNextBatch || isLoadingMore) {
        return;
      }

      const displayedItems = currentPage * displaySize;
      const loadedItems = dataSource.length;

      if (displayedItems >= loadedItems - displaySize) {
        setIsLoadingMore(true);

        try {
          const nextBatchPage = currentBatch + 1;

          // 接口固定每次请求 100 条数据，所以不需要添加 pageSize 参数
          const result = await fetcher(getUrl(nextBatchPage));

          if (result.data) {
            setDataSource((prev) => [...prev, ...result.data]);
            setCurrentBatch(nextBatchPage);

            const total = result.meta?.pagination?.total || 0;
            const totalPages = Math.ceil(total / STRAPI_MAX_PAGE_SIZE);
            setHasNextBatch(nextBatchPage < totalPages);
          }
        } catch (error) {
          console.error("Error fetching next batch:", error);
        } finally {
          setIsLoadingMore(false);
        }
      }
    };

    loadNextBatch();
  }, [
    currentPage,
    dataSource.length,
    displaySize,
    hasNextBatch,
    isLoadingMore,
    category,
    currentBatch,
  ]);

  const currentPageData = useMemo(() => {
    const start = (currentPage - 1) * displaySize;
    const end = start + displaySize;
    return dataSource.slice(start, end);
  }, [dataSource, currentPage, displaySize]);

  const pagination: TPagination = useMemo(() => {
    const pageCount = Math.ceil(total / displaySize);

    return {
      page: currentPage,
      pageSize: displaySize,
      pageCount,
      total,
    };
  }, [currentPage, displaySize, total]);

  return {
    data: currentPageData,
    pagination,
    isLoading: isLoading || isLoadingMore,
    setPage: setCurrentPage,
    allArticles: dataSource,
  };
}
