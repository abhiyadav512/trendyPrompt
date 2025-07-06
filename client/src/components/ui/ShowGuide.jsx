import React from 'react';

const ShowGuide = ({ onClose }) => {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto p-4 sm:p-6"
            aria-modal="true"
            role="dialog"
            aria-labelledby="usage-guide-title"
        >
            <div className="relative w-full max-w-3xl mx-auto bg-white dark:bg-black rounded-lg shadow-xl flex flex-col max-h-[90vh] sm:max-h-[80vh]">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-6 py-4">
                    <h2
                        id="usage-guide-title"
                        className="text-2xl font-bold text-black dark:text-white"
                    >
                        Usage Guide
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
                        aria-label="Close guide"
                    >
                        ×
                    </button>
                </div>

                {/* Scrollable Content Without Scrollbar */}
                <div
                    className="px-6 py-4 space-y-6 text-gray-700 dark:text-gray-300 max-h-[calc(90vh-64px)] sm:max-h-[calc(80vh-64px)] overflow-y-auto"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    <style>
                        {`::-webkit-scrollbar { display: none; }`}
                    </style>

                    {/* Guide Sections */}
                    <section>
                        <h3 className="text-lg font-semibold mb-2">How to Use AI Prompts</h3>
                        <p className="mb-4">
                            AI prompts are carefully crafted instructions that help you get better results from AI
                            assistants. Here's how to use them effectively:
                        </p>
                        <ul className="space-y-2 list-disc list-inside">
                            <li><strong>Replace placeholders:</strong> Replace text in [BRACKETS]</li>
                            <li><strong>Be specific:</strong> Detailed input improves output</li>
                            <li><strong>Iterate:</strong> Refine prompts as needed</li>
                            <li><strong>Context matters:</strong> Provide background if helpful</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold mb-2">Example Usage</h3>
                        <div className="p-4 rounded-lg bg-gray-100 dark:bg-neutral-900">
                            <p className="font-medium mb-2">Original prompt:</p>
                            <p className="mb-3">"Help me write a story about [TOPIC]"</p>
                            <p className="font-medium mb-2">Customized prompt:</p>
                            <p>"Help me write a story about a time-traveling detective who solves cold cases"</p>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold mb-2">Tips for Better Results</h3>
                        <ul className="space-y-2 list-disc list-inside">
                            <li>Start with clear, specific instructions</li>
                            <li>Include desired format, length, and tone</li>
                            <li>Provide examples when possible</li>
                            <li>Ask for step-by-step breakdowns for complex tasks</li>
                            <li>Use follow-up questions to refine outputs</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ShowGuide;
