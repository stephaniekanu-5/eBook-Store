import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export default function Feedback() {
  return (
    <main className="min-h-screen px-2 py-10 bg-black text-white">
      <section className="mt-10 mb-5">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-black text-center mb-10">
            What Our Readers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <p className="text-gray-300 italic">
                "This platform has completely transformed how I consume literature. The selection is outstanding!"
              </p>
              <p className="text-yellow-400 font-bold mt-4">- Jane Doe</p>
            </div>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <p className="text-gray-300 italic">
                "I love the convenience of accessing books anytime, anywhere. It's a game-changer!"
              </p>
              <p className="text-yellow-400 font-bold mt-4">- John Smith</p>
            </div>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <p className="text-gray-300 italic">
                "The user interface is intuitive and the search functionality is top-notch."
              </p>
              <p className="text-yellow-400 font-bold mt-4">- Alice Johnson</p>
            </div>
          </div>
        </motion.div>
      </section>
      <section className="mt-10 mb-5">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-black text-center mb-10">
            Share Your Feedback
          </h2>
          <p className="text-gray-400 text-lg mb-6">
             We value your feedback and suggestions. Please share your thoughts with us to help us improve our services and provide you with a better experience.
          </p>
          <form className="bg-white/5 p-6 rounded-3xl border border-white/10">
            <div className="mb-4">
              <label className="block text-gray-300 mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="bg-white/10 text-gray-300 placeholder:text-gray-500 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-white/10 text-gray-300 placeholder:text-gray-500 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Your Email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="block bg-white/10 text-gray-300 placeholder:text-gray-500 border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Your Feedback..."
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-4 rounded-2xl transition hover:scale-105"
            >
              Submit Feedback
            </button>
          </form>
        </motion.div>
      </section>
      {/* ================= CTA ================= */}
      <section className="relative overflow-hidden border-b border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[40px] border border-yellow-400/20 bg-gradient-to-r from-yellow-400/10 via-white/5 to-yellow-400/10 p-10 md:p-16 text-center">
          {/* Glow */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-yellow-400/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-yellow-400/20 blur-3xl rounded-full" />
          <div className="relative z-10">
            <span className="inline-block px-5 py-2 rounded-full bg-yellow-400 text-black font-bold mb-6">
              📚 Join Thousands of Readers
            </span>
            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              Ready to Start
              <span className="text-yellow-400">
                {" "}Reading Smarter?
              </span>
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-gray-300 text-lg leading-8">
              Explore hundreds of carefully selected ebooks
              for business, technology, finance, personal
              development, health, education and much more.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">
              <Link to="/books"
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-4 rounded-2xl transition hover:scale-105"
              >
                Browse Books
              </Link>

              <Link to="/register"
                className="border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold px-8 py-4 rounded-2xl transition hover:scale-105"
              >
                Create Free Account
              </Link>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              <div>
                <h3 className="text-xl md:text-4xl font-black text-yellow-400">
                  500+
                </h3>
                <p className="text-gray-400 mt-2">
                  Premium Books
                </p>
              </div>
              <div>
                <h3 className="text-xl md:text-4xl font-black text-yellow-400">
                  24/7
                </h3>
                <p className="text-gray-400 mt-2">
                  Instant Access
                </p>
              </div>
              <div>
                <h3 className="text-xl md:text-4xl font-black text-yellow-400">
                  100%
                </h3>
                <p className="text-gray-400 mt-2">
                  Secure Payments
                </p>
              </div>
              <div>
                <h3 className="text-xl md:text-4xl font-black text-yellow-400">
                  Worldwide
                </h3>
                <p className="text-gray-400 mt-2">
                  Digital Delivery
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}