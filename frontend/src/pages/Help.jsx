import { motion } from "framer-motion";
import HelpCenter from "../components/HelpCenter";

export default function Help() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative overflow-hidden py-20 px-6 border-b border-white/10">
        {/* Background Glow */}
        <div className="absolute -top-40 left-0 w-96 h-96 bg-yellow-400/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/10 blur-3xl rounded-full" />
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-5 py-2 rounded-full bg-yellow-400 text-black font-bold mb-6"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 text-yellow px-4 py-2 rounded-full text-sm font-semibold">
              📚 UketBooks Help Center
            </div>
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl font-black leading-tight"
          >
            We're Here
            <span className="text-yellow-400"> to Help</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-8 max-w-3xl mx-auto text-lg text-gray-300 leading-8"
          >
            Find answers to common questions about purchasing books, downloads,
            payments, accounts, and using UketBooks. If you can't find what
            you're looking for, our support team is always ready to help.
          </motion.p>
        </div>
      </section>
      <section>
        <div className="grid grid-cols-4 md:grid-cols-4 gap-6 rounded-lg p-2">
          <div className="text-center">
            🔒
            <h3 className="font-bold mt-3">Secure Payments</h3>
          </div>
          <div className="text-center">
            ⚡<h3 className="font-bold mt-3">Instant Delivery</h3>
          </div>
          <div className="text-center">
            📚
            <h3 className="font-bold mt-3">Verified Books</h3>
          </div>
          <div className="text-center">
            ⭐<h3 className="font-bold mt-3">Trusted Platform</h3>
          </div>
        </div>
      </section>
      {/* HELP CONTENT */}
      <section className="px-6 py-0">
        <div className="max-w-5xl mx-auto">
          <HelpCenter />
        </div>
      </section>
    </main>
  );
}
