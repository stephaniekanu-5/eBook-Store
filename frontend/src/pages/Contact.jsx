import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaPaperPlane,
} from "react-icons/fa";
import { sendContactMessage } from "../services/contactService";

export default function Contact() {
  // ==========================
  // STATE
  // ==========================
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ==========================
  // HANDLE CHANGE
  // ==========================
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ==========================
  // SUBMIT
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await sendContactMessage(form);
      setSuccess(response.message);
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <div className="">
        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-yellow-500/10 via-black to-purple-500/10 border border-white/10 mb-10">
          {/* Decorative Blobs */}
          <div className="absolute -top-24 -left-20 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="relative px-2 md:px-16 py-5">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-flex items-center gap-2 bg-yellow-400 text-black font-bold px-5 py-2 rounded-full mb-6">
                <FaPaperPlane />
                Contact UketBooks
              </span>
              <h1 className="text-5xl md:text-7xl font-black leading-tight">
                We'd Love to
                <span className="block text-yellow-400">Hear From You</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl mt-8 leading-8 max-w-3xl mx-auto">
                Whether you have a question about your purchase, need technical
                support, want to recommend a book, or simply want to say hello,
                our team is always happy to help.
              </p>
            </motion.div>
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
            >
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
                <h2 className="text-3xl font-black text-yellow-400">24h</h2>
                <p className="text-gray-400 mt-2">Average Response</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
                <h2 className="text-3xl font-black text-yellow-400">24/7</h2>
                <p className="text-gray-400 mt-2">Digital Access</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
                <h2 className="text-3xl font-black text-yellow-400">100%</h2>
                <p className="text-gray-400 mt-2">Secure Platform</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
                <h2 className="text-3xl font-black text-yellow-400">Global</h2>
                <p className="text-gray-400 mt-2">Customer Support</p>
              </div>
            </motion.div>
          </div>
          {/* Social */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-2xl font-bold mb-6">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/uketbooks"
                className="w-12 h-12 rounded-xl bg-yellow-400 text-black flex items-center justify-center hover:scale-110 transition"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com/uketbooks"
                className="w-12 h-12 rounded-xl bg-yellow-400 text-black flex items-center justify-center hover:scale-110 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/company/uketbooks"
                className="w-12 h-12 rounded-xl bg-yellow-400 text-black flex items-center justify-center hover:scale-110 transition"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://twitter.com/uketbooks"
                className="w-12 h-12 rounded-xl bg-yellow-400 text-black flex items-center justify-center hover:scale-110 transition"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </section>
        {/* ================= CONTACT CONTENT ================= */}
        <div className="grid lg:grid-cols-5 gap-10">
          {/* ================= LEFT SIDE ================= */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Email */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-yellow-400/50 transition">
              <div className="w-14 h-14 rounded-2xl bg-yellow-400 text-black flex items-center justify-center text-2xl mb-5">
                <FaEnvelope />
              </div>
              <h3 className="text-2xl font-bold">Email Support directly</h3>
              <p className="text-gray-400 mt-2">
                Need help with purchases, downloads or technical issues?
              </p>
              <button
                onClick={() =>
                  (window.location.href = "mailto:uketbooks@gmail.com")
                }
                className="border border-yellow-400 text-yellow-400 px-8 py-4 rounded-2xl hover:bg-yellow-400 hover:text-black transition"
              >
                support@uketbooks.com
              </button>
            </div>
            {/* Address */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-yellow-400/50 transition">
              <div className="w-14 h-14 rounded-2xl bg-yellow-400 text-black flex items-center justify-center text-2xl mb-5">
                <FaMapMarkerAlt />
              </div>
              <h3 className="text-2xl font-bold">Location</h3>
              <p className="text-gray-400 mt-2">
                We operate as a digital-first bookstore serving readers
                worldwide.
              </p>
              <p className="text-yellow-400 font-semibold mt-4">
                Nigeria • Worldwide
              </p>
            </div>
            {/* Hours */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-yellow-400/50 transition">
              <div className="w-14 h-14 rounded-2xl bg-yellow-400 text-black flex items-center justify-center text-2xl mb-5">
                <FaClock />
              </div>
              <h3 className="text-2xl font-bold">Business Hours</h3>
              <p className="text-gray-400 mt-2">Monday - Friday</p>
              <p className="text-yellow-400 font-semibold mt-4">
                9:00 AM – 6:00 PM
              </p>
            </div>
          </motion.div>
          {/* ================= RIGHT SIDE ================= */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/5 border border-white/10 rounded-[36px] backdrop-blur-xl p-8 md:p-10">
              <h2 className="text-4xl font-black mb-3">Send us a Message</h2>
              <p className="text-gray-400 mb-8">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>
              {/* SUCCESS */}
              {success && (
                <div className="mb-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-green-400">
                  {success}
                </div>
              )}
              {/* ERROR */}
              {error && (
                <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 font-semibold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full rounded-2xl border border-white/10 bg-black/30 py-4 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      required
                      className=" w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 font-semibold">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold">Message</label>
                  <textarea
                    rows={7}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    required
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-5 py-4 outline-none resize-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full rounded-2xl bg-yellow-400 py-4 font-bold text-black transition- hover:bg-yellow-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-3">
                    <FaPaperPlane className="group-hover:translate-x-1 transition" />
                    {loading ? "Sending Message..." : "Send Message"}
                  </span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
      <section className="bg-green-500/10 border border-green-500/20 rounded-3xl p-6 flex items-center justify-between mt-10">
        <div>
          <h3 className="font-bold text-green-400">🟢 Support Status</h3>
          <p className="text-gray-400 mt-2">
            All systems operational. Support agents are available.
          </p>
        </div>
        <div className="text-green-400 font-bold">Online</div>
      </section>
      {/* ================= CTA ================= */}
      <section className="mt-24 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[40px] border border-yellow-400/20 bg-gradient-to-r from-yellow-400/10 via-white/5 to-yellow-400/10 p-10 md:p-16 text-center"
        >
          {/* Glow */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-yellow-400/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-yellow-400/20 blur-3xl rounded-full" />
          <div className="relative z-10">
            <span className="inline-block px-5 py-2 rounded-full bg-yellow-400 text-black font-bold mb-6">
              📚 Join Thousands of Readers
            </span>
            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              Ready to Start
              <span className="text-yellow-400"> Reading Smarter?</span>
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-gray-300 text-lg leading-8">
              Explore hundreds of carefully selected ebooks for business,
              technology, finance, personal development, health, education and
              much more.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">
              <Link
                to="/books"
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-4 rounded-2xl transition hover:scale-105"
              >
                Browse Books
              </Link>
              <Link
                to="/register"
                className="border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold px-8 py-4 rounded-2xl transition hover:scale-105"
              >
                Create Free Account
              </Link>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              <div>
                <h3 className="text-2xl font-black text-yellow-400">500+</h3>
                <p className="text-gray-400 mt-2">Premium Books</p>
              </div>
              <div>
                <h3 className="text-2xl font-black text-yellow-400">24/7</h3>
                <p className="text-gray-400 mt-2">Instant Access</p>
              </div>
              <div>
                <h3 className="text-2xl font-black text-yellow-400">100%</h3>
                <p className="text-gray-400 mt-2">Secure Payments</p>
              </div>
              <div>
                <h3 className="text-2xl font-black text-yellow-400">
                  Worldwide
                </h3>
                <p className="text-gray-400 mt-2">Digital Delivery</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
