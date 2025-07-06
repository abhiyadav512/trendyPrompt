import React, { useState, useEffect } from "react";
import {
    Plus, Edit, Trash2, Search, Filter, Eye,
    ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
    Star, BarChart3
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import Header from "../components/ui/admin/Header";
import PromptModal from "../components/ui/admin/PromptModal";
import PromptCardSkeleton from "../components/ui/PromptCardSkeleton";

import {
    useAddPrompt,
    useAllPrompt,
    useDeletePrompt,
    useUpdatePrompt,
} from "../hooks/usePrompt";

export default function AdminPanel() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [currentPrompt, setCurrentPrompt] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "Movie & Fantasy",
        promptText: "",
        imgUrl: "",
    });

    const categories = [
        "Movie & Fantasy", "Adventure & Travel", "Art", "Sci-Fi",
        "Horror", "Romance", "Fashion", "Studio", "Culture"
    ];

    const [searchParams, setSearchParams] = useSearchParams();
    const pageFromUrl = parseInt(searchParams.get("page")) || 1;
    const [page, setPage] = useState(pageFromUrl);
    const limit = 10;

    const { data, isLoading, isError } = useAllPrompt({ page, limit });
    const prompts = data?.data || [];
    const totalPages = data?.totalPages || 1;

    const [filteredPrompts, setFilteredPrompts] = useState([]);

    useEffect(() => {
        setSearchParams({ page: page.toString() });
    }, [page]);

    useEffect(() => {
        let filtered = prompts;
        if (searchTerm) {
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (selectedCategory !== "all") {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }
        setFilteredPrompts(filtered);
    }, [searchTerm, selectedCategory, prompts]);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const { mutate: createPrompt } = useAddPrompt();
    const { mutate: updatePromptMutation } = useUpdatePrompt();
    const { mutate: deletePrompt } = useDeletePrompt();

    const handleSubmit = e => {
        e.preventDefault();
        const { title, description, promptText, imgUrl, category } = formData;
        const payload = { title, description, promptText, imgUrl, category };

        if (modalMode === "create") {
            createPrompt(payload, {
                onSuccess: () => {
                    toast.success("Prompt created!");
                    closeModal();
                },
                onError: err => {
                    toast.error(err?.response?.data?.message || "Failed to create prompt.");
                },
            });
        } else if (modalMode === "edit" && currentPrompt?._id) {
            updatePromptMutation(
                { id: currentPrompt._id, formData: payload },
                {
                    onSuccess: () => {
                        toast.success("Prompt updated!");
                        closeModal();
                    },
                    onError: err => {
                        toast.error(err?.response?.data?.message || "Failed to update prompt.");
                    },
                }
            );
        }
    };

    const handleDelete = id => {
        if (window.confirm("Are you sure you want to delete this prompt?")) {
            deletePrompt(id, {
                onSuccess: () => toast.success("Prompt deleted."),
                onError: err => toast.error(err?.response?.data?.message || "Delete failed."),
            });
        }
    };

    const openModal = (mode, prompt = null) => {
        setModalMode(mode);
        setCurrentPrompt(prompt);
        setFormData(prompt || {
            title: "", description: "", category: categories[0], promptText: "", imgUrl: ""
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCurrentPrompt(null);
    };

    const handlePageChange = newPage => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = Math.max(1, page - 2); i <= Math.min(totalPages, page + 2); i++) {
            pages.push(
                <button key={i} onClick={() => handlePageChange(i)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${page === i ? 'bg-black text-white' : 'bg-white text-black dark:bg-white dark:text-black hover:bg-gray-100'}`}>
                    {i}
                </button>
            );
        }
        return pages;
    };

    const stats = [
        { label: "Total Prompts", value: prompts.length, icon: <Star className="w-6 h-6" /> },
        { label: "Categories", value: categories.length, icon: <BarChart3 className="w-6 h-6" /> },
    ];

    return (
        <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white relative overflow-hidden">
            <Header openModal={openModal} />

            <div className="p-6">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white/10 dark:bg-black/30 border dark:border-white/20 rounded-xl p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                </div>
                                <div className="text-gray-500 dark:text-white/60">{stat.icon}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Search & Filter */}
                <div className="flex flex-col lg:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                            placeholder="Search prompts..."
                            className="w-full pl-10 pr-4 py-3 rounded-lg border dark:border-white/20 bg-white/10 dark:bg-white/5" />
                    </div>
                    <div className="relative min-w-[12rem]">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
                            className="pl-10 pr-4 py-3 w-full rounded-lg border dark:border-white/20 bg-white/10 dark:bg-white/5">
                            <option value="all">All Categories</option>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                </div>

                {/* Prompt Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {isLoading ? (
                        Array.from({ length: 6 }).map((_, i) => <PromptCardSkeleton key={i} />)
                    ) : isError ? (
                        <p className="text-red-500">Failed to load prompts. Try again later.</p>
                    ) : (
                        filteredPrompts.map(prompt => (
                            <div key={prompt._id} className="bg-white/5 dark:bg-white/10 border dark:border-white/20 rounded-xl overflow-hidden transition-all hover:scale-105 duration-300">
                                <div className="relative">
                                    <img src={prompt.imgUrl} alt={prompt.title} className="w-full h-48 object-cover" />
                                    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1 text-xs text-white">
                                        {prompt.category}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-black dark:text-white mb-2 line-clamp-2">
                                        {prompt.title}
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                                        {prompt.description}
                                    </p>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <button
                                            onClick={() => openModal("view", prompt)}
                                            className="flex items-center gap-1 px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View
                                        </button>

                                        <button
                                            onClick={() => openModal("edit", prompt)}
                                            className="flex items-center gap-1 px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(prompt._id)}
                                            className="flex items-center gap-1 px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-between items-center mt-10">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Page {page} of {totalPages}</span>
                        <div className="flex gap-2">
                            <button onClick={() => handlePageChange(1)} disabled={page === 1}><ChevronsLeft /></button>
                            <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}><ChevronLeft /></button>
                            {renderPageNumbers()}
                            <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}><ChevronRight /></button>
                            <button onClick={() => handlePageChange(totalPages)} disabled={page === totalPages}><ChevronsRight /></button>
                        </div>
                    </div>
                )}
            </div>

            <PromptModal
                showModal={showModal}
                closeModal={closeModal}
                modalMode={modalMode}
                formData={formData}
                setFormData={setFormData}
                currentPrompt={currentPrompt}
                categories={categories}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}
