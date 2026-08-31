import { usePurchases } from "../context/PurchaseContext";
import { FaDownload, FaBookOpen } from "react-icons/fa";
import { getBookId } from "../utils/bookIds";

export default function MyLibrary() {
  const { purchases } = usePurchases();

  const downloadBook = (token) => {
    window.open(
      `${import.meta.env.VITE_API_URL}/api/download/${token}`,
      "_blank",
    );
  };
  return (
    <main className="min-h-screen px-6 py-10">
      <div>
        {/* HEADER */}
        <div className=" mb-10">
          <h1
            className="
              text-4xl
              font-black
              mb-3
            "
          >
            My Library
          </h1>

          <p
            className="
              text-gray-400
            "
          >
            Your purchased digital books.
          </p>
        </div>

        {/* EMPTY */}
        {purchases.length === 0 && (
          <div
            className="
              text-center
              py-24
              bg-white/5
              border
              border-white/10
              rounded-3xl
            "
          >
            <FaBookOpen
              className="
                mx-auto
                text-5xl
                text-gray-500
                mb-6
              "
            />

            <h2
              className="
                text-2xl
                font-bold
                mb-3
              "
            >
              No Books Yet
            </h2>

            <p
              className="
                text-gray-400
              "
            >
              Your Purchased ebooks will appear here.
            </p>
            <button
              onClick={() => {
                window.location.href = "/Books";
              }}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 px-6 rounded-2xl transition-all mt-6"
            >
              Browse Books
            </button>
          </div>
        )}

        {/* BOOK GRID */}
        <div
          className="
            grid
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-8
          "
        >
          {purchases.map((book) => (
            <div
              key={getBookId(book)}
              className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-3xl
                  overflow-hidden
                  backdrop-blur-xl
                  hover:-translate-y-2
                  transition-all
                "
            >
              {/* COVER */}
              <img
                src={book.cover}
                alt={book.title}
                className="
                    w-full
                    h-72
                    object-cover
                  "
              />

              {/* INFO */}
              <div
                className="
                    p-5
                  "
              >
                <h2
                  className="
                      font-bold
                      text-lg
                      mb-2
                    "
                >
                  {book.title}
                </h2>

                <p
                  className="
                      text-gray-400
                      text-sm
                      mb-4
                    "
                >
                  {book.author}
                </p>

                {/* DOWNLOAD */}
                <a
                  href={book.file}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="
                      flex
                      items-center
                      justify-center
                      gap-2

                      bg-yellow-400
                      hover:bg-yellow-300

                      text-black
                      font-bold

                      py-3
                      rounded-2xl

                      transition-all
                    "
                >
                  <FaDownload />
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
