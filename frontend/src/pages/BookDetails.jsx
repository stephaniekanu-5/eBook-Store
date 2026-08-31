import { useParams, useNavigate } from "react-router-dom";
import { useBooks } from "../context/BookContext";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { getBookId, isSameBook } from "../utils/bookIds";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { books } = useBooks();
  const book = books.find((b) => isSameBook(b, id));
  const formatPrice = (price) =>
    Number(price).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  const bookId = getBookId(book);

  if (!book) {
    return <div className="p-6">Book not found</div>;
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-gray-100 py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 bg-white shadow p-2 rounded min-h-screen md:items-center md:gap-6 md:max-w-7xl">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full max-w-xs md:max-w-sm lg:max-w-lg h-auto object-cover rounded mx-auto"
        />
        <h2 className="text-2xl font-bold mt-4 text-gray-800 md:text-3xl md:text-center">
          {book.title}
        </h2>
        <p className="text-gray-500 text-lg md:text-3xl md:text-center">
          {" "}
          By: {book.author}
        </p>
        <p className="font-bold mt-3 text-lg text-yellow-600 md:text-3xl md:text-center">
          {" "}
          Price: {formatPrice(book.price)}
        </p>
        <button
          onClick={() => {
            navigate(`/preview/${bookId}`);
          }}
          className="bg-purple-600 text-white w-full py-2 rounded mt-4"
        >
          Read preview
        </button>
        <button
          onClick={() => {
            if (!book._id) {
              return;
            }

            addToCart(book);
            navigate("/cart");
          }}
          disabled={!book._id}
          className={`w-full py-2 rounded mt-4 ${
            book._id
              ? "bg-purple-600 text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          {book._id ? "Download Now" : "Unavailable for checkout"}
        </button>
      </div>
    </main>
  );
}
