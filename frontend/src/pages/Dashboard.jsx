import { useEffect, useMemo, useState } from "react";
import {
  getBooks,
  createBook,
  updateBook as updateBookService,
  deleteBook as deleteBookService,
} from "../services/bookService";
import {
  FaChartLine,
  FaImage,
  FaSearch,
  FaStar,
  FaFilePdf,
  FaBook,
  FaEdit,
  FaTrash,
  FaUsers,
  FaMoneyBillWave,
  FaDownload,
  FaPlus,
} from "react-icons/fa";
import { usePurchases } from "../context/PurchaseContext";
import { getBookId } from "../utils/bookIds";
import { getStats } from "../services/adminService";
import { motion } from "framer-motion";
import { io } from "socket.io-client";
import API from "../services/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const formatPrice = (price) =>
    Number(price).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  // =========================================
  // STATES
  // =========================================
  const INITIAL_FORM = {
    title: "",
    author: "",
    description: "",
    category: "",
    price: "",
    originalPrice: "",
    cover: "",
    file: "",
    preview: "",
    featured: false,
    bestSeller: false,
    featuredTitle: false,
    justArrived: false,
    recommended: false,
    deals: false,
    comingSoon: false,
    pages: "",
    language: "English",
  };

  const [books, setBooks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [stats, setStats] = useState({
    users: 0,
    books: 0,
    downloads: 0,
    revenue: 0,
    weeklyRevenue: 0,
  });
  const [coverFile, setCoverFile] = useState(null);
  const [bookFile, setBookFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [revenue, setRevenue] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await getStats();

        if (res?.stats) {
          setStats(res.stats);
        }
      } catch (err) {
        console.error("Dashboard stats error:", err);
      }
    };
    loadStats();

    const socket = io(import.meta.env.VITE_API_URL);
    socket.on("statsUpdated", () => {
      loadStats(); // refresh dashboard
    });
    return () => socket.disconnect();
  }, []);

  // =========================================
  // PURCHASES
  // =========================================
  const { purchases } = usePurchases();

  // =========================================
  // FETCH BOOKS
  // =========================================
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await getBooks();
      setBooks(data.books || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRevenue = async () => {
      const res = await API.get("/api/admin/revenue");
      setRevenue(res.data);
    };
    fetchRevenue();
  }, []);

  // =========================================
  // ANALYTICS
  // =========================================
  const purchaseStats = useMemo(() => {
    const revenue = purchases.reduce(
      (sum, item) => sum + Number(item.price || 0),
      0,
    );
    const recentOrders = purchases.filter((o) => {
      const orderDate = new Date(o.createdAt);
      const last7Days = new Date();
      last7Days.setDate(last7Days.getDate() - 7);
      return orderDate >= last7Days;
    });
    const weeklyRevenue = recentOrders.reduce(
      (sum, item) => sum + Number(item.price || 0),
      0,
    );
    const downloads = purchases.length;
    const booksSold = purchases.length;
    const users = new Set(purchases.map((item) => item.email)).size || 1;
    return {
      TotalRevenue: formatPrice(revenue),
      downloads,
      booksSold,
      weeklyRevenue: formatPrice(weeklyRevenue),
      users,
    };
  }, [purchases]);

  // =========================================
  // FILTERED BOOKS
  // =========================================
  const filteredBooks = books.filter((book) => {
    const q = search.toLowerCase();
    return (
      book.title?.toLowerCase().includes(q) ||
      book.author?.toLowerCase().includes(q)
    );
  });

  const resetForm = () => {
    setEditingId(null);
    setForm(INITIAL_FORM);
    setCoverFile(null);
    setBookFile(null);
    setCoverPreview("");
  };

  // =========================================
  // INPUT CHANGE
  // =========================================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================================
  // COVER UPLOAD
  // =========================================
  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image.");
      return;
    }
    setCoverFile(file);
    const previewUrl = URL.createObjectURL(file);
    setCoverPreview(previewUrl);
    setForm((prev) => ({
      ...prev,
    }));
  };
  useEffect(() => {
    return () => {
      if (coverPreview) {
        URL.revokeObjectURL(coverPreview);
      }
    };
  }, [coverPreview]);
  // =========================================
  // BOOK FILE UPLOAD
  // =========================================
  const handleBookUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      return;
    }
    setBookFile(file); // ✅ store actual file

    setForm((prev) => ({
      ...prev,
      file: file.name, // optional display only
    }));
  };

  // =========================================
  // CREATE / UPDATE BOOK
  // =========================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SUBMIT CLICKED");
    setSubmitting(true);
    try {
      if (!form.title || !form.author || !form.price) {
        toast.error("Please fill all required fields.");
        return;
      }
      if (!form.category) {
        toast.error("Please select a category.");
        return;
      }
      if (!form.pages || parseInt(form.pages) <= 0) {
        toast.error("Enter a valid number of pages.");
        return;
      }
      if (!form.language) {
        toast.error("Please select a language.");
        return;
      }
      if (!form.description) {
        toast.error("Please enter a description.");
        return;
      }
      if (!form.title.trim()) {
        toast.error("Please enter a title.");
        return;
      }
      if (!form.price || parseFloat(form.price) <= 0) {
        toast.error("Enter a valid price.");
        return;
      }
      {
        if (!form.originalPrice || parseFloat(form.originalPrice) <= 0) {
          toast.error("Enter a valid original price.");
          return;
        }
      }
      if (!editingId) {
        if (!coverFile) {
          toast.error("Please upload a cover image.");
          return;
        }

        if (!bookFile) {
          toast.error("Please upload a PDF file.");
          return;
        }
      }

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("author", form.author);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("originalPrice", form.originalPrice);
      formData.append("pages", form.pages);
      formData.append("language", form.language);
      formData.append("featured", form.featured);
      formData.append("featuredTitle", form.featuredTitle);
      formData.append("justArrived", form.justArrived);
      formData.append("bestSeller", form.bestSeller);
      formData.append("recommended", form.recommended);
      formData.append("deals", form.deals);
      formData.append("comingSoon", form.comingSoon);

      if (coverFile) formData.append("cover", coverFile);
      if (bookFile) formData.append("file", bookFile);
      console.log("editingId =", editingId);
      if (editingId) {
        console.log("Updating book...");

        const updated = await updateBookService(editingId, formData);
        setBooks((prev) =>
          prev.map((book) =>
            book._id === updated.book._id ? updated.book : book,
          ),
        );
        toast.success("Book updated successfully.");
        resetForm();
      } else {
        const created = await createBook(formData);
        toast.success("Book created successfully.");
        await fetchBooks();
      }
      resetForm();
    } catch (error) {
      console.error("UPDATE ERROR:", error);

      if (error.response) {
        console.log("STATUS:", error.response.status);
        console.log("DATA:", error.response.data);
      }

      toast.error(error.response?.data?.message || error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // =========================================
  // EDIT
  // =========================================
  const handleEdit = (book) => {
    console.log("BOOK", book);
    setEditingId(book._id);
    setForm({
      ...INITIAL_FORM,
      ...book,
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    console.log(form);
  }, [form]);
  // =========================================
  // DELETE
  // =========================================
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Delete this book?");
      if (!confirmDelete) return;
      await deleteBookService(id);
      setBooks((prev) => prev.filter((book) => book._id !== id));
      toast.success("Book deleted successfully.");
      await fetchBooks();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };
  return (
    <main className="min-h-screen px-4 md:px-8 py-10">
      <div>
        {/* =========================================
            HEADER
        ========================================= */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className=" text-4xl md:text-5xl font-black mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-400">
              Manage books, sales, uploads, analytics & digital products.
            </p>
          </div>
          <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-yellow-400 text-black font-bold">
            <FaChartLine />
            Live Store Analytics
          </div>
        </div>

        {/* =========================================
            STATS
        ========================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="flex justify-between mb-4">
              <FaDownload className="text-purple-400 text-2xl" />
              <span className="text-xs text-green-400">+8%</span>
            </div>

            <p className="text-gray-400 mb-2">Downloads</p>

            <h2 className="text-3xl font-black">{stats.downloads}</h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="flex justify-between mb-4">
              <FaBook className="text-blue-400 text-2xl" />

              <span className="text-xs text-green-400">+15%</span>
            </div>

            <p className="text-gray-400 mb-2">Books</p>

            <h2 className="text-3xl font-black">{stats.books}</h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="flex justify-between mb-4">
              <FaUsers className="text-green-400 text-2xl" />

              <span className="text-xs text-green-400">+4%</span>
            </div>
            <p className="text-gray-400 mb-2">Users</p>
            <h2 className="text-3xl font-black">{stats.users}</h2>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
            <div className="flex justify-between mb-4">
              <FaMoneyBillWave className="text-yellow-400 text-2xl" />

              <span className="text-xs text-green-400">+12%</span>
            </div>

            <p className="text-gray-400 mb-2">Revenue</p>

            <motion.h2
              key={stats.revenue}
              initial={{ opacity: 0.5, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-3xl font-black"
            >
              ${(stats.revenue || 0).toLocaleString()}
            </motion.h2>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="flex justify-between mb-4">
              <FaChartLine className="text-yellow-400 text-2xl" />

              <span className="text-xs text-green-400">+12%</span>
            </div>
            <p className="text-gray-400 mb-2">Weekly Revenue</p>

            <motion.h2
              key={stats.weeklyRevenue}
              initial={{ opacity: 0.5, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-3xl font-black"
            >
              ${(stats.weeklyRevenue || 0).toLocaleString()}
            </motion.h2>
          </div>
        </div>
        {/* =========================================
            RECENT PURCHASES
        ========================================= */}
        <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 md:p-8 backdrop-blur-xl">
          <h2 className="text-2xl font-black mb-8">Recent Purchases</h2>

          {purchases.length === 0 ? (
            <p className=" text-gray-400">No purchases yet.</p>
          ) : (
            <div className="space-y-">
              {purchases.slice(0, 10).map((order, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-black/20 border border-white/10 rounded-2xl"
                >
                  <div>
                    <h3 className="font-bold mb-1">{order.title}</h3>

                    <p className="text-sm text-gray-400">Digital Purchase</p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-yellow-400">₦{order.price}</p>
                    <p className="text-green-400 text-sm">Paid</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* =========================================
            BOOK MANAGER
        ========================================= */}
        <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 md:p-8 mb-10 backdrop-blur-xl mt-10">
          {/* TOP */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
            <div>
              <h2 className="text-2xl font-black mb-2">Book Manager</h2>

              <p className="text-gray-400">
                Upload, edit and manage digital ebooks.
              </p>
            </div>

            {/* SEARCH */}
            <div className="relative w-full lg:w-80">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

              <input
                type="text"
                placeholder="Search books..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-black/30 border border-white/10 rounded-2xl outline-none"
              />
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-5 mb-10"
          >
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Book title"
              className="p-4 rounded-2xl bg-black/30 border border-white/10"
            />

            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Author"
              className="p-4 rounded-2xl bg-black/30 border border-white/10"
            />

            <input
              type="number"
              min="0"
              name="price"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="p-4 rounded-2xl bg-black/30 border border-white/10"
            />
            <input
              type="number"
              min="0"
              step="0.01"
              name="originalPrice"
              value={form.originalPrice}
              onChange={handleChange}
              placeholder="Original Price"
              className="p-4 rounded-2xl bg-black/30 border border-white/10"
            />
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Category"
              className="p-4 rounded-2xl bg-black/30 border border-white/10"
            />

            <input
              type="number"
              min="1"
              name="pages"
              value={form.pages}
              onChange={handleChange}
              placeholder="Pages"
              className="p-4 rounded-2xl bg-black/30 border border-white/10"
            />

            <input
              name="language"
              value={form.language}
              onChange={handleChange}
              placeholder="Language"
              className="p-4 rounded-2xl bg-black/30 border border-white/10"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description..."
              rows="5"
              className="
                md:col-span-2
                p-4
                rounded-2xl
                bg-black/30
                border
                border-white/10
              "
            />

            {/* COVER */}
            <div className="bg-black/20 border-white/10 rounded-3xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <FaImage />

                <h3 className="font-bold">Cover Upload</h3>
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                className="w-full text-sm file:bg-yellow-400 file:border-0 file:px-4 file:py-2 file:rounded-xl file:text-black file:font-bold"
              />

              {form.cover && (
                <img
                  src={form.cover}
                  alt="Preview"
                  className="mt-5 w-40 h-56 object-cover rounded-2xl"
                />
              )}
            </div>

            {/* PDF */}
            <div className="bg-black/20 border border-white/10 rounded-3xl p-5">
              <div className="items-center gap-3 mb-4">
                <FaFilePdf />

                <h3 className="font-bold">Ebook Upload</h3>
              </div>

              <input
                type="file"
                accept=".pdf,.epub"
                onChange={handleBookUpload}
                className="w-full text-sm file:bg-purple-600 file:border-0 file:px-4 file:py-2 file:rounded-xl file:text-white file:font-bold"
              />

              {form.file && (
                <p className="mt-4 text-green-400 text-sm">
                  Ebook uploaded successfully
                </p>
              )}
            </div>

            {/* Homepage Placement */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-white mb-4">
                Homepage Placement
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                  />
                  Featured
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="justArrived"
                    checked={form.justArrived}
                    onChange={handleChange}
                  />
                  Just Arrived
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="bestSeller"
                    checked={form.bestSeller}
                    onChange={handleChange}
                  />
                  Best Seller
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="recommended"
                    checked={form.recommended}
                    onChange={handleChange}
                  />
                  Recommended
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="deals"
                    checked={form.deals}
                    onChange={handleChange}
                  />
                  Deals
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="comingSoon"
                    checked={form.comingSoon}
                    onChange={handleChange}
                  />
                  Coming Soon
                </label>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 md:col-span-2">
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 text-black font-bold px-8 py-4 rounded-2xl"
              >
                <FaPlus />

                {submitting
                  ? "Uploading..."
                  : editingId
                    ? "Update Book"
                    : "Upload Book"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 py-4 rounded-2xl border border-white/10"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* BOOKS */}
          <div className="space-y-4">
            {filteredBooks.map((book) => (
              <div
                key={getBookId(book)}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 p-5 bg-black/20 border border-white/10 rounded-3xl"
              >
                {/* LEFT */}
                <div className="flex gap-5">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-24 h-32 object-cover rounded-2xl"
                  />
                  <div>
                    <h3 className="text-xl font-bold mb-1">{book.title}</h3>

                    <p className="text-gray-400 mb-1">{book.author}</p>

                    <p className="text-yellow-400 font-semibold mb-3">
                      ${Number(book.price || 0).toFixed(2)}
                    </p>

                    {/* CATEGORY */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-purple-600/20 text-purple-300 text-xs">
                        {book.category}
                      </span>
                    </div>

                    {/* HOMEPAGE PLACEMENT */}
                    <div className="flex flex-wrap gap-2">
                      {book.featured && (
                        <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs">
                          ⭐ Featured
                        </span>
                      )}
                      {book.trending && (
                        <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs">
                          🔥 Trending
                        </span>
                      )}
                      {book.justArrived && (
                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs">
                          🆕 Just Arrived
                        </span>
                      )}

                      {book.bestSeller && (
                        <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs">
                          🔥 Best Seller
                        </span>
                      )}

                      {book.recommended && (
                        <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs">
                          ❤️ Recommended
                        </span>
                      )}

                      {book.deals && (
                        <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs">
                          💰 Deals
                        </span>
                      )}

                      {book.comingSoon && (
                        <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs">
                          🚀 Coming Soon
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(book)}
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition"
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(getBookId(book))}
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-700 transition font-bold"
                  >
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
