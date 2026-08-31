import { Link } from "react-router-dom";
import { useState } from "react";

export default function HelpCenter() {
  const faqs = [
    {
      question: "How do I access purchased ebooks?",
      answer:
        "After successful payment, your ebooks become instantly available in your library dashboard.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept Paystack card payments, bank transfers, and multiple debit/credit card types.",
    },
    {
      question: "Can I download ebooks offline?",
      answer:
        "Yes. Purchased ebooks can be downloaded for offline reading depending on the publisher permissions.",
    },
    {
      question: "I paid but didn’t receive my ebook",
      answer:
        "Please contact support with your payment reference and registered email address for instant assistance.",
    },
    {
      question: "How do refunds work?",
      answer:
        "Refunds are reviewed on a case-by-case basis for duplicate payments or failed ebook deliveries.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can reach support through the contact form or official support email listed below.",
    },
  ];
  const [search, setSearch] = useState("");

  const filteredFaqs = faqs.filter((faq) => {
    const q = search.toLowerCase();

    return (
      faq.question.toLowerCase().includes(q) ||
      faq.answer.toLowerCase().includes(q)
    );
  });
  return (
    <main className="min-h-screen bg-black text-white px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* HERO */}
        <section className="text-center space-y-4">
          <h1 className="text-2xl md:text-4xl font-black leading-tight">
            How can we help you today?
          </h1>
        </section>

        {/* HELP CATEGORIES */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              title: "Payments",
              icon: "💳",
              desc: "Card payments, Paystack, billing and receipts.",
            },
            {
              title: "My Library",
              icon: "📚",
              desc: "Access, download and manage purchased ebooks.",
            },
            {
              title: "Account",
              icon: "👤",
              desc: "Login, registration, passwords and profiles.",
            },
            {
              title: "Technical Support",
              icon: "🛠️",
              desc: "Fix issues, broken downloads and app errors.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-gray-900 border border-white/10 rounded-3xl p-6 hover:border-yellow-400/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{item.icon}</div>

              <h3 className="text-xl font-bold mb-2">{item.title}</h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </section>
        {/* SEARCH */}
        <section className="max-w-2xl mx-auto">
          <div className="bg-gray-900 border border-white/10 rounded-3xl p-3 flex items-center gap-3 shadow-2xl">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search help articles..."
              className="w-full bg-transparent outline-none px-3 py-3 text-white placeholder:text-gray-500"
            />
            <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-3 rounded-2xl transition-all duration-300">
              Search
            </button>
          </div>
        </section>
        {/* FAQ */}
        <section className="bg-gray-900 border border-white/10 rounded-3xl p-6 md:p-10 shadow-xl">
          <div className="mb-8">
            <h2 className="text-3xl font-black mb-2">Related Questions</h2>

            <p className="text-gray-400">
              Quick answers to the most common customer questions.
            </p>
          </div>

          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-black/40 border border-white/10 rounded-2xl p-5"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-lg">
                    {faq.question}

                    <span className="group-open:rotate-45 transition-transform duration-300 text-yellow-400 text-2xl">
                      +
                    </span>
                  </summary>

                  <p className="text-gray-400 mt-4 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))
            ) : (
              <div className="text-center py-10 text-gray-500">
                No help articles found.
              </div>
            )}
          </div>
        </section>
        <section>
          <h3 className="font-bold mb-4">Popular Topics</h3>
          <div className="flex flex-wrap gap-3">
            {[
              "Payment Issues",
              "Download Books",
              "My Library",
              "Refund",
              "Reset Password",
              "Reading Offline",
              "Invoices",
              "Account Verification",
            ].map((topic) => (
              <button
                key={topic}
                className="px-5 py-2 rounded-full bg-gray-900 border border-white/10 hover:border-yellow-400 hover:bg-yellow-400 hover:text-black transition"
              >
                {topic}
              </button>
            ))}
          </div>
        </section>
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-black">Popular Articles</h2>
            <Link to="/contact" className="text-yellow-400 hover:underline">
              View All
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                title: "How to Download Purchased Books",
                read: "3 min read",
              },
              {
                title: "Resetting Your Password",
                read: "2 min read",
              },
              {
                title: "Requesting a Refund",
                read: "4 min read",
              },
              {
                title: "Payment Failed? Here's What To Do",
                read: "5 min read",
              },
            ].map((article) => (
              <div
                key={article.title}
                className="bg-gray-900 border border-white/10 rounded-3xl p-6 hover:border-yellow-400 transition"
              >
                <h3 className="text-xl font-bold">{article.title}</h3>
                <p className="text-gray-500 mt-3">{article.read}</p>
              </div>
            ))}
          </div>
        </section>
        {/* CONTACT SUPPORT */}
        <section className="grid lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-300 text-black rounded-3xl p-8 shadow-2xl">
            <div className="text-5xl mb-5">🎧</div>

            <h2 className="text-3xl font-black mb-3">Need More Help?</h2>

            <p className="mb-6 text-black/80 leading-relaxed">
              Our support team is available to help with payments, downloads,
              ebook access, technical issues, and account recovery your library,
              or any questions about UketBooks.
            </p>

            <button
              onClick={() =>
                (window.location.href = "mailto:uketbooks@gmail.com")
              }
              className="bg-black text-white px-6 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300"
            >
              Email Support
            </button>
          </div>

          <div className="bg-gray-900 border border-white/10 rounded-3xl p-8 space-y-5">
            <div>
              <h3 className="text-xl font-bold mb-1">📧 Support Email</h3>

              <p className="text-gray-400">uketbooks@gmail.com</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-1">🕒 Response Time</h3>

              <p className="text-gray-400">within 24 hours.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-1">🌍 Support Hours</h3>

              <p className="text-gray-400">Monday - Saturday · 8AM - 6PM</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">💬 Live Chat</h3>
              <p className="text-gray-400">
                For faster resolution, include your payment reference and
                registered email when contacting support.
              </p>
            </div>
            <div className="bg-gray-900 border border-white/10 rounded-2xl p-4 text-sm text-gray-400 leading-relaxed">
              Coming Soon: Live chat support for instant assistance.
            </div>
            <Link
              to="/contact"
              className="text-yellow-400 font-bold hover:underline border border-yellow-400/30 px-4 py-2 rounded-xl transition-all duration-300 inline-block"
            >
              contact support
            </Link>
          </div>
        </section>
        <section className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div className="bg-gray-900 rounded-3xl p-6 border border-white/10">
            <h2 className="text-3xl font-black text-yellow-400">500+</h2>
            <p className="text-gray-400 mt-2">eBooks</p>
          </div>
          <div className="bg-gray-900 rounded-3xl p-6 border border-white/10">
            <h2 className="text-3xl font-black text-yellow-400">1000+</h2>
            <p className="text-gray-400 mt-2">Readers</p>
          </div>
          <div className="bg-gray-900 rounded-3xl p-6 border border-white/10">
            <h2 className="text-3xl font-black text-yellow-400">24h</h2>
            <p className="text-gray-400 mt-2">Support Response</p>
          </div>
          <div className="bg-gray-900 rounded-3xl p-6 border border-white/10">
            <h2 className="text-3xl font-black text-yellow-400">99%</h2>
            <p className="text-gray-400 mt-2">Satisfaction</p>
          </div>
        </section>
      </div>
    </main>
  );
}
