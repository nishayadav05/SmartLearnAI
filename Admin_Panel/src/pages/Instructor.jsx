import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Api from "../Api";
import SearchBar from "../components/SearchBar";
import { prioritySearch } from "../utils/searchUtils";

function Instructor() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
   
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const rowsPerPage = 5;

  const [formData, setFormData] = useState({
    gender: "",
    mobile: "",
    qualification: "",
    bio: "",
    experience: "",
    state_id: "",
    city_id: "",
    language: "",
    skills: "",
    photo: null
  });

  // FETCH DATA
  const fetchData = async () => {
    try {
      const res = await Api.get("/instructor_display");
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // USE COMMON SEARCH LOGIC
  const filtered = prioritySearch(data, search, [
    "user_id",
    "experience",
    "mobile",
    "qualification",
    "skills",
    "language",
    "gender"
  ]);

  // PAGINATION
  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const currentData = filtered.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filtered.length / rowsPerPage);

  // DELETE
  const handleDelete = async (id) => {
    if (window.confirm("Delete instructor?")) {
      await Api.delete(`/delete_instructor/${id}`);
      fetchData();
    }
  };

  // VIEW
  const handleView = (item) => {
    setSelected(item);
    setIsEditMode(false);
    setShowModal(true);
  };

  // EDIT
  const handleEdit = (item) => {
    setSelected(item);
    setFormData({ ...item, photo: null });
    setIsEditMode(true);
    setShowModal(true);
  };
  
 const closeModal = () => {
  setShowModal(false);
  setSelected(null);
  setIsEditMode(false);
};

  // CHANGE
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
      setFormData({ ...formData, photo: e.target.files[0] });
    };

    // UPDATE
  const handleUpdate = async () => {
  try {
    const form = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "") {
        form.append(key, formData[key]);
      }
    });

    await Api.put(`/update_instructor_profile/${selected.user_id}`, form);

    alert("Updated successfully");

    // ✅ IMPORTANT
    fetchData();   // image + data correct milega

    closeModal();

  } catch (err) {
    console.error(err.response?.data);
    alert("Update failed");
  }
};

  return (
    <div className="flex bg-gray-900 min-h-screen text-gray-200">
      <Sidebar />

      <div className="ml-64 p-6 w-full">
        <h1 className="text-3xl font-bold mb-6 text-white">
          Instructor List
        </h1>

        {/* REUSABLE SEARCH */}
        <SearchBar
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search by mobile, qualification, skills..."
        />

        {/* TABLE */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400 text-sm">
                <th className="p-3">Instructor ID</th>
                <th className="p-3">User ID</th>
                <th className="p-3">Photo</th>
                <th className="p-3">Gender</th>
                <th className="p-3">Mobile</th>
                <th className="p-3">Qualification</th>
                <th className="p-3">Experience</th>
                <th className="p-3">Skills</th>
                <th className="p-3">Language</th>
                <th className="p-3">Bio</th>
                <th className="p-3">State ID</th>
                <th className="p-3">City ID</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
            {currentData.map((item) => (
              <tr
                key={item.instructor_id}
                className="border-b border-gray-700 hover:bg-gray-700"
              >
                
                <td className="p-3 text-blue-400">
                  {item.instructor_id || "N/A"}
                </td>

                <td className="p-3">{item.user_id}</td>

                <td className="p-3">
                  <img
                    src={`http://localhost:8000/StudentPhotos/${item.photo}`}
                    className="w-16 h-16 rounded object-cover"
                    alt="profile"
                  />
                  
                </td>
                
                <td className="p-3">{item.gender || "N/A"}</td>
                <td className="p-3">{item.mobile || "N/A"}</td>
                <td className="p-3">{item.qualification || "N/A"}</td>
                <td className="p-3">{item.experience || "N/A"}</td>

                <td className="p-3">
                  {item.skills?.length > 20
                    ? item.skills.substring(0, 20) + "..."
                    : item.skills || "N/A"}
                </td>

                <td className="p-3">
                  {item.language?.length > 15
                    ? item.language.substring(0, 15) + "..."
                    : item.language || "N/A"}
                </td>

                <td className="p-3 max-w-[200px]">
                  {item.bio?.length > 40
                    ? item.bio.substring(0, 40) + "..."
                    : item.bio || "N/A"}
                </td>

                <td className="p-3">{item.state_id || "N/A"}</td>
                <td className="p-3">{item.city_id || "N/A"}</td>

                <td className="p-3 flex gap-3 justify-center">
                  <button
                    onClick={() => handleView(item)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <FaEye />
                  </button>

                  <button
                    onClick={() => handleEdit(item)}
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleDelete(item.user_id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}

            {currentData.length === 0 && (
              <tr>
                <td colSpan="13" className="text-center p-4 text-gray-400">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
          </table>

          {showModal && selected && (
  <div
    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    onClick={closeModal}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-gray-900 w-[700px] max-h-[90vh] overflow-y-auto rounded-2xl p-6 border border-gray-700 relative"
    >
      {/* CLOSE */}
      <button
        onClick={closeModal}
        className="absolute top-3 right-4 text-gray-400 hover:text-white"
      >
        ✖
      </button>

      <h2 className="text-xl font-bold mb-4 text-white">
        {isEditMode ? "Edit Instructor" : "Instructor Details"}
      </h2>

      {isEditMode ? (
        <div className="grid grid-cols-2 gap-4">

          <input name="gender" value={formData.gender} onChange={handleChange}
            placeholder="Gender"
            className="bg-gray-800 p-2 rounded border border-gray-700" />

          <input name="mobile" value={formData.mobile} onChange={handleChange}
            placeholder="Mobile"
            className="bg-gray-800 p-2 rounded border border-gray-700" />

          <input name="qualification" value={formData.qualification} onChange={handleChange}
            placeholder="Qualification"
            className="bg-gray-800 p-2 rounded border border-gray-700" />

          <input name="experience" value={formData.experience} onChange={handleChange}
            placeholder="Experience"
            className="bg-gray-800 p-2 rounded border border-gray-700" />

          <input name="skills" value={formData.skills} onChange={handleChange}
            placeholder="Skills"
            className="bg-gray-800 p-2 rounded border border-gray-700" />

          <input name="language" value={formData.language} onChange={handleChange}
            placeholder="Language"
            className="bg-gray-800 p-2 rounded border border-gray-700" />

          <input name="state_id" value={formData.state_id} onChange={handleChange}
            placeholder="State ID"
            className="bg-gray-800 p-2 rounded border border-gray-700" />

          <input name="city_id" value={formData.city_id} onChange={handleChange}
            placeholder="City ID"
            className="bg-gray-800 p-2 rounded border border-gray-700" />

          <textarea name="bio" value={formData.bio} onChange={handleChange}
            placeholder="Bio"
            className="col-span-2 bg-gray-800 p-2 rounded border border-gray-700" />

          {/* IMAGE */}
          <div className="col-span-2 flex gap-4 items-center">
            <input type="file" onChange={handleFile} />

            {/* Preview */}
            {formData.photo ? (
              <img
                src={URL.createObjectURL(formData.photo)}
                className="w-20 h-20 rounded object-cover"
              />
            ) : (
              <img
                src={`http://localhost:8000/StudentPhotos/${selected.photo}`}
                className="w-20 h-20 rounded object-cover"
              />
            )}
          </div>

          {/* BUTTONS */}
          <div className="col-span-2 flex justify-end gap-3 mt-3">
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
              <div className="flex gap-8 items-start">

                {/* LEFT - DETAILS */}
                <div className="flex-1 space-y-3 text-sm">

                  <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                    
                    <p>
                      <span className="text-gray-400">User ID:</span><br />
                      <span className="text-white font-medium">{selected.user_id}</span>
                    </p>

                    <p>
                      <span className="text-gray-400">Mobile:</span><br />
                      <span className="text-white font-medium">{selected.mobile}</span>
                    </p>

                    <p>
                      <span className="text-gray-400">Qualification:</span><br />
                      <span className="text-white font-medium">{selected.qualification}</span>
                    </p>

                    <p>
                      <span className="text-gray-400">Experience:</span><br />
                      <span className="text-white font-medium">{selected.experience} yrs</span>
                    </p>

                    <p className="col-span-2">
                      <span className="text-gray-400">Skills:</span><br />
                      <span className="text-white">{selected.skills}</span>
                    </p>

                    <p className="col-span-2">
                      <span className="text-gray-400">Language:</span><br />
                      <span className="text-white">{selected.language}</span>
                    </p>

                    <p className="col-span-2">
                      <span className="text-gray-400">Bio:</span><br />
                      <span className="text-white leading-relaxed">
                        {selected.bio}
                      </span>
                    </p>

                  </div>

                </div>

                {/* RIGHT - IMAGE */}
                <div className="flex flex-col items-center gap-3">

                  <div className="w-40 h-40 rounded-2xl overflow-hidden border border-gray-700 shadow-lg">
                    <img
                      src={
                        selected.photo
                          ? `http://localhost:8000/StudentPhotos/${selected.photo}`
                          : "https://via.placeholder.com/150"
                      }
                      alt="Instructor"
                      className="w-full h-full object-cover hover:scale-105 transition"
                    />
                  </div>

                  <p className="text-xs text-gray-400">Profile Photo</p>

                </div>

              </div>
                )}
              </div>
            </div>
          )}

          {/* PAGINATION */}
          <div className="flex justify-end gap-2 mt-6">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Instructor;