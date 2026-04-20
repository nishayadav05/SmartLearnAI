import Sidebar from "../components/Sidebar";
import { FaEye, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import Api from "../Api";
import SearchBar from "../components/SearchBar";
import { prioritySearch } from "../utils/searchUtils";

function Cities() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20; 
  const [citiesData, setCitiesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    city_name: "",
    state_id: ""
  });

  const fetchData = async () => {
    try {
      const response = await Api.get("/cities_display");
      setCitiesData(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtered cities for search
  const filteredCities = prioritySearch(citiesData, searchQuery, [
  "city_id",
  "city_name",
  "state_id",
]);


  // Pagination logic
  const totalPages = Math.ceil(filteredCities.length / rowsPerPage);
  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const currentCities = filteredCities.slice(firstIndex, lastIndex);

  const handleView = (city) => {
  setSelectedCity(city);
  setIsEditMode(false); // important
  setShowModal(true);
};

  const handleEdit = (city) => {
  setSelectedCity(city);

  setFormData({
    city_name: city.city_name,
    state_id: city.state_id
  });

  setIsEditMode(true);
  setShowModal(true);
};

 const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: name === "state_id" ? parseInt(value) || 0 : value
  }));
};

  const handleUpdate = async () => {
  try {
    const form = new FormData();

    form.append("city_name", formData.city_name);
    form.append("state_id", formData.state_id);

    await Api.put(`/cities/${selectedCity.city_id}`, form);

    alert("City updated successfully");

    fetchData();
    closeModal();

  } catch (error) {
    console.error(error.response?.data);
    alert("Update failed");
  }
};

  console.log("Sending:", formData);

  const handleDelete = async (city_id) => {
  if (window.confirm("Are you sure you want to delete this state?")) {
    try {
      await Api.delete(`/cities/${city_id}`);
      // Remove deleted state from UI without refetching
      setCitiesData(citiesData.filter((city) => city.city_id !== city_id));
      alert("City deleted successfully!");
    } catch (error) {
      console.error("Error deleting city:", error);
      alert("Failed to delete city.");
    }
  }
};

  const closeModal = () => {
  setShowModal(false);
  setSelectedCity(null);
  setIsEditMode(false);
};


  return (
    <div className="flex bg-gray-900 min-h-screen text-gray-200">
      <Sidebar />

      <div className="ml-64 p-6 w-full">
        <h1 className="text-3xl font-bold mb-6 text-white">Cities</h1>

        {/* SEARCH BOX */}
        <SearchBar
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // important
          }}
          placeholder="Search by State Name or ID..."
        />

        {/* TABLE */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-4 border border-gray-700 overflow-x-auto">
          <table className="w-full border-collapse min-w-[700px]">
            <thead>
              <tr className="text-left border-b border-gray-700 text-gray-400 uppercase text-sm tracking-wider">
                <th className="p-3">City ID</th>
                <th className="p-3">City Name</th>
                <th className="p-3">State ID</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentCities.map((city) => (
                <tr
                  key={city.city_id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition"
                >
                  <td className="p-3 font-medium text-blue-400">{city.city_id}</td>
                  <td className="p-3">{city.city_name}</td>
                  <td className="p-3 text-gray-400">{city.state_id}</td>
                  <td className="p-3 flex gap-3 justify-center">
                    <button
                      className="text-blue-400 hover:text-blue-300"
                      onClick={() => handleView(city)}
                    >
                      <FaEye />
                    </button>
                   <button
                      className="text-yellow-400 hover:text-yellow-300"
                      onClick={() => handleEdit(city)}
                    >
                      <FaEdit />
                    </button>
                    <button className="text-red-400 hover:text-red-300" onClick={() => handleDelete(city.city_id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}

              {currentCities.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-gray-400">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="flex justify-end gap-2 mt-6 flex-wrap">
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

      {/* VIEW MODAL */}
      {showModal && selectedCity && (
  <div
    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    onClick={closeModal}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-gray-900 w-[500px] rounded-2xl p-6 border border-gray-700 relative"
    >
      <button
        onClick={closeModal}
        className="absolute top-3 right-4 text-gray-400 hover:text-white"
      >
        ✖
      </button>

      <h2 className="text-xl font-bold mb-4 text-white">
        {isEditMode ? "Edit City" : "City Details"}
      </h2>

      {isEditMode ? (
        <div className="space-y-4">

          {/* City Name */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">City Name</label>
            <input
              type="text"
              name="city_name"
              value={formData.city_name}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2"
            />
          </div>

          {/* State ID */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">State ID</label>
            <input
              type="number"
              name="state_id"
              value={formData.state_id}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-700 rounded"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-yellow-500 rounded text-black font-semibold"
            >
              Update
            </button>
          </div>

        </div>
      ) : (
        <div className="space-y-3 text-sm">
          <p>
            <span className="text-gray-400">City ID:</span> {selectedCity.city_id}
          </p>
          <p>
            <span className="text-gray-400">City Name:</span> {selectedCity.city_name}
          </p>
          <p>
            <span className="text-gray-400">State ID:</span> {selectedCity.state_id}
          </p>

          <div className="text-right mt-5">
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

export default Cities;