import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Privacy() {
  const sections = [
    {
      title: "1. Information We Collect",
      content:
        "We collect information you provide when creating an account, purchasing ebooks, contacting support, or subscribing to our services. This may include your name, email address, payment information, and account activity.",
    },
    {
      title: "2. How We Use Your Information",
      content:
        "Your information is used to process purchases, provide access to your digital library, improve our services, communicate important updates, and deliver customer support.",
    },
    {
      title: "3. Payment Security",
      content:
        "Payments are processed securely through trusted payment providers. UketBooks does not store your debit or credit card details on our servers.",
    },
    {
      title: "4. Cookies & Analytics",
      content:
        "We use cookies and analytics tools to understand how visitors use our platform, remember your preferences, and improve the overall user experience.",
    },
    {
      title: "5. Sharing Your Information",
      content:
        "We do not sell, rent, or trade your personal information. We only share information with trusted service providers when necessary to operate the platform or comply with legal obligations.",
    },
    {
      title: "6. Data Protection",
      content:
        "We implement industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
    },
    {
      title: "7. Your Rights",
      content:
        "You may request access to your personal information, update your account details, or request account deletion by contacting our support team.",
    },
    {
      title: "8. Children's Privacy",
      content:
        "UketBooks is not intended for children under the age of 13. We do not knowingly collect personal information from children.",
    },
    {
      title: "9. Policy Updates",
      content:
        "We may update this Privacy Policy from time to time. Any significant changes will be posted on this page with an updated effective date.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-6 border-b border-white/10">
        <div className="absolute -top-40 left-0 w-96 h-96 bg-yellow-400/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/10 blur-3xl rounded-full" />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-yellow-400 text-black px-5 py-2 rounded-full font-bold mb-6"
          >
            🔒 Your Privacy Matters
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black"
          >
            Privacy
            <span className="text-yellow-400"> Policy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto mt-8 text-lg text-gray-300 leading-8"
          >
            At UketBooks, we value your privacy and are committed to protecting
            your personal information. This policy explains what data we
            collect, how we use it, and the steps we take to keep it secure.
          </motion.p>
        </div>
      </section>

      {/* Trust Cards */}

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gray-900 border border-white/10 rounded-3xl p-6 text-center hover:border-yellow-400/40 transition">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="font-bold text-lg">Secure Data</h3>
            <p className="text-gray-400 text-sm mt-2">
              Your personal information is protected.
            </p>
          </div>

          <div className="bg-gray-900 border border-white/10 rounded-3xl p-6 text-center hover:border-yellow-400/40 transition">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="font-bold text-lg">Safe Payments</h3>
            <p className="text-gray-400 text-sm mt-2">
              Card information is handled securely.
            </p>
          </div>

          <div className="bg-gray-900 border border-white/10 rounded-3xl p-6 text-center hover:border-yellow-400/40 transition">
            <div className="text-4xl mb-4">👤</div>
            <h3 className="font-bold text-lg">Privacy First</h3>
            <p className="text-gray-400 text-sm mt-2">
              We never sell your personal data.
            </p>
          </div>

          <div className="bg-gray-900 border border-white/10 rounded-3xl p-6 text-center hover:border-yellow-400/40 transition">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="font-bold text-lg">Protected Platform</h3>
            <p className="text-gray-400 text-sm mt-2">
              Built with modern security practices.
            </p>
          </div>
        </div>
      </section>

      {/* Policy Sections */}

      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
              }}
              viewport={{ once: true }}
              className="bg-gray-900 border border-white/10 rounded-3xl p-8 hover:border-yellow-400/40 transition"
            >
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                {section.title}
              </h2>

              <p className="text-gray-300 leading-8">{section.content}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}

      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-3xl p-10 text-center text-black">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Questions About Your Privacy?
          </h2>

          <p className="max-w-2xl mx-auto text-black/80 leading-7 mb-8">
            If you have any questions about how your information is collected,
            stored, or protected, our support team is happy to help.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center bg-black text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"
          >
            Contact Support
          </Link>
        </div>
      </section>
    </main>
  );
}
