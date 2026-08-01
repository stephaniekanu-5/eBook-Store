import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("uketbooks-cookie-consent");

    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem(
      "uketbooks-cookie-consent",
      JSON.stringify({
        accepted: true,
        analytics: true,
        marketing: true,
      })
    );

    setVisible(false);
  };

  const necessaryOnly = () => {
    localStorage.setItem(
      "uketbooks-cookie-consent",
      JSON.stringify({
        accepted: true,
        analytics: false,
        marketing: false,
      })
    );

    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[95%] max-w-5xl">
      <div className="bg-gray-900 border border-yellow-400/30 rounded-3xl shadow-2xl p-6 backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            {/* <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🍪</span>
              <h2 className="text-2xl font-black text-yellow-400">
                We use Cookies
              </h2>
            </div> */}
            <p className="text-gray-300 leading-7">
              UketBooks uses cookies to keep you signed in, remember your preferences, improve performance,
              and understand how our platform is used. You can read more in our{" "}
              <Link
                to="/cookies"
                className="text-yellow-400 hover:underline font-semibold"
              >
                Cookies Policy
              </Link>.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={necessaryOnly}
              className="px-6 py-3 rounded-2xl border border-white/20 hover:border-yellow-400 transition"
            >
              Necessary Only
            </button>
            <button
              onClick={acceptAll}
              className="px-6 py-3 rounded-2xl bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}