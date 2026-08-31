import { FaStar, FaQuoteLeft } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Designer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "UketBooks completely changed how I consume digital books. The experience feels premium, fast, and beautifully designed.",
    rating: 5,
  },

  {
    id: 2,
    name: "Michael Chen",
    role: "Startup Founder",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "The instant ebook delivery and clean reading experience are incredible. Easily one of the best digital libraries I’ve used.",
    rating: 5,
  },

  {
    id: 3,
    name: "Amina Yusuf",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    review:
      "I love the smooth checkout process and modern UI. Everything feels polished and professional from start to finish.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Lee",
    role: "Marketing Director",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    review:
      "As a busy professional, UketBooks saves me time and provides an excellent reading experience. Highly recommended!",
    rating: 5,
  },
  {
    id: 5,
    name: "Emily Davis",
    role: "Content Creator",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    review:
      "UketBooks has become my go-to platform for discovering new authors and diving into captivating stories. The curation is top-notch!",
    rating: 5,
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Content Creator",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    review:
      "The reading experience on UketBooks is fantastic. The collection is diverse, easy to navigate, and always keeps me coming back for more.",
    rating: 5,
  },
  {
    id: 7,
    name: "Sophia Martinez",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    role: "Content Creator",
    review:
      "I love how simple it is to find quality ebooks on UketBooks. The platform is reliable, user-friendly, and packed with great titles.",
    rating: 5,
  },
  {
    id: 8,
    name: "Liam Anderson",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    role: "Content Creator",
    review:
      "UketBooks has completely transformed the way I read digital books. The selection is impressive, and the downloads are seamless.",
    rating: 5,
  },
  {
    id: 9,
    name: "Olivia Brown",
    image: "https://randomuser.me/api/portraits/women/78.jpg",
    role: "Content Creator",
    review:
      "The quality of books available on UketBooks is outstanding. I've discovered some of my favorite authors through this platform.",
    rating: 5,
  },
  {
    id: 10,
    name: "Noah Taylor",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
    role: "Content Creator",
    review:
      "From bestselling titles to hidden gems, UketBooks consistently delivers excellent content. It's a must-have platform for book lovers.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="relative bg-black py-2 px-2 md:px-2 overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/2-translate-x-1/2 w-[500px] h-[500px] bg-yellow-400/10 blur-[120px] rounded-full" />

      <div className="relative z-10">
        {/* HEADER */}
        <div className=" text-center mb-5">
          <p className="uppercase tracking-[0.25em] text-yellow-400 text-sm mb-4">
            Testimonials
          </p>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Loved by
            <span className="text-yellow-400"> Readers Worldwide</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Thousands of readers use UketBooks to access premium digital books
            for growth, learning, and transformation.
          </p>
        </div>

        {/* TESTIMONIAL SWIPER */}

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}

          className="testimonial-swiper"

          spaceBetween={30}

          loop={true}

          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}

          // navigation={true}

          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}

          grabCursor={true}

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
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="relative group bg-white/[0.03] border border-white/10 rounded-[32px] p-8 backdrop-blur-xl hover:border-yellow-400/30 hover:-translate-y-2 transition-all duration-500 h-full">
                {/* QUOTE ICON */}
                <div className="absolute top-6 right-6 text-yellow-400/20 text-4xl">
                  <FaQuoteLeft />
                </div>

                {/* USER */}
                <div className=" flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400/30"
                  />

                  <div>
                    <h3 className="text-white font-bold text-lg">
                      {testimonial.name}
                    </h3>

                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                {/* STARS */}
                <div className="flex gap-1 text-yellow-400 mb-5">
                  {Array.from({
                    length: testimonial.rating,
                  }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                {/* REVIEW */}
                <p className="text-gray-300 leading-relaxed text-lg">
                  “{testimonial.review}”
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
