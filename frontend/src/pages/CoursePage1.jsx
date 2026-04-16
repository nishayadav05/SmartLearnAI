import { useEffect, useState } from "react";
import Api from "../services/Api";
import Sidebar1 from "../components/Sidebar1";
import { Link } from "react-router-dom";

function CoursePage1() {
  const [recentCourses, setRecentCourses] = useState([]);
  const [interestCourses, setInterestCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Recent Courses
  const fetchRecent = async () => {
    try {
      const res = await Api.get("/recent_courses");
      console.log("RECENT:", res.data);
      setRecentCourses(res.data);
    } catch (err) {
      console.log("RECENT ERROR:", err.response);
    }
  };

  // ✅ Fetch Interest Data
  const fetchInterest = async () => {
    try {
      const res = await Api.get("/course_view_percentage");
      console.log("INTEREST:", res.data);
      setInterestCourses(res.data);
    } catch (err) {
      console.log("INTEREST ERROR:", err.response);
    }
  };

  // ✅ Load Data on Page Load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      await fetchRecent();
      await fetchInterest();

      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar1 />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gradient-to-br from-indigo-50 to-purple-50">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          📊 My Learning Dashboard
        </h1>

        {/* ================= RECENT COURSES ================= */}
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          🕒 Recently Viewed Courses
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

            {recentCourses.length === 0 ? (
               
              <p className="text-gray-500">No recent courses</p>
            ) : (
              // recentCourses.map((c) => (
                
              //   <div
              //     key={c.course_id}
              //     className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
              //   >
              //     <img
              //       src={`http://localhost:8000/Thumbnail/${c.thumbnail}`}
              //       className="h-40 w-full object-cover"
              //       alt={c.title}
              //     />

              //     <div className="p-4">
              //       <h3 className="font-semibold text-lg text-gray-800">
              //         {c.title}
              //       </h3>
              //     </div>
              //   </div>
              // ))

              recentCourses.map((c) => (
              <Link
                to={`/coursedisplay/${c.course_id}`}
                key={c.course_id}
              >
                <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:scale-105 cursor-pointer">
                  
                  <img
                    src={`http://localhost:8000/Thumbnail/${c.thumbnail}`}
                    className="h-40 w-full object-cover"
                    alt={c.title}
                  />

                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {c.title}
                    </h3>
                  </div>

                </div>
              </Link>
            ))
            )}

          </div>
        )}

       





        {/* ================= INTEREST COURSES ================= */}
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          🤖 Your Learning Interests
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {interestCourses.length === 0 ? (
              <p className="text-gray-500">No data available</p>
            ) : (
              // interestCourses.map((c) => (
             
              //   <div
              //     key={c.course_id}
              //     className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105"
              //   >

              //     {/* Thumbnail */}
              //     <img
              //       src={`http://localhost:8000/Thumbnail/${c.thumbnail}`}
              //       className="w-full h-40 object-cover"
              //       alt={c.title}
              //     />

              //     <div className="p-5">

              //       {/* Title */}
              //       <h3 className="text-lg font-semibold text-gray-700 mb-1">
              //         {c.title}
              //       </h3>

              //       {/* Category */}
              //       <p className="text-xs text-gray-400 mb-3">
              //         {c.category}
              //       </p>

              //       {/* Interest */}
              //       <div className="flex justify-between text-sm mb-2">
              //         <span className="text-gray-500">Interest Level</span>
              //         <span className="font-bold text-indigo-600">
              //           {c.percentage}%
              //         </span>
              //       </div>

              //       {/* Progress Bar */}
              //       <div className="w-full bg-gray-200 h-3 rounded-full">
              //         <div
              //           className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full"
              //           style={{ width: `${c.percentage}%` }}
              //         ></div>
              //       </div>

              //       {/* Badge */}
              //       <div className="mt-4">
              //         <span
              //           className={`text-xs px-3 py-1 rounded-full font-medium ${
              //             c.percentage > 70
              //               ? "bg-green-100 text-green-600"
              //               : c.percentage > 40
              //               ? "bg-yellow-100 text-yellow-600"
              //               : "bg-red-100 text-red-500"
              //           }`}
              //         >
              //           {c.percentage > 70
              //             ? "🔥 Highly Interested"
              //             : c.percentage > 40
              //             ? "👍 Moderate Interest"
              //             : "👀 Low Interest"}
              //         </span>
              //       </div>

              //     </div>
              //   </div>
              // ))

              interestCourses.map((c) => (
  <Link
    to={`/coursedisplay/${c.course_id}`}
    key={c.course_id}
  >
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105 cursor-pointer">

      <img
        src={`http://localhost:8000/Thumbnail/${c.thumbnail}`}
        className="w-full h-40 object-cover"
        alt={c.title}
      />

      <div className="p-5">

        <h3 className="text-lg font-semibold text-gray-700 mb-1">
          {c.title}
        </h3>

        <p className="text-xs text-gray-400 mb-3">
          {c.category}
        </p>

        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500">Interest Level</span>
          <span className="font-bold text-indigo-600">
            {c.percentage}%
          </span>
        </div>

        <div className="w-full bg-gray-200 h-3 rounded-full">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full"
            style={{ width: `${c.percentage}%` }}
          />
        </div>

      </div>

    </div>
  </Link>
))






            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default CoursePage1;