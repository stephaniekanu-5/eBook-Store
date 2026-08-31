import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

import PreviewModal from "../components/PreviewModal";
import { useBooks } from "../context/BookContext";
import { isSameBook } from "../utils/bookIds";

export default function PreviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books } = useBooks();

  const [isOpen, setIsOpen] = useState(true);

  const book = books.find((b) => isSameBook(b, id));

  const closeModal = () => {
    setIsOpen(false);

    // redirect back
    navigate("/books");
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        no preview available
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <PreviewModal isOpen={isOpen} closeModal={closeModal} book={book} />
    </div>
  );
}
