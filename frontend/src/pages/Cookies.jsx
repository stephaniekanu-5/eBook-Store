import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Cookies() {
  const sections = [
    {
      title: "1. What Are Cookies?",
      content:
        "Cookies are small text files stored on your device when you visit UketBooks. They help us remember your preferences, improve your experience, and make the platform function properly.",
    },
    {
      title: "2. Essential Cookies",
      content:
        "Essential cookies are required for core features such as logging into your account, accessing your library, maintaining your shopping cart, and securing your session.",
    },
    {
      title: "3. Performance Cookies",
      content:
        "Performance cookies help us understand how visitors interact with UketBooks so we can improve website speed, navigation, and overall user experience.",
    },
    {
      title: "4. Functional Cookies",
      content:
        "These cookies remember your preferences, such as language settings, recently viewed books, and other personalization features.",
    },
    {
      title: "5. Analytics Cookies",
      content:
        "We may use trusted analytics services to understand visitor behavior, popular pages, and overall platform performance. These cookies never identify you personally.",
    },
    {
      title: "6. Advertising Cookies",
      content:
        "If we run advertising campaigns in the future, these cookies may be used to measure campaign performance and display more relevant content.",
    },
    {
      title: "7. Managing Cookies",
      content:
        "You can control or delete cookies through your browser settings. Disabling certain cookies may affect the functionality of some features on UketBooks.",
    },
    {
      title: "8. Updates",
      content:
        "We may update this Cookies Policy as our platform evolves. Any changes will be published on this page with an updated revision date.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Hero */}
      <section className="relative overflow-hidden py-2 px-6 border-b border-white/10">

        <div className="absolute -top-40 left-0 w-96 h-96 bg-yellow-400/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/10 blur-3xl rounded-full" />

        <div className="relative max-w-5xl mx-auto text-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-yellow-400 text-black px-5 py-2 rounded-full font-bold mb-6"
          >
            🍪Uketbooks Cookies Policy
          </motion.div>

           {/* <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black"
          >
            Cookie
            <span className="text-yellow-400"> Policy</span>
          </motion.h1> */}

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto mt-4 text-lg text-gray-300 leading-8"
          >
            This page explains how UketBooks uses cookies to improve your
            browsing experience, remember your preferences, and keep your
            account secure.
          </motion.p>

        </div>

      </section>

      {/* Cookie Types */}

      <section className="py-16 px-6">

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">

          <div className="bg-gray-900 border border-white/10 rounded-3xl p-6 text-center hover:border-yellow-400/40 transition">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="font-bold">Essential</h3>
            <p className="text-gray-400 text-sm mt-2">
              Required for login and security.
            </p>
          </div>

          <div className="bg-gray-900 border border-white/10 rounded-3xl p-6 text-center hover:border-yellow-400/40 transition">
            <div className="text-4xl mb-4">⚙️</div>
            <h3 className="font-bold">Functional</h3>
            <p className="text-gray-400 text-sm mt-2">
              Saves your preferences.
            </p>
          </div>

          <div className="bg-gray-900 border border-white/10 rounded-3xl p-6 text-center hover:border-yellow-400/40 transition">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="font-bold">Analytics</h3>
            <p className="text-gray-400 text-sm mt-2">
              Helps improve our platform.
            </p>
          </div>

          <div className="bg-gray-900 border border-white/10 rounded-3xl p-6 text-center hover:border-yellow-400/40 transition">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="font-bold">Advertising</h3>
            <p className="text-gray-400 text-sm mt-2">
              Used only if advertising is enabled.
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

              <p className="text-gray-300 leading-8">
                {section.content}
              </p>

            </motion.div>

          ))}

        </div>

      </section>

      {/* CTA */}

      <section className="px-6 pb-20">

        <div className="max-w-5xl mx-auto bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-3xl p-10 text-center text-black">

          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Questions About Cookies?
          </h2>

          <p className="max-w-2xl mx-auto mb-8 text-black/80 leading-7">
            If you have questions about how cookies are used on UketBooks,
            we're happy to help explain our practices.
          </p>

          <Link
            to="/contact"
            className="inline-block bg-black text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"
          >
            Contact Support
          </Link>

        </div>

      </section>

    </main>
  );
}