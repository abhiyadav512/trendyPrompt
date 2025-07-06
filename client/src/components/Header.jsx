import React, { useEffect, useState } from "react";
import { BookOpen, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Header = ({ onToggleGuide }) => {
  const [theme, setTheme] = useState("light");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("theme") || "light";
    setTheme(stored);
    document.documentElement.classList.toggle("dark", stored === "dark");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
      const decoded = jwtDecode(token);
      // console.log(decoded);
      if (decoded.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else {
      setIsLogin(false);
      setIsAdmin(false);
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-2xl font-extrabold font-sans tracking-tight text-black dark:text-white"
          >
            <span className="text-black dark:text-white">trendy</span>
            <span className="text-gray-500">Prompt</span>
          </Link>

          <div className="flex items-center space-x-4">
            {isLogin ? (
              isAdmin ? (
                <Link
                  to="/admin"
                  className="border border-slate-500 py-1 px-2 rounded-lg"
                >
                  Admin
                </Link>
              ) : null
            ) : (
              <Link
                to="/signin"
                className="border border-slate-500 py-1 px-2 rounded-lg"
              >
                Login
              </Link>
            )}

            <button
              onClick={onToggleGuide}
              aria-label="Toggle guide"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <BookOpen size={20} />
            </button>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme == "light" ? (
                <Moon size={20} />
              ) : (
                <Sun size={20} className="text-yellow-500" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
