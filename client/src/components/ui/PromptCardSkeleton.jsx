import React from 'react';

const PromptCardSkeleton = () => {
    return (
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm shadow-md animate-pulse flex flex-col w-full h-full">

            {/* 🖼️ Skeleton Image */}
            <div className="w-full aspect-[4/3] bg-gray-700/30" />

            {/* 🧠 Skeleton Text */}
            <div className="px-3 py-2 flex-1 flex flex-col gap-2">
                <div className="h-4 bg-gray-600/30 rounded w-3/4" />
                <div className="h-3 bg-gray-600/20 rounded w-full" />
                <div className="h-3 bg-gray-600/20 rounded w-5/6" />
            </div>

            {/* 🔘 Skeleton Actions */}
            <div className="px-3 py-2 flex items-center justify-between border-t border-white/10">
                <div className="h-4 w-16 bg-gray-600/20 rounded" />
                <div className="h-4 w-16 bg-gray-600/20 rounded" />
            </div>
        </div>
    );
};

export default PromptCardSkeleton;
