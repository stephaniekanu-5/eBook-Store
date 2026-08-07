import { useState } from "react";
import { PaystackButton } from "react-paystack";
import { FaLock } from "react-icons/fa";
import { verifyPayment } from "../services/paymentService";

export default function PaystackGateway({
  amount = 0,
  email = "guest@email.com",
  metadata = {},
  cart = [],
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const publicKey = import.meta.env.VITE_PAYSTACK_KEY;
  const formatUSD = (amount) =>
  Number(amount || 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  const paystackAmount = Number(amount) * 100;
  
  if (!amount || amount <= 0) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-center text-red-400">
        Invalid payment amount
      </div>
    );
  }

  if (!publicKey) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-center text-red-400">
        Paystack public key missing
      </div>
    );
  }

  const config = {
    reference: `UKET-${Date.now()}`,
    email,
    amount: Math.round(amount * 100),
    currency: "USD",
    publicKey,
    // channels: [
    //   "card",
    // ],
    text: loading
      ? "Processing..."
      : `Pay ${formatUSD(amount)}`,

    onSuccess: async (reference) => {
      try {
        setLoading(true);

        const paymentReference =
          reference?.reference || reference?.trxref || reference;

        const response = await verifyPayment({
          reference: paymentReference,
          cart,
        });

        if (response?.success) {
          localStorage.setItem(
            "uketbooks-last-payment",
            JSON.stringify(reference)
          );

          onSuccess?.(response);
        } else {
          throw new Error("Payment verification failed");
        }
      } catch (error) {
        console.error("Payment Error:", error);

        alert(
          error?.response?.data?.message ||
            error.message ||
            "Payment verification failed"
        );
      } finally {
        setLoading(false);
      }
    },

    onClose: () => {
      setLoading(false);
      console.log("Payment popup closed");
    },

    onLoad: () => {
      console.log("Paystack loaded");
    },
  };

  return (
    <div className="space-y-6">
      {/* INFO CARD */}
      <div className="rounded-3xl border border-white/10 bg-gray-800 p-5">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 text-black">
            <FaLock />
          </div>

          <div>
            <h3 className="text-lg font-bold">
              Secure Payment with Paystack
            </h3>
            <p className="text-sm text-gray-400">
              Instant ebook access after payment
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-between text-sm text-gray-400">
          <span>Email</span>
          <span className="text-white">{email}</span>
        </div>

        <div className="mt-2 flex justify-between text-sm text-gray-400">
          <span>Total</span>
          <span className="font-bold text-yellow-400">
            {formatUSD(amount)}
          </span>
        </div>
      </div>

      {/* BUTTON */}
      <PaystackButton
        {...config}
        disabled={loading}
        className={`
          w-full rounded-2xl py-4 font-bold transition-all duration-300
          ${
            loading
              ? "cursor-not-allowed bg-gray-500 text-white"
              : "bg-yellow-400 text-black shadow-lg hover:scale-[1.02] hover:bg-yellow-300"
          }
        `}
      />

      {/* TRUST BADGES */}
      <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-500">
        <span>🔒 Secure Checkout</span>
        <span>⚡ Instant Downloads</span>
        <span>📚 Digital Access</span>
      </div>
    </div>
  );
}