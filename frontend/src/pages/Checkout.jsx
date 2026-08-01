import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  FaLock,
  FaTag,
  FaCreditCard,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

import { useCart } from "../context/CartContext";
import { usePurchases } from "../context/PurchaseContext";
import { useAuth } from "../context/AuthContext";

import { getBookId } from "../utils/bookIds";
import { verifyPayment } from "../services/paymentService";

import PaystackGateway from "../components/PaystackGateway";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { addPurchase } = usePurchases();
  const { user } = useAuth();
  const [loadingCoupon, setLoadingCoupon] =
    useState(false);
  const [couponInput, setCouponInput] =
    useState("");
  const [discount, setDiscount] =
    useState(0);
  const [couponApplied, setCouponApplied] =
    useState(false);
  const [couponMessage, setCouponMessage] =
    useState("");
 
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

  const finalAmount = Math.max(
    subtotal - discount,
    0
  );

  const totalBooks = useMemo(
    () =>
      cart.reduce(
        (sum, item) =>
          sum + Number(item.quantity || 1),
        0
      ),
    [cart]
  );

  const hasInvalidItems = cart.some(
    (item) => !item._id
  );

  // ----------------------------------------
  // FORMAT PRICE
  // ----------------------------------------

  const formatPrice = (price) =>
    Number(price).toLocaleString(
      "en-US",
      {
        style: "currency",
        currency: "USD",
      }
    );

  // ----------------------------------------
  // APPLY COUPON
  // ----------------------------------------

  const applyCoupon = () => {
    setLoadingCoupon(true);

    setTimeout(() => {
      const code =
        couponInput.trim().toUpperCase();

      if (code === "BOOK10") {
        setDiscount(subtotal * 0.1);

        setCouponApplied(true);

        setCouponMessage(
          "10% discount applied 🎉"
        );
      } else if (code === "BOOK20") {
        setDiscount(subtotal * 0.2);

        setCouponApplied(true);

        setCouponMessage(
          "20% discount applied 🎉"
        );
      } else {
        setDiscount(0);

        setCouponApplied(false);

        setCouponMessage(
          "Invalid coupon code."
        );
      }

      setLoadingCoupon(false);
    }, 700);
  };

  // ----------------------------------------
  // PAYMENT SUCCESS
  // ----------------------------------------

  const handleSuccess = async (
    response
  ) => {
    try {
      const reference =
        response?.reference ||
        response?.transaction
          ?.reference;

      if (!reference) return;

      const result =
        await verifyPayment({
          reference,
          cart,
        });

      if (result.success) {
        addPurchase(
          result.purchases?.length
            ? result.purchases
            : cart
        );

        clearCart();

        navigate("/success");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">

<section className="bg-gradient-to-b from-gray-900 to-black border border-white/10 rounded-3xl p-8 shadow-2xl">

  {/* HEADER */}

  <div className="flex items-center justify-between mb-8">

    <div>

      <h1 className="text-3xl font-black">
        Order Summary
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
<section className="bg-gradient-to-b from-gray-900 to-black border border-white/10 rounded-3xl p-8 shadow-2xl h-fit sticky top-8">

  {/* Header */}

  <div className="mb-8">

    <div className="flex items-center gap-3 mb-3">

      <div className="w-12 h-12 rounded-2xl bg-yellow-400 flex items-center justify-center">

        <FaCreditCard className="text-black text-xl"/>

      </div>

      <div>

        <h2 className="text-3xl font-black">
          Secure Payment
        </h2>

        <p className="text-gray-400">
          Complete your purchase safely.
        </p>

      </div>

    </div>

  </div>

  {/* Coupon */}

  <div className="bg-white/5 border border-white/10 rounded-3xl p-5 mb-8">

    <div className="flex items-center gap-2 mb-4">

      <FaTag className="text-yellow-400"/>

      <h3 className="font-bold">
        Discount Coupon
      </h3>

    </div>

    <div className="flex gap-3">

      <input
        value={couponInput}
        onChange={(e)=>setCouponInput(e.target.value)}
        placeholder="Enter coupon code"
        className="flex-1 rounded-2xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-yellow-400"
      />

      <button
        onClick={applyCoupon}
        disabled={loadingCoupon}
        className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 rounded-2xl transition disabled:opacity-60"
      >

        {loadingCoupon ? "..." : "Apply"}

      </button>

    </div>

    {couponMessage && (

      <div
        className={`mt-4 rounded-2xl p-3 text-sm font-semibold ${
          couponApplied
            ? "bg-green-500/10 border border-green-500/20 text-green-400"
            : "bg-red-500/10 border border-red-500/20 text-red-400"
        }`}
      >

        {couponMessage}

      </div>

    )}

  </div>

  {/* Payment Summary */}

  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8">

    <h3 className="font-bold text-xl mb-5">

      Payment Summary

    </h3>

    <div className="space-y-4">

      <div className="flex justify-between text-gray-400">

        <span>Books</span>

        <span>{totalBooks}</span>

      </div>

      <div className="flex justify-between text-gray-400">

        <span>Subtotal</span>

        <span>{formatPrice(subtotal)}</span>

      </div>

      {discount > 0 && (

        <div className="flex justify-between text-green-400">

          <span>Discount</span>

          <span>-{formatPrice(discount)}</span>

        </div>

      )}

      <hr className="border-white/10"/>

      <div className="flex justify-between items-center">

        <span className="text-xl font-bold">

          Total

        </span>

        <span className="text-4xl font-black text-yellow-400">

          {formatPrice(finalAmount)}

        </span>

      </div>

    </div>

  </div>

  {/* Paystack */}

  {hasInvalidItems ? (

    <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-center">

      <h3 className="text-red-400 font-bold text-lg">

        Some books are unavailable.

      </h3>

      <p className="text-gray-400 mt-2">

        Remove unavailable books before continuing.

      </p>

    </div>

  ) : (

    <PaystackGateway
      amount={finalAmount}
      email={user?.email || "guest@email.com"}
      cart={cart}
      metadata={{
        books: cart.map((book)=>book.title),
        totalBooks,
        subtotal,
        discount,
        finalAmount,
        coupon: couponInput,
        custom_fields:[
          {
            display_name:"Payment Type",
            variable_name:"payment_type",
            value:"ebook_purchase",
          },
        ],
      }}
      onSuccess={handleSuccess}
    />

  )}

  {/* Security */}

  <div className="mt-8 rounded-3xl bg-green-500/10 border border-green-500/20 p-5">

    <div className="flex items-center gap-3 mb-4">

      <FaLock className="text-green-400"/>

      <h3 className="font-bold">

        Protected Checkout

      </h3>

    </div>

    <div className="space-y-3 text-sm text-gray-300">

      <div className="flex items-center gap-2">

        ✅ SSL Encrypted Payment

      </div>

      <div className="flex items-center gap-2">

        ✅ Secure Paystack Gateway

      </div>

      <div className="flex items-center gap-2">

        ✅ Instant Ebook Delivery

      </div>

      <div className="flex items-center gap-2">

        ✅ No Hidden Charges

      </div>

      <div className="flex items-center gap-2">

        ✅ 100% Digital Purchase

      </div>

    </div>

  </div>

</section>
      </div>
      {/* WHY SHOP WITH US */}

<section className="max-w-6xl mx-auto mt-20">

  <div className="text-center mb-14">

    <span className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 px-5 py-2 rounded-full font-semibold">

      ⭐ Trusted by Digital Readers

    </span>

    <h2 className="text-4xl md:text-5xl font-black mt-6">

      Why Buy From UketBooks?

    </h2>

    <p className="text-gray-400 mt-4 max-w-3xl mx-auto text-lg">

      We make learning simple with secure payments, instant access,
      verified ebooks, and a seamless reading experience.

    </p>

  </div>

  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

    <div className="bg-gray-900 rounded-3xl border border-white/10 p-8 hover:border-yellow-400 transition">

      <div className="w-16 h-16 rounded-2xl bg-yellow-400 flex items-center justify-center mb-6">

        🔒

      </div>

      <h3 className="font-bold text-xl mb-3">

        Secure Payments

      </h3>

      <p className="text-gray-400 leading-relaxed">

        Every payment is securely processed through Paystack using encrypted
        transactions.

      </p>

    </div>

    <div className="bg-gray-900 rounded-3xl border border-white/10 p-8 hover:border-yellow-400 transition">

      <div className="w-16 h-16 rounded-2xl bg-yellow-400 flex items-center justify-center mb-6">

        ⚡

      </div>

      <h3 className="font-bold text-xl mb-3">

        Instant Delivery

      </h3>

      <p className="text-gray-400 leading-relaxed">

        Purchased ebooks become available immediately after successful payment.

      </p>

    </div>

    <div className="bg-gray-900 rounded-3xl border border-white/10 p-8 hover:border-yellow-400 transition">

      <div className="w-16 h-16 rounded-2xl bg-yellow-400 flex items-center justify-center mb-6">

        📚

      </div>

      <h3 className="font-bold text-xl mb-3">

        Premium Collection

      </h3>

      <p className="text-gray-400 leading-relaxed">

        Carefully selected books for developers, students, entrepreneurs,
        and lifelong learners.

      </p>

    </div>

    <div className="bg-gray-900 rounded-3xl border border-white/10 p-8 hover:border-yellow-400 transition">

      <div className="w-16 h-16 rounded-2xl bg-yellow-400 flex items-center justify-center mb-6">

        ❤️

      </div>

      <h3 className="font-bold text-xl mb-3">

        Trusted Support

      </h3>

      <p className="text-gray-400 leading-relaxed">

        Our support team is always ready to help with payments, downloads,
        and account issues.

      </p>

    </div>

  </div>

</section>
{/* RECOMMENDED BOOKS */}

{/* <section className="max-w-6xl mx-auto mt-20">

  <div className="flex items-center justify-between mb-10">

    <div>

      <h2 className="text-4xl font-black">

        You may also like

      </h2>

      <p className="text-gray-400 mt-2">

        Readers who bought these books also enjoyed these.

      </p>

    </div>

  </div>

  <BookSections
    title=""
    books={cart.slice(0,4)}
  />

</section> */}
    </main>
  );
}