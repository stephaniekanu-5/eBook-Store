import { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useBooks } from "../context/BookContext";
import { getBookId } from "../utils/bookIds";

export default function FeaturedTabs() {
  const { books } = useBooks();
  const [activeTab, setActiveTab] = useState("featured");
  const scrollRef = useRef(null);
  const tabs = [
    { id: "featured", label: "Featured" },
    { id: "justArrived", label: "Just Arrived" },
    { id: "bestSeller", label: "Best Sellers" },
    { id: "recommended", label: "Recommended" },
    { id: "deals", label: "Deals" },
    { id: "comingSoon", label: "Coming Soon!" },
  ];

  const tabBooks = useMemo(
    () => ({
      featured: books.filter((book) => book.featured),
      trending: books.filter((book) => book.trending),
      justArrived: books.filter((book) => book.justArrived),
      bestSeller: books.filter((book) => book.bestSeller),
      recommended: books.filter((book) => book.recommended),
      deals: books.filter((book) => book.deals),
      comingSoon: books.filter((book) => book.comingSoon),
    }),
    [books],
  );

  const booksToDisplay = tabBooks[activeTab] || [];

  useEffect(() => {
    scrollRef.current?.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  }, [activeTab]);

  useEffect(() => {
    if (!booksToDisplay.length) return;

    const container = scrollRef.current;

    if (!container) return;

    const interval = setInterval(() => {
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 10
      ) {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left: 250,
          behavior: "smooth",
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [activeTab, booksToDisplay.length]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -400 : 400,
        behavior: "smooth",
      });
    }
  };
  const discount =
    Number(books.originalPrice) > Number(books.price)
      ? Math.round(
          ((Number(books.originalPrice) - Number(books.price)) /
            Number(books.originalPrice)) *
            100,
        )
      : 0;
  return (
    <section className="bg-transparent text-white py-2 px-1">
      <div className="max-w-70xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-4">
          <motion.h2
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            viewport={{ once: true }}
            className="text-3xl md:text-3xl font-black text-yellow-400"
          >
            Discover Amazing Books
          </motion.h2>

          <p className="text-gray-400 mt-3 text-lg">
            Explore trending books and our latest additions.
          </p>
        </div>

        {/* TABS */}
        <div className="flex md:hidde gap-3 overflow-x-auto scrollbar-hide pb-2 ">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-2xl font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTROLS */}
        <div className="hidden md:flex gap-3 justify-end mb-4">
          <button
            onClick={() => scroll("left")}
            className="bg-gray-900 hover:bg-yellow-400 hover:text-black transition p-3 rounded-full"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="bg-gray-900 hover:bg-yellow-400 hover:text-black transition p-3 rounded-full"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* CAROUSEL */}
        <div
          ref={scrollRef}
          className="flex flex-nowrap gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        >
          {booksToDisplay.length === 0 ? (
            <div className="w-full py-20 text-center text-gray-500">
              No books available in this category yet.
            </div>
          ) : (
            booksToDisplay.map((book, index) => (
              <motion.div
                key={book._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="min-w-[220px] bg-gray-900 rounded-3xl overflow-hidden border border-white/10 hover:border-yellow-400/50 transition-all group"
              >
                {/* COVER */}
                <div className="overflow-hidden relative">
                  <img
                    loading="lazy"
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-[300px] object-cover group-hover:scale-105 transition duration-500"
                  />

                  <div className="absolute top-3 right-3 bg-yellow-400 text-black p-2 rounded-full">
                    {discount > 0 && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        -{discount}%
                      </div>
                    )}
                    <Star size={16} />
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  <h3 className="font-bold text-sm line-clamp-">
                    {book.title}
                  </h3>

                  <p className="text-gray-400 text-sm mt-1">{book.author}</p>
                  <p className="text-xs text-yellow-400 mt-1">
                    {book.category}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400 font-black text-lg">
                        {Number(book.price) === 0
                          ? "Free"
                          : `$${Number(book.price).toFixed(2)}`}
                      </span>
                    </div>
                    <Link
                      to={`/books/${getBookId(book)}`}
                      className="bg-yellow-400 hover:bg-yellow-300 text-black text-sm font-bold px-4 py-2 rounded-xl transition"
                    >
                      Read
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
