import { motion } from "framer-motion";

export default function HelpCenter() {
  const categories = [
    { title: "Getting Started", desc: "Learn how to begin your journey", color: "from-blue-100 to-blue-50" },
    { title: "Account & Profile", desc: "Manage your account settings", color: "from-purple-100 to-purple-50" },
    { title: "Courses & Learning", desc: "Access and track your courses", color: "from-green-100 to-green-50" },
    { title: "Payments", desc: "Billing and subscription help", color: "from-yellow-100 to-yellow-50" },
    { title: "Technical Issues", desc: "Fix bugs and errors", color: "from-red-100 to-red-50" },
    { title: "Instructor Support", desc: "Help for instructors", color: "from-pink-100 to-pink-50" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      {/* Hero */}
      <div className="text-center py-20 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold"
        >
          Help Center
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-white/90"
        >
          How can we help you today?
        </motion.p>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 max-w-xl mx-auto flex bg-white rounded-2xl overflow-hidden shadow-lg"
        >
          <input
            type="text"
            placeholder="Search help articles..."
            className="flex-1 px-4 py-3 outline-none"
          />
          <button className="bg-blue-600 text-white px-6 hover:bg-blue-700 transition">
            Search
          </button>
        </motion.div>
      </div>

      {/* Categories */}
      <div className="px-6 pb-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 -mt-12">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className={`p-6 rounded-2xl shadow-md border cursor-pointer bg-gradient-to-br ${cat.color}`}
          >
            <h3 className="text-xl font-semibold">{cat.title}</h3>
            <p className="text-gray-700 mt-2 text-sm">{cat.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Popular Articles */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-6">Popular Articles</h2>

        <div className="space-y-4">
          {["How to reset password?", "How to enroll in a course?", "Payment failed issue", "How to contact instructor?"].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 10 }}
              className="p-4 bg-white rounded-xl border shadow-sm cursor-pointer hover:shadow-md transition"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="text-center pb-20">
        <h2 className="text-2xl font-bold">Still need help?</h2>
        <p className="text-gray-500 mt-2">Contact our support team</p>

        <button className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700">
          Contact Support
        </button>
      </div>
    </div>
  );
}
