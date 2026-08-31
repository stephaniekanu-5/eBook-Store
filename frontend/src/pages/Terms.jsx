import { motion } from "framer-motion";

export default function Terms() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing or using UketBooks, you agree to comply with these Terms of Service. If you do not agree with any part of these terms, please discontinue using the platform.",
    },
    {
      title: "2. User Accounts",
      content:
        "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Please notify us immediately of any unauthorized use.",
    },
    {
      title: "3. Digital Products",
      content:
        "All ebooks sold on UketBooks are licensed for personal use only. Purchasing a book does not transfer ownership of its copyright or intellectual property.",
    },
    {
      title: "4. Payments",
      content:
        "Payments are processed securely through trusted payment providers. Prices may change without prior notice, but confirmed purchases will always retain the price paid at checkout.",
    },
    {
      title: "5. Refund Policy",
      content:
        "Refund requests are reviewed on a case-by-case basis for duplicate transactions, technical issues, or failed ebook deliveries. Due to the nature of digital products, refunds are generally limited.",
    },
    {
      title: "6. Prohibited Activities",
      content:
        "Users must not redistribute, reproduce, resell, share, modify, or illegally distribute purchased ebooks. Violations may result in account suspension or permanent termination.",
    },
    {
      title: "7. Intellectual Property",
      content:
        "All books, logos, graphics, trademarks, and platform content remain the property of their respective owners and are protected under applicable copyright laws.",
    },
    {
      title: "8. Limitation of Liability",
      content:
        "UketBooks shall not be liable for indirect, incidental, or consequential damages arising from the use of the platform or purchased digital products.",
    },
    {
      title: "9. Changes to These Terms",
      content:
        "We may update these Terms of Service periodically. Continued use of the platform after changes are published constitutes acceptance of the revised terms.",
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
            📜 Legal Information
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black"
          >
            Terms of
            <span className="text-yellow-400"> Service</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto mt-8 text-lg text-gray-300 leading-8"
          >
            These Terms of Service explain the rules, responsibilities, and
            conditions that govern your use of the UketBooks platform. Please
            read them carefully before purchasing or accessing any digital
            content.
          </motion.p>
        </div>
      </section>

      {/* Terms */}
      <section className="py-20 px-6">
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

      {/* Footer Notice */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-yellow-400 to-yellow-300 text-black rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-black mb-4">
            Questions About These Terms?
          </h2>

          <p className="max-w-2xl mx-auto mb-8 text-black/80 leading-7">
            If you need clarification about any part of our Terms of Service,
            our support team is happy to assist you.
          </p>

          <a
            href="/contact"
            className="inline-block bg-black text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"
          >
            Contact Support
          </a>
        </div>
      </section>
    </main>
  );
}
