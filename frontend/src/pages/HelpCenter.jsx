import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HelpCenter() {
  const navigate = useNavigate();
  const categories = [
    { title: "Getting Started",slug: "getting-started" ,   desc: "Learn how to begin your journey", color: "from-blue-100 to-blue-50" },
    { title: "Account & Profile", slug: "account-profile", desc: "Manage your account settings", color: "from-purple-100 to-purple-50" },
    { title: "Courses & Learning", slug: "courses", desc: "Access and track your courses", color: "from-green-100 to-green-50" },
    { title: "Payments",slug: "payments", desc: "Billing and subscription help", color: "from-yellow-100 to-yellow-50" },
    { title: "Technical Issues", slug: "technical" ,desc: "Fix bugs and errors", color: "from-red-100 to-red-50" },
    { title: "Instructor Support",slug: "instructor",  desc: "Help for instructors", color: "from-pink-100 to-pink-50" },
  ];

  const [openIndex, setOpenIndex] = useState(null);

const popularArticles = [
  {
    q: "How to reset password?",
    a: (
      <>
        <p className="mb-2">
          If you have forgotten your password, you can easily reset it by following these steps:
        </p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Go to the Login page.</li>
          <li>Click on the <b>“Forgot Password?”</b> link.</li>
          <li>Enter your registered email address.</li>
          <li>Check your email inbox for the reset link.</li>
          <li>Click the link and set a new password.</li>
          <li>Login again using your new password.</li>
        </ol>
      </>
    )
  },
  {
    q: "How to enroll in a course?",
    a: (
      <>
        <p className="mb-2">
          Enrolling in a course is simple. Just follow these steps:
        </p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Browse or search for a course from the homepage.</li>
          <li>Click on the course you want to view details.</li>
          <li>Press the <b>“Enroll”</b> button.</li>
          <li>If the course is paid, complete the payment process.</li>
          <li>After enrollment, go to your dashboard.</li>
          <li>Start learning anytime at your own pace.</li>
        </ol>
      </>
    )
  },
  {
    q: "Payment failed issue",
    a: (
      <>
        <p className="mb-2">
          If your payment fails, try the following steps to resolve the issue:
        </p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Check your internet connection.</li>
          <li>Verify your card or payment details.</li>
          <li>Ensure sufficient balance in your account.</li>
          <li>Try using another payment method (UPI, card, etc.).</li>
          <li>Wait a few minutes and try again.</li>
          <li>If amount is deducted, contact support with transaction ID.</li>
        </ol>
      </>
    )
  },
  {
    q: "How to contact instructor?",
    a: (
      <>
        <p className="mb-2">
          You can reach out to the instructor using the following steps:
        </p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Open the course you are enrolled in.</li>
          <li>Go to the discussion or Q&A section.</li>
          <li>Post your question or doubt there.</li>
          <li>If messaging is enabled, use direct message option.</li>
          <li>Wait for instructor response or notifications.</li>
        </ol>
      </>
    )
  }
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

        {/* Search
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
        </motion.div> */}
      </div>

      {/* Categories */}
      <div className="px-6 pb-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 -mt-12">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(`/helpcategory/${cat.slug}`)}
            className={`p-6 rounded-2xl shadow-md border cursor-pointer bg-gradient-to-br ${cat.color}`}
          >
            <h3 className="text-xl font-semibold">{cat.title}</h3>
            <p className="text-gray-700 mt-2 text-sm">{cat.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Popular Articles */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
       <div className="space-y-4">
  {popularArticles.map((item, i) => (
    <div key={i} className="border rounded-xl bg-white shadow-sm">

      {/* Question */}
      <div
        onClick={() => setOpenIndex(openIndex === i ? null : i)}
        className="p-4 cursor-pointer flex justify-between items-center hover:shadow-md transition"
      >
        <span>{item.q}</span>
        <span>{openIndex === i ? "−" : "+"}</span>
      </div>

      {/* Answer */}
      {openIndex === i && (
       <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed">
  {item.a}
</div>
      )}

    </div>
  ))}
</div>  
      </div>

      {/* Contact Support */}
      <div className="text-center pb-20">
        <h2 className="text-2xl font-bold">Still need help?</h2>
        <p className="text-gray-500 mt-2">Contact our support team</p>

        <button className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700" 
        onClick={() => navigate("/contact")}  >
          Contact Support
        </button>
      </div>
    </div>
  );
}
