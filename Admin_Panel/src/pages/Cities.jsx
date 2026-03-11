import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import Api from "../Api";

function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [studdata, setstuddata] = useState([]);

  const fetchdata = async () => {
    const response = await Api.get("/cities_display");
    setstuddata(response.data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const totalPages = Math.ceil(studdata.length / rowsPerPage);
  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const currentUsers = studdata.slice(firstIndex, lastIndex);

  return (
    <div className="flex bg-gray-900 min-h-screen text-gray-200">
      <Sidebar />

      <div className="ml-64 p-6 w-full">
        <h1 className="text-3xl font-bold mb-6 text-white">Cities</h1>

        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-700">

          {/* TABLE */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left border-b border-gray-700 text-gray-400 uppercase text-sm tracking-wider">
                <th className="p-3">City ID</th>
                <th className="p-3">City Name</th>
                <th className="p-3">State ID</th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.map((data) => (
                <tr
                  key={data.city_id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition"
                >
                  <td className="p-3 font-medium text-blue-400">
                    {data.city_id}
                  </td>

                  <td className="p-3">{data.city_name}</td>

                  <td className="p-3 text-gray-400">{data.state_id}</td>

                  {/* <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        data.status === "Active"
                          ? "bg-green-900 text-green-400"
                          : "bg-yellow-900 text-yellow-400"
                      }`}
                    >
                      {data.status || "Active"}
                    </span>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>

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