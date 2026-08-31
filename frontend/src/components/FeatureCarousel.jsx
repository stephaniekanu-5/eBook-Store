import { FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useBooks } from "../context/BookContext";
import { getBookId } from "../utils/bookIds";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function FeatureCarousel() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const { featuredBooks, bestSellerBooks } = useBooks();

  // Merge Featured + Best Sellers
  const displayBooks = [
    ...featuredBooks,
    ...bestSellerBooks.filter(
      (book) =>
        !featuredBooks.some(
          (featured) => getBookId(featured) === getBookId(book),
        ),
    ),
  ].slice(0, 6);

  const formatUSD = (amount) =>
    Number(amount || 0).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  if (!displayBooks.length) return null;

  return (
    <section className="bg-black border-white/10 py-1 px-1 md:px-5 overflow-hidden rounded-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-2">
        <div>
          <p className="text-yellow-400 uppercase tracking-[0.2em] text-sm mb-3">
            Premium Collections
          </p>
          <h2 className="text-2xl md:text-6xl font-black text-white leading-tight">
            Best Rated <span className="text-yellow-400"> Ebooks</span>
          </h2>
          <p className="text-gray-400 text-sm mt-2 max-w-2xl">
            Curated books selected by our editors and loved by readers.
          </p>
        </div>
      </div>
      {/* Slider */}
      <div>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          loop
          navigation
          grabCursor
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
        >
          {displayBooks.map((book) => (
            <SwiperSlide key={getBookId(book)}>
              <div className="group bg-gradient-to-b from-gray-900 to-black border border-white/10 rounded-[32px] overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:border-yellow-400/30 hover:shadow-2xl hover:shadow-yellow-400/10">
                {/* Cover */}
                <div className="relative overflow-hidden">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-72 group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  <div className="absolute top-5 right-5 bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-black shadow-lg">
                    {formatUSD(book.price)}
                  </div>
                </div>
                {/* Content */}
                <div className="p-7">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-400 gap-1">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>

                    <span className="text-gray-500 text-sm">
                      {/* {book.sales || 0} sold */}
                      (5.0)
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-white mb-2">
                    {book.title}
                  </h3>

                  <p className="text-gray-400 mb-2">by {book.author}</p>

                  <div className="flex gap-4">
                    <Link
                      to={`/books/${getBookId(book)}`}
                      className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black py-3 rounded-2xl font-bold text-center transition"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => {
                        addToCart(book);
                        navigate("/checkout");
                      }}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-2xl font-semibold transition"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center mt-4">
          <Link
            to="/books"
            className="text-white border border-white/10 hover:border-yellow-400/40 hover:bg-white/5 transition px-6 py-3 rounded-2xl font-semibold"
          >
            Browse All Books
          </Link>
        </div>
      </div>
    </section>
  );
}
