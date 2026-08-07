import { useContext, useMemo, useState } from "react";
import { FaLock, FaTag, FaCreditCard, FaShieldAlt, FaCheckCircle,} from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { getBookId,} from "../utils/bookIds";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    totalItems,
  } = useContext(CartContext);
const navigate = useNavigate();
const [discount, setDiscount] = useState(0);
const hasInvalidItems = cart.some(
  (item) => !item._id
);
const subtotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) =>
          sum +
          Number(item.price || 0) *
            Number(item.quantity || 1),
        0
      ),
    [cart]
  );
  const finalAmount = Math.max( subtotal - discount, 0 );

const totalBooks = useMemo(
    () =>
      cart.reduce(
        (sum, item) =>
          sum + Number(item.quantity || 1),
        0
      ),
    [cart]
  );
const formatPrice = (price) =>
  Number(price).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">        
      <section className="bg-gradient-to-b from-gray-900 to-black border border-white/10 rounded-3xl p-8 shadow-2xl">
      
        {/* HEADER */}
      
        <div className="flex items-center justify-between mb-8">
      
          <div>
      
            <h1 className="text-3xl font-black">
              Cart Summary
            </h1>
      
            <p className="text-gray-400 mt-2">
              Review your purchase before completing payment.
            </p>
      
          </div>
      
          <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-2xl px-5 py-3 text-center">
      
            <p className="text-xs uppercase tracking-wider text-gray-400">
              Books
            </p>
      
            <p className="text-2xl font-black text-yellow-400">
              {totalBooks}
            </p>
      
          </div>
      
        </div>
      
        {/* EMPTY CART */}
      
        {cart.length === 0 ? (
      
          <div className="rounded-3xl bg-gray-800/60 border border-white/10 py-20 text-center">
      
            <div className="text-7xl mb-6">
              📚
            </div>
      
            <h2 className="text-2xl font-bold">
              Your cart is empty
            </h2>
      
            <p className="text-gray-400 mt-3 max-w-sm mx-auto">
              Browse our library and add amazing ebooks to begin your learning journey.
            </p>
      
            <button
              onClick={() => navigate("/books")}
              className="mt-8 bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-4 rounded-2xl transition"
            >
              Browse Books
            </button>
          </div>
        ) : (
          <>
            {/* BOOKS */}
            <div className="space-y-5 max-h-[520px] overflow-y-auto pr-2">
              {cart.map((item, index) => (
                <div
                  key={getBookId(item) || index}
                  className="bg-white/5 border border-white/10 rounded-3xl p-4 hover:border-yellow-400/40 transition"
                >
                  <div className="flex gap-5">
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="w-24 h-32 rounded-2xl object-cover shadow-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-bold text-lg line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-400 mt-1">
                            {item.author}
                          </p>
                        </div>
                        <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-2 rounded-xl h-fit">
                          x{item.quantity}
                        </span>
                      </div>
                      
                      <div className="mt-5 flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">
                            Unit Price
                          </p>
                          <p className="text-yellow-400 font-bold">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <button
                            onClick={() => decreaseQuantity(getBookId(item))}
                            className="w-9 h-9 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
                            aria-label={`Decrease ${item.title} quantity`}
                          >
                            -
                          </button>

                          <span className="min-w-6 text-center font-bold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQuantity(getBookId(item))}
                            className="w-9 h-9 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
                            aria-label={`Increase ${item.title} quantity`}
                          >
                            +
                          </button>

                          <button
                            onClick={() => removeFromCart(getBookId(item))}
                            className="text-red-400 hover:text-red-300 transition border border-red-400 hover:border-red-300 px-3 py-1 rounded-lg text-sm"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            Total
                          </p>
                          <p className="text-xl font-black">
                            {formatPrice(
                              item.price * item.quantity
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* PRICE SUMMARY */}
            <div className="border-t border-white/10 mt-8 pt-8 space-y-5">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>
                  {formatPrice(subtotal)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-400 font-semibold">
                  <span>
                    Discount
                  </span>
                  <span>
                    -{formatPrice(discount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center pt-5 border-t border-white/10">
                <span className="text-xl font-bold">
                  Total
                </span>
                <span className="text-4xl font-black text-yellow-400">
                  {formatPrice(finalAmount)}
                </span>
              </div>
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="mt-4 w-full bg-gray-800 hover:bg-gray-700 transition py-3 rounded-xl font-semibold"
                >
                  Clear Cart ({totalItems} items)
                </button>
              )}
              {cart.length > 0 && (
                <button
                  onClick={() => navigate("/checkout")}
                  className="mt-4 w-full bg-purple-600 hover:bg-purple-700 transition py-3 rounded-xl font-semibold"
                >
                  Proceed to Checkout
                </button>
              )}
            </div>
            {/* TRUST */}
            <div className="mt-8 bg-green-500/10 border border-green-500/20 rounded-3xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <FaShieldAlt className="text-green-400 text-2xl" />
                <h3 className="font-bold">
                  Secure Checkout
                </h3>
              </div>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-400" />
                  SSL Encrypted Payment
                </div>
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-400" />
                  Instant Ebook Delivery
                </div>
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-400" />
                  Verified Digital Products
                </div>
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-400" />
                  Secure Paystack Processing
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
