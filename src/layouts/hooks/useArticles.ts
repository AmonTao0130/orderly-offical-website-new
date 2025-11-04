import useSWR from "swr";
import { useState, useMemo, useEffect } from "react";
import type { Article, PublicationState, TPagination } from "@/strapi/type";
import { fetcher } from "@/utils";

interface UseArticlesProps {
  displaySize?: number;
  category?: string;
  publicationState: PublicationState;
  articles: Article[];
  pagination: TPagination;
}

export function useArticles(props: UseArticlesProps) {
  const { displaySize = 6, category = "", publicationState } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasNextBatch, setHasNextBatch] = useState(false);
  const [currentBatch, setCurrentBatch] = useState(1);

  const resetState = () => {
    setCurrentPage(1);
    setAllArticles([]);
    setIsLoadingMore(false);
    setHasNextBatch(false);
    setCurrentBatch(1);
  };

  useEffect(() => {
    resetState();
  }, [category]);

  const {
    data: initialData,
    error,
    isLoading,
  } = useSWR(
    `/api/articles?page=1&pageSize=100&category=${category}&publicationState=${publicationState}`,
    async (url: string) => {
      return fetcher(url);
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 60 * 5,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    }
  );

  useEffect(() => {
    if (!initialData || isLoading) {
      return;
    }
    const total =
      initialData.meta?.pagination?.total || props.pagination.total || 0;
    const totalPages = Math.ceil(total / 100);
    setAllArticles(initialData.data || props.articles || []);
    setHasNextBatch(totalPages > 1);
  }, [initialData, isLoading, props.articles, props.pagination]);

  useEffect(() => {
    const loadNextBatch = async () => {
      if (!hasNextBatch || isLoadingMore) {
        return;
      }

      const displayedItems = currentPage * displaySize;
      const loadedItems = allArticles.length;

      if (displayedItems >= loadedItems - displaySize) {
        setIsLoadingMore(true);

        try {
          const nextBatchPage = currentBatch + 1;

          const result = await fetcher(
            `/api/articles?page=${nextBatchPage}&pageSize=100&category=${category}&publicationState=${publicationState}`
          );

          if (result.data) {
            setAllArticles((prev) => [...prev, ...result.data]);
            setCurrentBatch(nextBatchPage);

            const total = result.meta.pagination.total;
            const totalPages = Math.ceil(total / 100);
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
    allArticles.length,
    displaySize,
    hasNextBatch,
    isLoadingMore,
    category,
    publicationState,
    currentBatch,
  ]);

  const currentPageData = useMemo(() => {
    const start = (currentPage - 1) * displaySize;
    const end = start + displaySize;
    return allArticles.slice(start, end);
  }, [allArticles, currentPage, displaySize]);

  const pagination: TPagination = useMemo(() => {
    const total =
      initialData?.meta?.pagination?.total || props.pagination.total || 0;
    const pageCount = Math.ceil(total / displaySize);

    return {
      page: currentPage,
      pageSize: displaySize,
      pageCount,
      total,
    };
  }, [
    initialData?.meta?.pagination?.total,
    currentPage,
    displaySize,
    props.pagination.total,
  ]);

  return {
    data: currentPageData,
    pagination,
    isLoading: isLoading || isLoadingMore,
    error,
    setPage: (page: number) => {
      setCurrentPage(page);
    },
    allArticles,
  };
}
