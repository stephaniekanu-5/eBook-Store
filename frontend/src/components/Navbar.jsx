import { Link, useNavigate, useLocation } from "react-router-dom";

import { useContext, useState, useEffect, useRef } from "react";

import { CartContext } from "../context/CartContext";

import {
  FaMoon,
  FaSun,
  FaHome,
  FaBook,
  FaUser,
  FaShoppingCart,
  FaInfoCircle,
  FaEnvelope,
  FaQuestionCircle,
  FaCommentDots,
  FaShieldAlt,
  FaFileContract,
  FaBookOpen,
  FaTachometerAlt,
  FaSignOutAlt,
  FaCookie,
} from "react-icons/fa";

import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { totalItems } = useContext(CartContext);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  const menuRef = useRef();

  const { darkMode, toggleTheme } = useTheme();

  // =========================================
  // CLOSE MENU ON OUTSIDE CLICK
  // =========================================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // =========================================
  // ACTIVE LINK
  // =========================================
  const isActive = (path) => location.pathname === path;

  // =========================================
  // NAV LINKS
  // =========================================
  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome />,
    },

    {
      name: "Explore Books",
      path: "/books",
      icon: <FaBook />,
    },

    {
      name: "My Library",
      path: "/mylibrary",
      icon: <FaBookOpen />,
    },

    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />,
    },

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt />,
    },

    {
      name: "About Us",
      path: "/about",
      icon: <FaInfoCircle />,
    },

    {
      name: "support",
      path: "/contact",
      icon: <FaEnvelope />,
    },

    {
      name: "Help Center",
      path: "/help",
      icon: <FaQuestionCircle />,
    },

    {
      name: "Feedback",
      path: "/feedback",
      icon: <FaCommentDots />,
    },

    {
      name: "FAQ ",
      path: "/faq",
      icon: <FaQuestionCircle />,
    },

    {
      name: "Terms of Service",
      path: "/terms",
      icon: <FaFileContract />,
    },

    {
      name: "Privacy Policy",
      path: "/privacy",
      icon: <FaShieldAlt />,
    },
    {
      name: "Cookies Policy",
      path: "/Cookies",
      icon: <FaCookie />,
    },
  ];

  return (
    <nav
      className={`
        sticky
        top-0
        z-[99999]
        bg-purple-600/70
        px-4
        md:px-8
        py-4

        border-b
        backdrop-blur-2xl

        transition-all
        duration-300

        ${
          darkMode
            ? `
              bg-black/70
              border-white/10
              text-white
            `
            : `
              bg-white/70
              border-black/10
              text-black
            `
        }
      `}
    >
      <div
        className="
          max-w-7xl
          mx-auto

          flex
          items-center
          justify-between
          gap-4
        "
      >
        {/* =========================================
            LOGO
        ========================================= */}
        <Link
          to="/"
          className="
            text-2xl
            font-black

            flex
            items-center
            gap-2
          "
        >
          <span
            className="
              text-3xl
            "
          >
            📚
          </span>
        </Link>

        {/* =========================================
            RIGHT SIDE
        ========================================= */}
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className={`
              w-11
              h-11

              rounded-full

              flex
              items-center
              justify-center

              border

              transition-all
              duration-300

              ${
                darkMode
                  ? `
                    bg-white/10
                    border-white/10
                    hover:bg-white/20
                  `
                  : `
                    bg-black/5
                    border-black/10
                    hover:bg-black/10
                  `
              }
            `}
          >
            {darkMode ? (
              <FaSun
                className="
                  text-yellow-400
                "
              />
            ) : (
              <FaMoon />
            )}
          </button>

          {/* CART */}
          <Link
            to="/cart"
            className={`
              relative

              w-11
              h-11

              rounded-full

              flex
              items-center
              justify-center

              border

              transition-all
              duration-300

              ${
                darkMode
                  ? `
                    bg-white/10
                    border-white/10
                    hover:bg-white/20
                  `
                  : `
                    bg-black/5
                    border-black/10
                    hover:bg-black/10
                  `
              }
            `}
          >
            <FaShoppingCart />

            {totalItems > 0 && (
              <span
                className="
                  absolute
                  -top-2
                  -right-2

                  bg-red-500
                  text-white

                  text-xs
                  font-bold

                  min-w-[22px]
                  h-[22px]

                  rounded-full

                  flex
                  items-center
                  justify-center
                "
              >
                {totalItems}
              </span>
            )}
          </Link>

          {/* PROFILE */}
          <Link
            to="/profile"
            className={` w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300
              ${
                isActive("/profile")
                  ? `
                    bg-purple-600
                    border-purple-600
                    text-white
                  `
                  : darkMode
                    ? `
                    bg-white/10
                    border-white/10
                    hover:bg-white/20
                  `
                    : `
                    bg-black/5
                    border-black/10
                    hover:bg-black/10
                  `
              }
            `}
          >
            <FaUser />
          </Link>

          {/* MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className={`
              w-11
              h-11

              rounded-full

              flex
              items-center
              justify-center

              border

              text-2xl

              transition-all
              duration-300

              ${
                darkMode
                  ? `
                    bg-white/10
                    border-white/10
                    hover:bg-white/20
                  `
                  : `
                    bg-black/5
                    border-black/10
                    hover:bg-black/10
                  `
              }
            `}
          >
            ☰
          </button>
        </div>
      </div>

      {/* =========================================
          MOBILE SEARCH
      ========================================= */}
      {/* <div
        className="
          lg:hidden
          mt-4
        "
      >
        <SearchBar />
      </div> */}

      {/* =========================================
          DROPDOWN
      ========================================= */}
      {open && (
        <div
          ref={menuRef}
          className={`
            absolute
            top-[90px]
            right-4
            md:right-8

            w-[290px]
            max-h-[80vh]
            overflow-y-auto

            rounded-[28px]

            border

            shadow-2xl

            backdrop-blur-2xl

            p-4

            z-[999999]

            animate-in
            fade-in
            zoom-in-95
            duration-200

            ${
              darkMode
                ? `
                  bg-gray-950/95
                  border-white/10
                  text-white
                `
                : `
                  bg-white/95
                  border-black/10
                  text-black
                `
            }
          `}
        >
          {/* LINKS */}
          <div
            className="
              flex
              flex-col
              gap-1
            "
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`
                    flex
                    items-center
                    gap-3

                    px-4
                    py-3

                    rounded-2xl

                    transition-all
                    duration-200

                    ${
                      isActive(link.path)
                        ? `
                          bg-purple-600
                          text-white
                        `
                        : darkMode
                          ? `
                          hover:bg-white/10
                        `
                          : `
                          hover:bg-black/5
                        `
                    }
                  `}
              >
                <span>{link.icon}</span>

                <span>{link.name}</span>
              </Link>
            ))}

            {/* LOGOUT */}
            <button
              onClick={() => {
                localStorage.removeItem("authToken");

                navigate("/login");
              }}
              className="
                flex
                items-center
                gap-3

                mt-3
                px-4
                py-3

                rounded-2xl

                text-red-500

                hover:bg-red-500/10

                transition-all
                duration-200
              "
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
