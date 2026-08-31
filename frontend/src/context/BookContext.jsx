import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { getBooks } from "../services/bookService";

const BookContext = createContext();

export function BookProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);

      const response = await getBooks();

      setBooks(response?.books || []);
    } catch (error) {
      console.error("Failed to load books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  /* Homepage Collections */

  const featuredBooks = useMemo(
    () => books.filter((book) => book.featured),
    [books],
  );

  const featuredTitleBooks = useMemo(
    () => books.filter((book) => book.featuredTitle),
    [books],
  );

  const justArrivedBooks = useMemo(
    () => books.filter((book) => book.justArrived),
    [books],
  );

  const bestSellerBooks = useMemo(
    () => books.filter((book) => book.bestSeller),
    [books],
  );

  const recommendedBooks = useMemo(
    () => books.filter((book) => book.recommended),
    [books],
  );

  const dealsBooks = useMemo(() => books.filter((book) => book.deals), [books]);

  const comingSoonBooks = useMemo(
    () => books.filter((book) => book.comingSoon),
    [books],
  );

  return (
    <BookContext.Provider
      value={{
        loading,
        books,
        refreshBooks: loadBooks,

        featuredBooks,
        featuredTitleBooks,
        justArrivedBooks,
        bestSellerBooks,
        recommendedBooks,
        dealsBooks,
        comingSoonBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export const useBooks = () => useContext(BookContext);
