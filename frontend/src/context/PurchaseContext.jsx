import { createContext, useContext, useEffect, useState } from "react";

import { getBookId } from "../utils/bookIds";

const PurchaseContext = createContext();

export function PurchaseProvider({ children }) {
  const [purchases, setPurchases] = useState(() => {
    const saved = localStorage.getItem("uketbooks-purchases");

    return saved ? JSON.parse(saved) : [];
  });

  /* SAVE PURCHASES */
  useEffect(() => {
    localStorage.setItem("uketbooks-purchases", JSON.stringify(purchases));
  }, [purchases]);

  /* ADD PURCHASE */
  const addPurchase = (books) => {
    setPurchases((prev) => {
      const existingIds = prev.map((item) => getBookId(item));

      const newBooks = books.filter(
        (book) => !existingIds.includes(getBookId(book)),
      );

      return [...prev, ...newBooks];
    });
  };

  /* CHECK OWNERSHIP */
  const hasPurchased = (bookId) => {
    return purchases.some((book) => String(getBookId(book)) === String(bookId));
  };

  return (
    <PurchaseContext.Provider
      value={{
        purchases,
        addPurchase,
        hasPurchased,
      }}
    >
      {children}
    </PurchaseContext.Provider>
  );
}

export const usePurchases = () => useContext(PurchaseContext);
