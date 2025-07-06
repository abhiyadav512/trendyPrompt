import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
      <h1 className="text-4xl md:text-5xl font-bold mb-2">
        404 - Page Not Found
      </h1>
      <p className="text-gray-400 text-lg mb-6 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition-all"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
