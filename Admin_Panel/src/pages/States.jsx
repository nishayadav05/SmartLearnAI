import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import Api from "../Api";

function Blogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [blogdata, setblogdata] = useState([]);

  const fetchdata = async () => {
    const response = await Api.get("/states");
    setblogdata(response.data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const totalPages = Math.ceil(blogdata.length / rowsPerPage);
  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const currentBlogs = blogdata.slice(firstIndex, lastIndex);

  return (
    <div className="flex bg-gray-900 min-h-screen text-gray-200">
      <Sidebar />

      <div className="ml-64 p-6 w-full">
        <h1 className="text-3xl font-bold mb-6 text-white">States</h1>

        <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[900px]">

              <thead>
                <tr className="text-left border-b border-gray-700 text-gray-400 uppercase">
                  <th className="p-3">State ID</th>
                   <th className="p-3">State Name</th>
                </tr>
              </thead>

              <tbody>
                {currentBlogs.map((data) => (
                  <tr
                    key={data.state_id}
                    className="border-b border-gray-700 hover:bg-gray-700 transition">
                        <th className="p-3">{data.state_id}</th>
                        <th className="p-3">{data.state_name}</th>
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
              className="px-4 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-40">
              Next
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Blogs;