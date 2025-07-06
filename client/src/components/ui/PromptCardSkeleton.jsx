import React from "react";

const PromptCardSkeleton = () => {
  return (
    <div className="group bg-white dark:bg-black/90 border border-gray-200 dark:border-neutral-800 rounded-xl shadow-md flex flex-col w-full h-full max-h-[620px] animate-pulse">
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-200 dark:bg-gray-700">
        <div className="absolute inset-0 bg-gray-300 dark:bg-gray-600 blur-sm scale-105" />
        <div className="absolute bottom-3 left-3 h-5 w-20 bg-black/20 rounded-full" />
      </div>

      <div className="flex-1 p-5 flex flex-col gap-4">
        <div className="space-y-2">
          <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        </div>

        <div className="bg-gray-100 dark:bg-neutral-900 p-4 rounded-lg border border-gray-200 dark:border-neutral-700 space-y-2">
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full" />
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-11/12" />
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-neutral-700 px-5 py-3 flex justify-between items-center">
        <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded" />
        <div className="h-4 w-10 bg-gray-300 dark:bg-gray-600 rounded-full" />
      </div>
    </div>
  );
};

export default PromptCardSkeleton;
