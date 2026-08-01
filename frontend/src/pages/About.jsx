import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaBolt,
  FaGlobe,
  FaLock,
  FaLaptop,
  FaUsers,
  FaLightbulb,
  FaGraduationCap,
  FaBriefcase,
  FaHeart,
  FaMoneyBillWave,
  FaRocket,
  FaCheckCircle,
} from "react-icons/fa";

export default function About() {
  const features = [
    {
      icon: <FaBookOpen size={28} />,
      title: "Digital Library",
      text: "Discover premium ebooks across business, technology, health, education, relationships and more.",
    },
    {
      icon: <FaBolt size={28} />,
      title: "Instant Access",
      text: "Purchase once and download immediately without waiting.",
    },
    {
      icon: <FaLock size={28} />,
      title: "Secure Payments",
      text: "Safe and secure checkout with trusted payment providers.",
    },
    {
      icon: <FaGlobe size={28} />,
      title: "Anywhere, Anytime",
      text: "Read from your phone, tablet or computer wherever you are.",
    },
    {
      icon: <FaLaptop size={28} />,
      title: "Modern Platform",
      text: "Fast, responsive and optimized for the best reading experience.",
    },
    {
      icon: <FaUsers size={28} />,
      title: "Growing Community",
      text: "Join thousands of readers investing in their personal growth.",
    },
  ];

  const categories = [
    {
      icon: <FaBriefcase />,
      name: "Business",
    },
    {
      icon: <FaMoneyBillWave />,
      name: "Finance",
    },
    {
      icon: <FaLaptop />,
      name: "Technology",
    },
    {
      icon: <FaHeart />,
      name: "Relationships",
    },
    {
      icon: <FaGraduationCap />,
      name: "Education",
    },
    {
      icon: <FaLightbulb />,
      name: "Self Development",
    },
  ];

  const stats = [
    {
      value: "500+",
      label: "Books",
    },
    {
      value: "20+",
      label: "Categories",
    },
    {
      value: "24/7",
      label: "Access",
    },
    {
      value: "100%",
      label: "Digital",
    },
  ];

  return (
    <main className="bg-black text-white">

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-purple-500/10" />

        <div className="max-w-7xl mx-auto px-6 py-24 relative">

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <span className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold">
              Welcome to UketBooks
            </span>

            <h1 className="text-5xl md:text-7xl font-black mt-8 leading-tight">
              Empowering Readers Through
              <span className="text-yellow-400">
                {" "}
                Digital Knowledge
              </span>
            </h1>

            <p className="text-gray-400 text-xl mt-8 leading-relaxed">
              UketBooks is a modern digital bookstore built to help readers,
              students, entrepreneurs, developers and professionals access
              quality knowledge instantly from anywhere in the world.
            </p>

            <button
              className="mt-10 bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 rounded-2xl font-bold transition"
            >
              Browse Library
            </button>

          </motion.div>

        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          <motion.img
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80"
            className="rounded-3xl shadow-2xl"
          />

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-yellow-400 mb-6">
              Who We Are
            </h2>

            <p className="text-gray-400 leading-8">
              At UketBooks, we believe that one great book can change a life.
              Our platform was created to make high-quality digital books
              accessible, affordable and available instantly to readers across
              the globe.
            </p>

            <p className="text-gray-400 leading-8 mt-6">
              Whether you're building a business, learning programming,
              improving your finances, strengthening relationships or investing
              in personal development, our growing collection has something for
              everyone.
            </p>
          </motion.div>

        </div>
      </section>

      {/* FEATURES */}

      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-black text-center text-yellow-400 mb-14">
            Why Choose UketBooks?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="bg-gray-900 border border-white/10 rounded-3xl p-8"
              >
                <div className="text-yellow-400 mb-6">
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-400">
                  {feature.text}
                </p>
              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* MISSION */}

      <section className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">

          <FaRocket
            size={60}
            className="mx-auto text-yellow-400 mb-8"
          />

          <h2 className="text-5xl font-black mb-8">
            Our Mission
          </h2>

          <p className="text-2xl text-gray-400 leading-relaxed">
            To make knowledge accessible to everyone through a trusted digital
            bookstore that inspires learning, innovation and lifelong growth.
          </p>

        </div>
      </section>

      {/* CATEGORIES */}

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-black text-center text-yellow-400 mb-12">
            Explore Popular Categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">

            {categories.map((category, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900 rounded-3xl p-8 text-center border border-white/10"
              >
                <div className="text-yellow-400 text-4xl mb-4 flex justify-center">
                  {category.icon}
                </div>

                <h3 className="font-bold text-sm md:text-xl">
                  {category.name}
                </h3>
              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}

      <section className="py-20 bg-white/[0.02] px-6">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl font-black text-center text-yellow-400 mb-14">
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-8">

            {[
              "Browse Books",
              "Purchase Securely",
              "Download Instantly",
              "Read Anywhere",
            ].map((step, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                className="bg-gray-900 rounded-3xl p-8 text-center border border-white/10"
              >
                <FaCheckCircle
                  className="text-yellow-400 mx-auto mb-5"
                  size={35}
                />

                <h3 className="font-bold text-xl">
                  {step}
                </h3>
              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* STATS */}

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">

          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.05,
              }}
              className="text-center"
            >
              <h2 className="text-5xl font-black text-yellow-400">
                {stat.value}
              </h2>

              <p className="text-gray-400 mt-3">
                {stat.label}
              </p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* CTA */}

      <section className="py-24 px-6 text-center border-t border-white/10">

        <h2 className="text-5xl font-black mb-6">
          Start Your Learning Journey Today
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Discover books that inspire, educate and transform your future.
          Your next great idea could be one book away.
        </p>

        <button className="mt-10 bg-yellow-400 hover:bg-yellow-300 text-black px-10 py-4 rounded-2xl font-bold transition">
          Explore Books
        </button>

      </section>

    </main>
  );
}