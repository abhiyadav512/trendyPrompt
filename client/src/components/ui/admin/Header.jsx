import { Plus } from 'lucide-react';

const Header = ({ openModal }) => {
    return (
        <header className="bg-gradient-to-r from-gray-100/60 to-white/60 dark:from-gray-900/50 dark:to-black/50 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 px-6 py-4 transition-colors">
            <div className="flex items-center justify-between">
                {/* Title */}
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        Prompt Management
                    </h2>
                </div>

                {/* Add Prompt Button */}
                <button
                    onClick={() => openModal('create')}
                    className="flex items-center gap-2 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 text-white dark:text-black px-4 py-2 rounded-lg font-semibold hover:from-gray-700 hover:to-gray-500 dark:hover:from-gray-100 dark:hover:to-gray-200 transition-all duration-300 hover:scale-105"
                >
                    <Plus className="w-5 h-5" />
                    Add Prompt
                </button>
            </div>
        </header>
    );
};

export default Header;
