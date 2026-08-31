import {
  FaBook,
  FaBriefcase,
  FaLaptopCode,
  FaFlask,
  FaBrain,
  FaLandmark,
  FaHeart,
  FaThermometerQuarter,
  FaNutritionix,
  FaIcons,
} from "react-icons/fa";

import { useBooks } from "../context/BookContext";

export default function CategoryFilter({ category, setCategory }) {
  const { books } = useBooks();

  const iconMap = {
    Business: <FaBriefcase />,
    Technology: <FaLaptopCode />,
    Science: <FaFlask />,
    Medicine: <FaFlask />,
    "Diet & Nutrition": <FaNutritionix />,
    "Health & Fitness": <FaThermometerQuarter />,
    "Self Development": <FaBrain />,
    History: <FaLandmark />,
    Religion: <FaBook />,
    Romance: <FaHeart />,
  };

  // Generate categories dynamically from uploaded books
  const categories = [
    {
      name: "All",
      icon: <FaBook />,
    },
    ...[...new Set(books.map((book) => book.category).filter(Boolean))].map(
      (name) => ({
        name,
        icon: iconMap[name] || <FaIcons />,
      }),
    ),
  ];

  return (
    <section className="mb-5">
      <div className="bg-gray-900 rounded-3xl p-2 md:p-4">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-4xl md:text-5xl font-black text-yellow-400">
            Discover Amazing Books
          </h1>

          <p className="text-gray-400 mt-2">Browse books by category.</p>
        </div>

        {/* Mobile Categories */}
        <div className="flex md:hidden gap-3 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setCategory(cat.name)}
              className={`flex items-center gap-2 whitespace-nowrap px-5 py-3 rounded-2xl transition-all duration-300 font-medium

                ${
                  category === cat.name
                    ? "bg-yellow-400 text-black"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }
              `}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Desktop Categories */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setCategory(cat.name)}
              className={`group p-5 rounded-2xl transition-all duration-300 flex items-center gap-4 text-left

                ${
                  category === cat.name
                    ? "bg-yellow-400 text-black scale-105 shadow-xl"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }
              `}
            >
              <div
                className={`text-2xl

                  ${category === cat.name ? "text-black" : "text-yellow-400"}
                `}
              >
                {cat.icon}
              </div>

              <div>
                <h3 className="font-semibold">{cat.name}</h3>

                <p className="text-xs opacity-70 mt-1">Explore books</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
