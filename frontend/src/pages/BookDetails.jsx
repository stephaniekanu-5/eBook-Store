import { useParams, useNavigate } from "react-router-dom";
import { useBooks, } from "../context/BookContext";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { getBookId, isSameBook,} from "../utils/bookIds";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { books } = useBooks();
  const book = books.find((b) =>
    isSameBook(b, id)
  );
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
    <div className="mx-auto bg-white shadow p-6 rounded min-h-screen md:items-center md:gap-6 md:max-w-7xl">
      <img
        src={book.cover}
        alt={book.title}
        className="w-full h-70 md:h-screen object-cover rounded"
      />
      <h2 className="text-2xl font-bold mt-4 text-gray-800">{book.title}</h2>

      <p className="text-gray-500 text-lg">{book.author}</p>

      {/* <p className="mt-2 text-gray-600">{book.description}</p> */}

      <p className="font-bold mt-3 text-lg text-yellow-600">{formatPrice(book.price)}</p>
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
        {book._id
          ? "Download Now"
          : "Unavailable for checkout"}
      </button>
    </div>
  );
}
