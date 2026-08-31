import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Success() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="
          max-w-md w-full
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-3xl
          p-10 text-center
        "
      >
        {/* Icon */}
        <div className="text-5xl mb-6">📚</div>

        {/* Title */}
        <h1 className="text-3xl font-black mb-3">Download Unlocked</h1>

        {/* Message */}
        <p className="text-gray-400 mb-8 leading-relaxed">
          Your payment is complete. You now have instant access to your ebooks.
          They are ready in your personal library.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            to="/mylibrary"
            className="
              bg-purple-600 hover:bg-purple-500
              py-3 rounded-2xl font-bold
              transition hover:scale-[1.02]
            "
          >
            Open Library
          </Link>

          <Link
            to="/books"
            className="
              bg-white/5 border border-white/10
              py-3 rounded-2xl font-semibold
              hover:bg-white/10 transition
            "
          >
            Download More Books
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
