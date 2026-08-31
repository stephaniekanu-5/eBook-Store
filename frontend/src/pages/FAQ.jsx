const faqs = [
  {
    q: "How do I buy books?",
    a: "Add books to cart and proceed to checkout.",
  },

  {
    q: "Do I receive physical books?",
    a: "No. All books are digital downloads.",
  },

  {
    q: "Can I read on mobile?",
    a: "Yes. Books are accessible on all devices.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept all major credit cards and PayPal.",
  },
  {
    q: "Is there a return policy?",
    a: "Due to the digital nature, we do not offer returns. Contact support for issues.",
  },
  {
    q: "How do I contact support?",
    a: "You can contact our support team through the 'Help' section in your account or via email at support@uketbooks.net.",
  },
  {
    q: "Are there any discounts or promotions?",
    a: "We offer seasonal promotions and discounts. Sign up for our newsletter to stay updated on the latest offers.",
  },
];

export default function FAQ() {
  return (
    <main
      className="
        min-h-screen
        px-6
        py-20
      "
    >
      <div
        className="
          max-w-4xl
          mx-auto
        "
      >
        <h1
          className="
            text-5xl
            font-black
            mb-10
          "
        >
          Frequently Asked Questions
        </h1>

        <div
          className="
            space-y-5
          "
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="
                  p-6
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                "
            >
              <h2
                className="
                    text-xl
                    font-bold
                    mb-2
                  "
              >
                {faq.q}
              </h2>

              <p className="text-gray-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <p className="text-gray-400 mb-4">
          Still have more questions? Our support team is here to help!
        </p>
        <a
          href="mailto:uketbooks@gmail.com"
          className="text-purple-500 hover:text-purple-400 underline"
        >
          Contact Support
        </a>
      </div>
    </main>
  );
}
