import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import Api from "../Api";

function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [studdata, setstuddata] = useState([]);

  const fetchdata = async () => {
    const response = await Api.get("/course_display");
    setstuddata(response.data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  // Pagination
  const totalPages = Math.ceil(studdata.length / rowsPerPage);
  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const currentCourses = studdata.slice(firstIndex, lastIndex);

  return (
    <div className="flex bg-gray-900 min-h-screen w-full text-gray-200">
      <Sidebar />

      <div className="ml-64 p-6 w-full">
        <h1 className="text-3xl font-bold mb-6 text-white">Courses</h1>

        <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">

          {/* TABLE SCROLL */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[1400px]">
              <thead>
                <tr className="text-left border-b border-gray-700 text-gray-400 uppercase text-sm">
                  <th className="p-3">ID</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Skill Level</th>
                  <th className="p-3">Prerequisites</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Tag</th>
                  <th className="p-3">Thumbnail</th>
                  <th className="p-3">Video</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Time</th>
                </tr>
              </thead>

              <tbody>
                {currentCourses.map((data) => (
                  <tr
                    key={data.course_id}
                    className="border-b border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="p-3 text-blue-400 font-semibold">
                      {data.course_id}
                    </td>

                    <td className="p-3">{data.course_title}</td>

                    <td className="p-3">{data.category}</td>

                    <td className="p-3">{data.skill_level}</td>

                    <td className="p-3">{data.prerequisites}</td>

                    <td className="p-3 max-w-[200px]">
                      {data.description.length > 50
                        ? data.description.substring(0, 50) + "..."
                        : data.description}
                    </td>

                    <td className="p-3">{data.tag}</td>

                    {/* THUMBNAIL */}
                    <td className="p-3">
                      <img
                        src={`http://localhost:8000/Thumbnail/${data.thumbnail}`}
                        alt="thumbnail"
                        className="w-40 h-24 object-cover rounded-lg shadow"
                      />
                    </td>

                    {/* VIDEO */}
                    <td className="p-3">
                      <video
                        src={`http://localhost:8000/Coursevideo/${data.video}`}
                        className="w-40 h-24 object-cover rounded-lg"
                        controls
                      />
                    </td>

                    <td className="p-3 text-green-400 font-semibold">
                      ₹{data.course_price}
                    </td>

                    <td className="p-3">{data.course_date}</td>

                    <td className="p-3">{data.course_time}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex justify-end gap-2 mt-6">

            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-40"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-40"
            >
              Next
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;