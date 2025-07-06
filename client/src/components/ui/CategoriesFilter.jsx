import { Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CategoriesFilter = ({ selectedCategory }) => {
  const navigate = useNavigate();

  const categories = [
    { id: "all", name: "All Prompts" },
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

  const handleCategoryClick = (categoryId) => {
    if (categoryId === "All Prompts") {
      navigate("/?page=1");
    } else {
      navigate(`/category/${categoryId}`);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter size={20} className="text-black dark:text-white" />
        <h2 className="text-lg font-semibold text-black dark:text-white">
          Categories
        </h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border
                                ${
                                  isSelected
                                    ? "bg-black text-white border-black"
                                    : "bg-white text-black hover:bg-black hover:text-white border-gray-300"
                                }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesFilter;
