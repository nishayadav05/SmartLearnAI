import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import Api from "../Api";

function Student() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [studdata, setstuddata] = useState([]);

  const fetchdata = async () => {
    const response = await Api.get("/students_display");
    setstuddata(response.data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  // Pagination
  const totalPages = Math.ceil(studdata.length / rowsPerPage);
  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const currentStudents = studdata.slice(firstIndex, lastIndex);

  return (
    <div className="flex bg-gray-900 min-h-screen text-gray-200">
      <Sidebar />

      <div className="ml-64 p-6 w-full">
        <h1 className="text-3xl font-bold mb-6 text-white">Students</h1>

        <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[900px]">
              <thead>
                <tr className="text-left border-b border-gray-700 text-gray-400 uppercase text-sm">
                  <th className="p-3">Student ID</th>
                  <th className="p-3">User ID</th>
                  <th className="p-3">Age</th>
                  <th className="p-3">Education</th>
                  <th className="p-3">State ID</th>
                  <th className="p-3">City ID</th>
                  <th className="p-3">Skills</th>
                  <th className="p-3">Languages</th>
                </tr>
              </thead>

              <tbody>
                {currentStudents.map((data) => (
                  <tr
                    key={data.stud_id}
                    className="border-b border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="p-3 font-semibold text-blue-400">
                      {data.stud_id}
                    </td>
                    <td className="p-3">{data.user_id}</td>
                    <td className="p-3">{data.age}</td>
                    <td className="p-3">{data.education}</td>
                    <td className="p-3">{data.state_id}</td>
                    <td className="p-3">{data.city_id}</td>
                    <td className="p-3">{data.skills}</td>
                    <td className="p-3">{data.language}</td>
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

export default Student;