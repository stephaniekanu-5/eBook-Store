import Modal from "react-modal";
import { useEffect, useState } from "react";
import { FaTimes, FaHeart, FaBookOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function PreviewModal({ isOpen, closeModal, book }) {
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    if (book) setLoading(true);
  }, [book]);

  if (!book) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      ariaHideApp={true}
      className="bg-gray-950 text-white max-w-5xl mx-auto mt-6 rounded-3xl overflow-hidden shadow-2xl outline-none max-h-[92vh] overflow-y-auto"
      overlayClassName="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between p-5 border-b border-white/10">
        <div>
          <h2 className="text-2xl font-bold text-yellow-400">{book.title}</h2>
          <p className="text-sm text-gray-400">by {book.author}</p>
        </div>

        <div className="flex gap-3 items-center">
          {/* Wishlist */}
          <button
            onClick={() => setLiked(!liked)}
            className={`text-xl transition ${
              liked ? "text-red-500" : "text-gray-400"
            }`}
          >
            <FaHeart />
          </button>

          {/* Close */}
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-white text-xl"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="p-6 space-y-6">
        {/* COVER */}
        <div className="flex justify-center">
          <img
            src={book.cover}
            alt={book.title}
            className="w-56 h-80 object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* DESCRIPTION */}
        <p className="text-gray-400 text-center">
          {book.description || "No description available."}
        </p>

        {/* SAMPLE PREVIEW SECTION */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3 text-yellow-400">
            <FaBookOpen />
            <h3 className="font-bold">Free Sample Preview</h3>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">
            {book.sample ||
              "This book includes powerful insights. Upgrade to unlock full chapters and premium content."}
          </p>
        </div>

        {/* PDF / VIDEO PREVIEW */}
        {/* {book.preview ? (
          <div className="rounded-2xl overflow-hidden border border-white/10">
            {loading && (
              <p className="text-center text-gray-400 py-3">
                Loading preview...
              </p>
            )}

            <iframe
              src={book.preview}
              width="100%"
              height="420px"
              onLoad={() => setLoading(false)}
            />
          </div>
        ) : (
          <div className="text-center text-gray-500 p-6 border border-white/10 rounded-xl">
            No preview available — unlock full book after purchase.
          </div>
        )} */}

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button
            onClick={closeModal}
            className="px-6 py-3 rounded-2xl border border-white/10 hover:bg-white/5 transition"
          >
            Continue Browsing
          </button>

          <button
            onClick={() => {
              if (!book._id) {
                closeModal();
                navigate("/books");
                return;
              }

              addToCart(book);
              closeModal();
              navigate("/checkout");
            }}
            className="px-6 py-3 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-black font-bold transition"
          >
            {book._id ? "Buy & Unlock Full Book" : "View Store Catalog"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
