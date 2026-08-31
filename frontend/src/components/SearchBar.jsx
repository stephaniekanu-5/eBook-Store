import { FiSearch } from "react-icons/fi";
import { useState, useMemo, useEffect } from "react";
import Fuse from "fuse.js";
import { getBookId } from "../utils/bookIds";

export default function SearchBar({ search, setSearch, books = [] }) {
  const [focus, setFocus] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // 🔥 Fuse.js fuzzy search engine
  const fuse = useMemo(() => {
    return new Fuse(books, {
      keys: ["title", "author", "category"],
      threshold: 0.3, // lower = stricter, higher = looser
    });
  }, [books]);

  const results = search
    ? fuse
        .search(search)
        .slice(0, 6)
        .map((r) => r.item)
    : [];

  // 🔥 Keyboard navigation
  const handleKeyDown = (e) => {
    if (!results.length) return;

    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    }

    if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    }

    if (e.key === "Enter") {
      const selected = results[activeIndex];
      if (selected) {
        setSearch(selected.title);
        setFocus(false);
      }
    }
  };

  return (
    <div className="relative px-4 md:px-12 py-3">
      {/* Input */}
      <div className="max-w-3xl mx-auto relative">
        <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
        <input
          type="text"
          id="term-mobile"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setTimeout(() => setFocus(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder="Search books by title, authors, categories..."
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-gray-800 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
        />
      </div>

      {/* Dropdown */}
      {focus && results.length > 0 && (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl mt-2 border overflow-hidden">
          {results.map((book, index) => (
            <div
              key={getBookId(book)}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => setSearch(book.title)}
              className={`flex items-center gap-3 p-3 cursor-pointer transition
                ${activeIndex === index ? "bg-gray-100" : ""}`}
            >
              <img
                src={book.cover}
                className="w-10 h-12 object-cover rounded"
              />

              <div>
                <p className="font-semibold text-sm">
                  {highlight(book.title, search)}
                </p>
                <p className="text-xs text-gray-500">{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 🔥 Highlight matching text
function highlight(text, query) {
  if (!query) return text;

  const parts = text.split(new RegExp(`(${query})`, "gi"));

  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={i} className="bg-yellow-300 text-black px-1 rounded">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
