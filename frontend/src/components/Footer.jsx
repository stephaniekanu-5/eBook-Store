import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 text-gray-400">
      {/* Main Footer */}
      <div className="w-full px-4 sm:px-6 lg:px-10 md:px-12 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-14">
          {/* Brand */}
          <div>
            <h2 className="text-4xl font-black text-yellow-400 mb-5">
              UketBooks
            </h2>

            <p className="text-gray-400 leading-relaxed mb-6">
              Discover premium ebooks, read previews, and securely download
              digital books from top authors worldwide.
            </p>

            {/* Socials */}
            <h2 className="text-white font-bold text-xl mb-6">
              Follow Us On Social Media
            </h2>
            <div className="flex gap-4">
              <a
                href="https://web.facebook.com/profile.php?id=61567080574540"
                target="_blank"
                rel="noreferrer"
              >
                <button className="w-11 h-11 rounded-full bg-gray-900 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-yellow-400 hover:text-black transition">
                  <FaFacebookF />
                </button>
              </a>
              <a
                href="https://www.instagram.com/uketbooks/"
                target="_blank"
                rel="noreferrer"
              >
                <button className="w-11 h-11 rounded-full bg-gray-900 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-yellow-400 hover:text-black transition">
                  <FaInstagram />
                </button>
              </a>

              <a
                href="https://twitter.com/uketbooks"
                target="_blank"
                rel="noreferrer"
              >
                <button className="w-11 h-11 rounded-full bg-gray-900 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-yellow-400 hover:text-black transition">
                  <FaTwitter />
                </button>
              </a>

              <a
                href="https://www.linkedin.com/company/uketbooks"
                target="_blank"
                rel="noreferrer"
              >
                <button className="w-11 h-11 rounded-full bg-gray-900 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-yellow-400 hover:text-black transition">
                  <FaLinkedinIn />
                </button>
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-white font-bold text-xl mb-6">Explore</h3>

            <ul className="space-y-4 text-gray-400">
              <li className="hover:text-yellow-400 transition cursor-pointer">
                <Link to="/">Home</Link>
              </li>

              <li className="hover:text-yellow-400 transition cursor-pointer">
                <Link to="/categories">Categories</Link>
              </li>

              <li className="hover:text-yellow-400 transition cursor-pointer">
                <Link to="/featured">Featured Books</Link>
              </li>

              <li className="hover:text-yellow-400 transition cursor-pointer">
                <Link to="/new-releases">New Releases</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold text-xl mb-6">Company</h3>

            <ul className="space-y-4 text-gray-400">
              <li className="hover:text-yellow-400 transition cursor-pointer">
                <Link to="/about">About Us</Link>
              </li>

              <li className="hover:text-yellow-400 transition cursor-pointer">
                <Link to="/careers">Careers</Link>
              </li>

              <li className="hover:text-yellow-400 transition cursor-pointer">
                <Link to="/privacy">Privacy Policy</Link>
              </li>

              <li className="hover:text-yellow-400 transition cursor-pointer">
                <Link to="/terms">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-xl mb-6">Stay Updated</h3>
            <p className="text-gray-400 mb-5">
              Subscribe to receive updates on new ebooks and exclusive offers.
            </p>
            <div className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-900 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-yellow-400"
              />
              <button className="bg-yellow-400 hover:bg-yellow-300 transition text-black py-4 rounded-2xl font-bold">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-center md:text-left">
            © 2026 UketBooks. All rights reserved.
          </p>

          <div className="flex gap-6 text-gray-500 text-sm">
            <Link
              to="/cookies"
              className="hover:text-yellow-400 cursor-pointer transition"
            >
              Cookies
            </Link>

            <Link
              to="/security"
              className="hover:text-yellow-400 cursor-pointer transition"
            >
              Security
            </Link>

            <Link
              to="/accessibility"
              className="hover:text-yellow-400 cursor-pointer transition"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
