import Sidebar from "../components/Sidebar";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import Api from "../Api";

// ✅ SEARCH IMPORTS
import SearchBar from "../components/SearchBar";
import { prioritySearch } from "../utils/searchUtils";

function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [studdata, setstuddata] = useState([]);
  const [search, setSearch] = useState(""); 

  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    status: "",
    role: ""
  });

  const handleEdit = (data) => {
    setSelectedUser(data);

    setFormData({
      fullname: data.fullname,
      email: data.email,
      status: data.status,
    });

    setIsEditMode(true);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
  try {
    const form = new FormData();
    form.append("fullname", formData.fullname);
    form.append("email", formData.email);
    form.append("status", formData.status);

    await Api.put(`/update_users/${selectedUser.user_id}`, form);

    setstuddata((prev) =>
      prev.map((item) =>
        item.user_id === selectedUser.user_id
          ? { ...item, ...formData }
          : item
      )
    );

    alert("User updated successfully");
    closeModal();

  } catch (error) {
    console.error(error.response?.data);
    alert("Update failed");
  }
};
  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setIsEditMode(false);
  };

  const handleView = (data) => {
    setSelectedUser(data);
    setShowModal(true);
  };

  const fetchdata = async () => {
    const response = await Api.get("/users_display");
    setstuddata(response.data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  // SEARCH LOGIC
  const filteredUsers = prioritySearch(studdata, search, [
    "fullname",
    "email",
    "user_id",
    "status"
  ]);

  // PAGINATION (UPDATED)
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const currentUsers = filteredUsers.slice(firstIndex, lastIndex);

  return (
    <div className="flex bg-gray-900 min-h-screen text-gray-200">
      <Sidebar />

      <div className="ml-64 p-6 w-full">
        <h1 className="text-3xl font-bold mb-6 text-white">Users</h1>

        {/* SEARCH BAR */}
        <SearchBar
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search by name, email, status..."
        />

        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-700">

          {/* TABLE */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left border-b border-gray-700 text-gray-400 uppercase text-sm tracking-wider">
                <th className="p-3">User ID</th>
                <th className="p-3">Full Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.map((data) => (
                <tr
                  key={data.user_id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition"
                >
                  <td className="p-3 font-medium text-blue-400">
                    {data.user_id}
                  </td>

                  <td className="p-3">{data.fullname}</td>

                  <td className="p-3 text-gray-400">{data.email}</td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        data.status === "Active"
                          ? "bg-green-900 text-green-400"
                          : "bg-yellow-900 text-yellow-400"
                      }`}
                    >
                      {data.status || "Active"}
                    </span>
                  </td>

                  <td className="p-3 flex gap-3 justify-center">
                    <button
                      className="text-blue-400 hover:text-blue-300"
                      onClick={() => handleView(data)}
                    >
                      <FaEye />
                    </button>

                    <button
                      className="text-yellow-400 hover:text-yellow-300"
                      onClick={() => handleEdit(data)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="text-red-400 hover:text-red-300"
                      onClick={() => handleDelete(data.stud_id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
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

      {/* MODAL (UNCHANGED) */}
     {showModal && selectedUser && (
  <div
    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
    onClick={closeModal}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-gray-900 w-[500px] rounded-2xl shadow-2xl border border-gray-700 p-6 relative"
    >

      {/* CLOSE BUTTON */}
      <button
        onClick={closeModal}
        className="absolute top-3 right-3 text-gray-400 hover:text-white text-lg"
      >
      </button>

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
          {selectedUser.fullname?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            {selectedUser.fullname}
          </h2>
          <p className="text-gray-400 text-sm">
            User ID: {selectedUser.user_id}
          </p>
        </div>
      </div>

      {/* 🔥 EDIT MODE */}
      {isEditMode ? (
        <div className="space-y-4">

          <div>
            <label className="text-gray-400 text-sm">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-gray-400 text-sm">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>  
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-700 rounded"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-yellow-500 text-black rounded font-semibold"
            >
              Update
            </button>
          </div>

        </div>
      ) : (

        /* 👀 VIEW MODE */
        <div className="grid grid-cols-2 gap-4 text-sm">

          <div className="bg-gray-800 p-3 rounded-lg col-span-2">
            <p className="text-gray-400">Email</p>
            <p className="text-white font-semibold">
              {selectedUser.email}
            </p>
          </div>

          <div className="bg-gray-800 p-3 rounded-lg">
            <p className="text-gray-400">Status</p>
            <p className={`font-semibold ${
              selectedUser.status === "Active"
                ? "text-green-400"
                : "text-yellow-400"
            }`}>
              {selectedUser.status}
            </p>
          </div>
          <div className="text-right col-span-2 mt-4">
            <button
              onClick={closeModal}
              className="px-5 py-2 bg-blue-600 rounded hover:bg-blue-500"
            >
              Close
            </button>
          </div>

        </div>
      )}

    </div>
  </div>
)}

    </div>
  );
}

export default Users;