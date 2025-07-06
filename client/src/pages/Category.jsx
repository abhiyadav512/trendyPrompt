import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useCategoryPrompt } from "../hooks/usePrompt";
import PromptCard from "../components/ui/PromptCard";
import CategoriesFilter from "../components/ui/CategoriesFilter";
import PromptCardSkeleton from "../components/ui/PromptCardSkeleton";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";

const Category = () => {
    const { category } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const pageFromUrl = parseInt(searchParams.get("page")) || 1;
    const [page, setPage] = useState(pageFromUrl);
    const limit = 9;

    const { data, isLoading, isError } = useCategoryPrompt({
        category,
        page,
        limit,
    });

    const prompts = data?.data || [];
    const totalPages = data?.totalPages || 1;

    useEffect(() => {
        setSearchParams({ page: page.toString() });
    }, [page, setSearchParams]);

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
                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-all 
                        ${page === i
                            ? "bg-black text-white"
                            : "bg-white text-black hover:bg-gray-100 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                        }`}                    
                >
                    {i}
                </button>
            );
        }

        return pages;
    };

    return (
        <div className="min-h-screen transition-colors duration-300">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <CategoriesFilter selectedCategory={category} />
                <h1 className="text-2xl font-bold mb-6 capitalize text-black dark:text-white">
                    Category: {category.replace(/-/g, " ")}
                </h1>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <PromptCardSkeleton key={i} />
                        ))}
                    </div>
                ) : isError ? (
                    <p className="text-red-500 text-center">Error loading prompts, try again.</p>
                ) : (
                    <>
                        {prompts.length === 0 ? (
                            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                                No prompts found in this category.
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {prompts.map((prompt) => (
                                        <PromptCard key={prompt._id} prompt={prompt} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages >1  && (
                                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            Page {page} of {totalPages}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handlePageChange(1)}
                                                disabled={page === 1}
                                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
                                            >
                                                <ChevronsLeft className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handlePageChange(page - 1)}
                                                disabled={page === 1}
                                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            {renderPageNumbers()}
                                            <button
                                                onClick={() => handlePageChange(page + 1)}
                                                disabled={page >= totalPages}
                                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handlePageChange(totalPages)}
                                                disabled={page >= totalPages}
                                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
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

export default Category;
