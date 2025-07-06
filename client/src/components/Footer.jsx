import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

// Smooth scroll on link click
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

const categories = [
    { id: "movie-fantasy", name: "Movie & Fantasy" },
    { id: "adventure-travel", name: "Adventure & Travel" },
    { id: "art", name: "Art" },
    { id: "sci-fi", name: "Sci-Fi" },
    { id: "horror", name: "Horror" },
    { id: "romance", name: "Romance" },
    { id: "fashion", name: "Fashion" },
    { id: "studio", name: "Studio" },
    { id: "culture", name: "Culture" },
];

const Footer = () => {
    return (
        <footer className="bg-black dark:bg-white text-white dark:text-black px-6 py-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                {/* Brand */}
                <div>
                    <Link to="/" onClick={scrollToTop} className="text-2xl font-bold text-white dark:text-black">
                        trendy<span className="text-gray-400 dark:text-gray-600">Prompt</span>
                    </Link>
                    <p className="text-sm text-gray-400 dark:text-gray-600 mt-2">
                        Explore and share creative AI prompts instantly.
                    </p>
                </div>

                {/* Categories */}
                <div>
                    <h4 className="font-semibold mb-3 text-white dark:text-black">Categories</h4>
                    <ul className="grid grid-cols-2 gap-1 text-sm text-gray-400 dark:text-gray-600">
                        {categories.map((cat) => (
                            <li key={cat.id}>
                                <Link
                                    to={`/category/${cat.name}`}
                                    onClick={scrollToTop}
                                    className="hover:text-white dark:hover:text-black transition-colors"
                                >
                                    {cat.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="font-semibold mb-3 text-white dark:text-black">Need Help?</h4>
                    <p className="text-sm text-gray-400 dark:text-gray-600 mb-1">
                        Email:{" "}
                        <a
                            href="mailto:abhishekcyadav9594@gmail.com"
                            className="underline hover:text-white dark:hover:text-black"
                        >
                            abhishekcyadav9594@gmail.com
                        </a>
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-600">
                        DM us on GitHub & linkedin.
                    </p>
                </div>

                {/* Socials */}
                <div>
                    <h4 className="font-semibold mb-3 text-white dark:text-black">Follow Us</h4>
                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/abhiyadav512"
                            target="_blank"
                            rel="noreferrer"
                            className="text-white dark:text-black hover:text-gray-400 dark:hover:text-gray-600"
                        >
                            <Github />
                        </a>
                        <a
                            href="mailto:abhishekcyadav9594@gmail.com"
                            className="text-white dark:text-black hover:text-gray-400 dark:hover:text-gray-600"
                        >
                            <Mail />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/abhishek-yadav-407331311"
                            target="_blank"
                            rel="noreferrer"
                            className="text-white dark:text-black hover:text-gray-400 dark:hover:text-gray-600"
                        >
                            <Linkedin />
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-10 border-t border-gray-700 dark:border-gray-300 pt-4 text-center text-xs text-gray-500 dark:text-gray-600">
                © {new Date().getFullYear()} TrendyPrompt. All rights reserved.
                <span className="ml-2">| Version 1.0</span>
            </div>
        </footer>
    );
};

export default Footer;
