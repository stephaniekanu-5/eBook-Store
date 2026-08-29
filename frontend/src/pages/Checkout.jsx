import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { FaLock, FaTag, FaCreditCard, FaShieldAlt, FaCheckCircle,} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { usePurchases } from "../context/PurchaseContext";
import { useAuth } from "../context/AuthContext";
import { getBookId } from "../utils/bookIds";
import { verifyPayment } from "../services/paymentService";
import PaystackGateway from "../components/PaystackGateway";
import FeaturedTitle from "../components/FeaturedTitles";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { addPurchase } = usePurchases();
  const { user } = useAuth();
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");
  
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
      <div className="bg-gradient-to-b from-gray-900 to-black border border-white/10 rounded-3xl p-8 shadow-2xl">
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

    <div className="flex gap-2 items-center">

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

<section className="max-w-6xl mx-auto mt-20">

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

  <FeaturedTitle
    title=""
    books={cart.slice(0,4)}
  />

</section>
    </main>
  );
}