import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiEdit,
  FiSave,
  FiBook,
  FiDownload,
  FiUser,
  FiMail,
  FiBriefcase,
} from "react-icons/fi";

export default function Profile() {
  const [savedBooks, setSavedBooks] = useState([]);
  const [downloads, setDownloads] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "Digital Reader",
    bio: "",
    avatar: "",
  });

  // Safe localStorage parser
  const safeParse = (key, fallback) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (error) {
      console.error("Storage parse error:", error);
      return fallback;
    }
  };

  useEffect(() => {
    const storedUser = safeParse("ebook-user", null);

    if (storedUser) {
      setUser(storedUser);
    }

    const purchasedBooks = safeParse("purchased-books", []);

    setSavedBooks(purchasedBooks);

    setDownloads(purchasedBooks.length);
  }, []);

  useEffect(() => {
    localStorage.setItem("ebook-user", JSON.stringify(user));
  }, [user]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-6 py-12">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl md:text-5xl font-black">My Profile</h1>

        <p className="text-gray-400 mt-3 text-lg">
          Manage your digital library account and downloads.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* PROFILE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          // className="
          //   lg:col-span-2
          //   bg-white/5
          //   backdrop-blur-xl
          //   border border-white/10
          //   rounded-3xl
          //   p-8
          // "
        >
          {/* TOP */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
            {/* Avatar */}
            <div className="relative">
              <img
                src={
                  user.avatar ||
                  "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                }
                alt="avatar"
                className="
                  w-28 h-28 rounded-full
                  object-cover border-4 border-purple-500
                "
              />

              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];

                    if (!file) return;

                    const reader = new FileReader();

                    reader.onloadend = () => {
                      setUser({
                        ...user,
                        avatar: reader.result,
                      });
                    };

                    reader.readAsDataURL(file);
                  }}
                  className="mt-4 text-sm"
                />
              )}
            </div>

            {/* INFO */}
            <div>
              <h2 className="text-3xl font-bold">{user.name || "Your Name"}</h2>

              <p className="text-gray-400 mt-2">
                {user.email || "your@email.com"}
              </p>

              <span
                className="
                inline-block mt-3
                bg-purple-600/20
                text-purple-300
                px-4 py-1 rounded-full
                text-sm font-semibold
              "
              >
                {user.role}
              </span>
            </div>
          </div>

          {/* FORM */}
          <div className="space-y-6">
            {/* NAME */}
            <div>
              <label className="text-gray-400 flex items-center gap-2 mb-2">
                <FiUser />
                Full Name
              </label>

              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="
                    w-full bg-black/40 border border-white/10
                    rounded-2xl px-4 py-3
                    focus:outline-none focus:border-purple-500
                  "
                />
              ) : (
                <div className="bg-black/30 rounded-2xl px-4 py-3">
                  {user.name || "Your Name"}
                </div>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-gray-400 flex items-center gap-2 mb-2">
                <FiMail />
                Email Address
              </label>

              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="
                    w-full bg-black/40 border border-white/10
                    rounded-2xl px-4 py-3
                    focus:outline-none focus:border-purple-500
                  "
                />
              ) : (
                <div className="bg-black/30 rounded-2xl px-4 py-3">
                  {user.email || "your@email.com"}
                </div>
              )}
            </div>

            {/* ROLE */}
            <div>
              <label className="text-gray-400 flex items-center gap-2 mb-2">
                <FiBriefcase />
                Role
              </label>

              {isEditing ? (
                <input
                  type="text"
                  name="role"
                  value={user.role}
                  onChange={handleChange}
                  className="
                    w-full bg-black/40 border border-white/10
                    rounded-2xl px-4 py-3
                    focus:outline-none focus:border-purple-500
                  "
                />
              ) : (
                <div className="bg-black/30 rounded-2xl px-4 py-3">
                  {user.role}
                </div>
              )}
            </div>

            {/* BIO */}
            <div>
              <label className="text-gray-400 mb-2 block">Bio</label>

              {isEditing ? (
                <textarea
                  name="bio"
                  value={user.bio}
                  onChange={handleChange}
                  rows="5"
                  className="
                    w-full bg-black/40 border border-white/10
                    rounded-2xl px-4 py-3
                    focus:outline-none focus:border-purple-500
                  "
                />
              ) : (
                <div className="bg-black/30 rounded-2xl px-4 py-3 text-gray-300">
                  {user.bio || "Tell readers something about yourself."}
                </div>
              )}
            </div>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 pt-4">
              {isEditing ? (
                <button
                  onClick={() => setIsEditing(false)}
                  className="
                    bg-purple-600 hover:bg-purple-500
                    transition
                    px-6 py-3 rounded-2xl
                    font-bold flex items-center gap-2
                  "
                >
                  <FiSave />
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="
                    bg-white/10 hover:bg-white/20
                    transition
                    px-6 py-3 rounded-2xl
                    font-semibold flex items-center gap-2
                  "
                >
                  <FiEdit />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* SIDEBAR */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* STATS */}
          <div
            className="
            bg-white/5 backdrop-blur-xl
            border border-white/10
            rounded-3xl p-6
          "
          >
            <h3 className="text-xl font-bold mb-6">Account Stats</h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-400">
                  <FiBook />
                  Purchased Books
                </div>

                <span className="font-bold text-xl">{savedBooks.length}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-400">
                  <FiDownload />
                  Downloads
                </div>

                <span className="font-bold text-xl">{downloads}</span>
              </div>
            </div>
          </div>

          {/* QUICK ACCESS */}
          <div
            className="
            bg-white/5 backdrop-blur-xl
            border border-white/10
            rounded-3xl p-6
          "
          >
            <h3 className="text-xl font-bold mb-6">Quick Access</h3>

            <div className="flex flex-col gap-3">
              <Link
                to="/mylibrary"
                className="
                  bg-purple-600 hover:bg-purple-500
                  py-3 rounded-2xl text-center
                  font-semibold transition
                "
              >
                My Library
              </Link>

              <Link
                to="/books"
                className="
                  bg-white/10 hover:bg-white/20
                  py-3 rounded-2xl text-center
                  font-semibold transition
                "
              >
                Explore Books
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
