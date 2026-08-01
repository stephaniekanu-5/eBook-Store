import { useState, useContext, useEffect, useMemo } from "react";
import { useBooks }from "../context/BookContext";
import SearchBar from "../components/SearchBar";
import { CartContext } from "../context/CartContext";
import { getBookId, isSameBook, } from "../utils/bookIds";
import Hero from "../components/Hero";
import CategoryFilter from "../components/CategoryFilter";
import FeatureCarousel from "../components/FeatureCarousel";
import Testimonials from "../components/Testimonials";
import FeaturedTitles from "../components/FeaturedTitles";
import FeaturedTabs from "../components/FeaturedTabs"; 
import BookSections from "../components/BookSections";
import BookCard from "../components/BookCard";

export default function Home() {
  const { addToCart } = useContext(CartContext);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);
  const [wishlist, setWishlist] = useState([]);
  const { books } = useBooks();
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

  // 📦 Infinite scroll load more
  const visibleBooks = filteredBooks.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  //  ❤️ Wishlist toggle
  const toggleWishlist = (book) => {
    const bookId =
      getBookId(book);

    setWishlist((prev) =>
      prev.find((b) =>
        isSameBook(b, bookId)
      )
        ? prev.filter(
            (b) =>
              !isSameBook(b, bookId)
          )
        : [...prev, book]
    );
  };

  // 🔄 Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(8);
  }, [search, category]);

  return (
    <div className="min-h-screen bg-purple-900 text-black dark:bg-black dark:text-white relative overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-purple-900/20 to-black pointer-events-none" />
      {/* Content */}
      <div className="relative z-10">
        {/* HERO */}
        <section >
          <Hero />
        </section>
        {/* FEATURED SECTION */}
       <section className="max-w-70xl mx-auto mb-5">
          {/* Apple-style container */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 mb-5">
            <FeatureCarousel /> 
          </div>
          {/* TRUST STRIP (NEW SaaS FEEL) */}
          <section className="text-center text-gray-500 text-sm mb-2 px-6">
            Join over 50,000 readers who have found their next great read with UketBooks.
          </section>
          <section className="border-white/10 rounded-3xl">
            <FeaturedTitles /> 
          </section>
          <section className="border-white/10 rounded-3xl">
            <BookSections />
          </section >
          {/* <section className="border-white/10 rounded-3xl">
          <FeaturedBooks />
          </section> */}
        </section>
        {/* FINAL CTA SECTION (SAAS STYLE) */}
        <section className="max-w-70xl mx-auto mb-1">
          <div className="text-center bg-gradient-to-r from-purple-900/20 via-white/5 to-purple-900/20
            border border-white/10 rounded-3xl p-12 md:p-16 backdrop-blur-xl">
            <h2 className="text-3xl md:text-5xl font-black mb-2">
              Start reading smarter today
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-2">
              Join thousands of readers accessing premium ebooks instantly with a seamless experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/myLibrary"
                className="bg-purple-600 hover:bg-purple-500 px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-[1.02]"
              >
                Explore Library
              </a>
              <a
                href="/register"
                className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition"
              >
                Create Account
              </a>
            </div>
          </div>
        </section>
        {/* TESTIMONIALS */}
        <section className="max-w-70xl mx-auto px-6">
          <Testimonials />
        </section>

      </div>
    </div>
  );
}