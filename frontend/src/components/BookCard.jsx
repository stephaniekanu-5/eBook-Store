import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { getBookId } from "../utils/bookIds";

export default function BookCard({ book }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const bookId = getBookId(book);
  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  const originalPrice = Number(book.price) * 1.4;
  const discount = Math.round(
    ((originalPrice - Number(book.price)) / originalPrice) * 100,
  );
  const savings = originalPrice - Number(book.price);
  const handleView = () => {
    navigate(`/books/${bookId}`);
  };
  const handleAddToCart = () => {
    addToCart(book);
  };
  return (
    <div className="max-w-[220px] bg-gray-900 rounded-3xl overflow-hidden border border-white/10 hover:border-yellow-400/50 transition-all duration-300 group">
      {/* Cover */}
      <div className="overflow-hidden relative" onClick={handleView}>
        <img
          src={book.cover}
          alt={book.title}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x450?text=No+Cover";
          }}
          className="
            w-full h-70 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
        />
        {book.category && (
          <span className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full">
            {book.category}
          </span>
        )}
        {book.deals && (
          <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
            🔥 Limited Offer
          </span>
        )}
      </div>
      {/* Content */}
      <div className="p-1">
        <h3 className="font-bold text-white text-sm line-clamp-">
          {book.title}
        </h3>
        <p className="text-gray-400 text-sm mt-1">{book.author}</p>
        <div className="mt-2 flex items-center justify-start">
          <div>
            <div className="flex items-center gap-10 justify-between">
              <span className="text-gray-500 line-through text-sm">
                {formatPrice(originalPrice)}
              </span>
              <span className="bg-red-500 text-white text-[10px] px-2 py-1 rounded-full font-bold">
                -{discount}%
              </span>
            </div>

            <p className="text-yellow-400 font-black text-lg">
              {formatPrice(book.price)}
            </p>
            <p className="text-green-400 text-xs mt-1">
              You save {formatPrice(savings)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {book.sales > 50 && (
              <span className="text-xs text-green-400">Best Seller</span>
            )}
            {book.sales > 20 && book.sales <= 50 && (
              <span className="text-xs text-yellow-400">Popular Choice</span>
            )}
          </div>
        </div>
        <div className="flex gap-1 mt-2 justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            className="flex-1 bg-yellow-400 hover:bg-yellow-300 font-semibold py-1 px-1 rounded-xl transition"
          >
            +🛒
          </button>
          <button
            onClick={() => {
              navigate(`/preview/${bookId}`);
            }}
            className="flex-1 px-1 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black rounded-xl transition"
          >
            Read
          </button>
        </div>
      </div>
    </div>
  );
}
