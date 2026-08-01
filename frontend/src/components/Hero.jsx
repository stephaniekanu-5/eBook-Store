import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useContext, useEffect, useMemo } from "react";
import { useBooks }from "../context/BookContext";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";

export default function Hero() {
  const navigate = useNavigate();
  const text = "Discover your next favorite book";
  const [displayText, setDisplayText] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [focus, setFocus] = useState(false);
  const { books } = useBooks();
   
  // =========================
  // TYPING EFFECT
  // =========================
  useEffect(() => { let i = 0;

    const interval = setInterval(() => { setDisplayText( text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
      }
    }, 60);
    return () =>
      clearInterval(interval);
  }, []);

  // =========================
  // SEARCH HANDLER
  // =========================
  // const handleSearch = (e) => {
  //   e.preventDefault();

  //   if (!search.trim()) return;

  //   navigate(
  //     `/books?search=${encodeURIComponent(
  //       search
  //     )}`
  //   );
  // };
  // 🔥 Smart search + filter system
    const filteredBooks = useMemo(() => {
      const q = search.toLowerCase();
      return books.filter((book) => {
        const matchesSearch =
          book.title.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q) ||
          book.category.toLowerCase().includes(q);
  
        const matchesCategory =
          category === "All" || book.category === category;
  
        return matchesSearch && matchesCategory;
      });
    }, [search, category]);
  
  // =========================
  // ENTER KEY
  // =========================
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <section
      className="relative w-full mb-5 flex items-center justify-center overflow-hidden"
    >
      {/* BACKGROUND */}
      <div
        className=" absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1400&q=80')",
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/7" />

      {/* GLOW */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black/40 to-black"
      />

      {/* FLOATING SHAPES */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute top-20 left-10 w-24 h-32 bg-yellow-400 rounded-xl opacity-20 blur-sm"
      />

      <motion.div
        animate={{
          y: [0, 25, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="absolute bottom-20 right-10 w-28 h-36 bg-purple-500 rounded-xl opacity-20 blur-md"
      />

      {/* CONTENT */}
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="relative z-10 text-center px-6 max-w-5xl"
      >
        {/* BRAND */}
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-black text-yellow-400 mb-4"
        >
          UketBooks
        </motion.h1>

        <p className="text-yellow-300 mb-8 text-lg md:text-2xl font-medium"
        >
          Your favorite digital bookstore.
        </p>

        {/* TYPING HEADLINE */}
        <h2 className="text-3xl md:text-6xl font-black text-white leading-tight mb-8 min-h-[100px]"
        >
          {displayText}

          <span className="animate-pulse text-yellow-400"
          >
            |
          </span>
        </h2>
        {/* SEARCH */}
          <SearchBar search={search} setSearch={setSearch} books={books} />
        
        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/books"
            className="bg-purple-700/50 hover:bg-yellow-400 hover:text-black text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-xl"
          >
            Explore Books
          </Link>

          <Link to="/myLibrary"
            className=" border border-white/20 bg-purple-700/50 hover:bg-yellow-400 hover:border-yellow-400 hover:text-black text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-lg"
          >
            Download Books
          </Link>
        </div>

        {/* TRUST TEXT */}
        <p className=" mt-10 text-sm text-gray-400"
        >
          Trusted by readers worldwide •
          Secure payments • Instant
          downloads
        </p>
      </motion.div>
    </section>
  );
}