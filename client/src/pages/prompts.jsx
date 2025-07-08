import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CategoriesFilter from "../components/ui/CategoriesFilter";
import PromptCard from "../components/ui/PromptCard";
import { useAllPrompt } from "../hooks/usePrompt";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import PromptCardSkeleton from "../components/ui/PromptCardSkeleton";
import toast from "react-hot-toast";

const Prompts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageFromUrl);
  const limit = 10;

  const { data, isLoading, isError } = useAllPrompt({ page, limit });
  const prompts = data?.data || [];
  const totalPages = data?.totalPages || 1;

  useEffect(() => {
    setSearchParams({ page: page.toString() });
  }, [page, setSearchParams]);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch prompts. Please try again.");
    }
  }, [isError]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 flex items-center justify-center rounded-full ${page === i ? "bg-black text-white dark:bg-white dark:text-black" : "hover:bg-black hover:text-white dark:hover:text-gray-950 dark:hover:bg-gray-100"}`}
        >
          {i}
        </button>,
      );
    }

    return pages;
  };

  return (
    <div className="min-h-screen transition-colors duration-300 ">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoriesFilter selectedCategory="All Prompts" />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <PromptCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {prompts.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                No prompts found.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {prompts.map((prompt) => (
                    <PromptCard key={prompt._id} prompt={prompt} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12">
                    {/* Page info */}
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Showing page {page} of {totalPages}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex items-center gap-1">
                      {/* First Page */}
                      <button
                        onClick={() => handlePageChange(1)}
                        disabled={page === 1}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="First page"
                      >
                        <ChevronsLeft className="w-5 h-5" />
                      </button>

                      {/* Previous Page */}
                      <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      {/* Page Numbers */}
                      {renderPageNumbers()}

                      {/* Next Page */}
                      <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page >= totalPages}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Next page"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Last Page */}
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        disabled={page >= totalPages}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label="Last page"
                      >
                        <ChevronsRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Prompts;
