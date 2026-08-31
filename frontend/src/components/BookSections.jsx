import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBooks } from "../context/BookContext";
import BookCard from "./BookCard";

function BookSection({ title, description, books = [] }) {
  const scrollRef = useRef(null);

  if (!books?.length)
    return (
      <p className="text-gray-400 text-center py-6">
        No books available in this section.
      </p>
    );
  const scroll = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -500 : 500,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-5 border-b border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="md:text-left">
          <h2 className="text-lg md:text-3xl font-black text-yellow-400">
            {title}
          </h2>

          <p className="text-gray-400 mt-2">{description}</p>
        </div>

        <div className="flex items-center gap-8 mt-4 md:mt-0">
          <button
            onClick={() => scroll("left")}
            className="bg-gray-900 hover:bg-yellow-400 hover:text-black p-3 rounded-full transition"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="bg-gray-900 hover:bg-yellow-400 hover:text-black p-3 rounded-full transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="hidden md:flex gap-3 justify-end">
          <Link
            to="/books"
            className="text-yellow-400 hover:text-yellow-300 font-bold"
          >
            View All →
          </Link>
        </div>
      </div>

      {/* Horizontal Scroll */}
      <div
        ref={scrollRef}
        className="min-w-full flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
      >
        {books.map((book) => (
          <div key={book._id} className=" max-w-xs flex-shrink-0">
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function BookSections() {
  const {
    featuredBooks,
    justArrivedBooks,
    bestSellerBooks,
    trendingBooks,
    comingSoonBooks,
    recommendedBooks,
    dealsBooks,
  } = useBooks();

  return (
    <section className="bg-transparent text-white p-2">
      <div className="py-10 border-t border-white/10">
        <BookSection
          title="🆕Just Arrived"
          description="Fresh additions to our bookstore."
          books={justArrivedBooks}
        />
        <BookSection
          title="📈Best Sellers"
          description="shop Our best-selling books."
          books={bestSellerBooks}
        />
        <BookSection
          title="🔥Hot Deals"
          description="Check out what's hot right now."
          books={dealsBooks}
        />
        <BookSection
          title="💎Recommended"
          description="Explore our premium book collections."
          books={recommendedBooks}
        />
        <BookSection
          title="🔥Trending Now"
          description="Discover what's trending in the literary world."
          books={featuredBooks}
        />
        <BookSection
          title="⏳Coming Soon"
          description="Get a sneak peek at upcoming releases."
          books={comingSoonBooks}
        />
      </div>
    </section>
  );
}
