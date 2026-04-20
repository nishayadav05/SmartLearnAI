// // import Sidebar from "../components/Sidebar";
// // import { useState, useEffect } from "react";
// // import Api from "../Api";
// // import { FaEye, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

// // function States() {
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const rowsPerPage = 20; // 20 rows per page for performance
// //   const [statesData, setStatesData] = useState([]);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [selectedState, setSelectedState] = useState(null);
// //   const [showModal, setShowModal] = useState(false);

// //   // Fetch states
// //   const fetchData = async () => {
// //     try {
// //       const response = await Api.get("/states"); // Your API endpoint
// //       setStatesData(response.data);
// //     } catch (error) {
// //       console.error("Error fetching states:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   // Filtered states for search
// //   const filteredStates = statesData.filter(
// //     (state) =>
// //       state.state_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       state.state_id.toString().includes(searchQuery)
// //   );

// //   // Pagination
// //   const totalPages = Math.ceil(filteredStates.length / rowsPerPage);
// //   const lastIndex = currentPage * rowsPerPage;
// //   const firstIndex = lastIndex - rowsPerPage;
// //   const currentStates = filteredStates.slice(firstIndex, lastIndex);

// //   // View modal
// //   const handleView = (state) => {
// //     setSelectedState(state);
// //     setShowModal(true);
// //   };

// //   // DELETE function
// //  const handleDelete = async (state_id) => {
// //     if (window.confirm("Are you sure you want to delete this state?")) {
// //       try {
// //         await Api.delete(`/states/${state_id}`);
// //         // Remove deleted state from UI without refetching
// //         setStatesData(statesData.filter((state) => state.state_id !== state_id));
// //         alert("State deleted successfully!");
// //       } catch (error) {
// //         console.error("Error deleting state:", error);
// //         alert("Failed to delete state.");
// //       }
// //     }
// //   };



// //   return (
// //     <div className="flex bg-gray-900 min-h-screen text-gray-200">
// //       <Sidebar />

// //       <div className="ml-64 p-6 w-full">
// //         <h1 className="text-3xl font-bold mb-6 text-white">States</h1>

// //         {/* SEARCH BOX */}
// //         <div className="mb-4 flex items-center gap-2">
// //           <FaSearch className="text-gray-400" />
// //           <input
// //             type="text"
// //             placeholder="Search by State Name or ID"
// //             className="px-3 py-2 rounded-lg bg-gray-800 text-gray-200 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             value={searchQuery}
// //             onChange={(e) => setSearchQuery(e.target.value)}
// //           />
// //         </div>

// //         <div className="bg-gray-800 rounded-2xl shadow-lg p-4 border border-gray-700 overflow-x-auto">
// //           {/* TABLE */}
// //           <table className="w-full border-collapse min-w-[600px]">
// //             <thead>
// //               <tr className="text-left border-b border-gray-700 text-gray-400 uppercase text-sm tracking-wider">
// //                 <th className="p-3">State ID</th>
// //                 <th className="p-3">State Name</th>
// //                 <th className="p-3 text-center">Actions</th>
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {currentStates.map((state) => (
// //                 <tr
// //                   key={state.state_id}
// //                   className="border-b border-gray-700 hover:bg-gray-700 transition"
// //                 >
// //                   <td className="p-3 font-medium text-blue-400">{state.state_id}</td>
// //                   <td className="p-3">{state.state_name}</td>
// //                   <td className="p-3 flex gap-3 justify-center">
// //                     <button
// //                       className="text-blue-400 hover:text-blue-300"
// //                       onClick={() => handleView(state)}
// //                     >
// //                       <FaEye />
// //                     </button>
// //                     <button className="text-yellow-400 hover:text-yellow-300">
// //                       <FaEdit />
// //                     </button>
// //                     <button className="text-red-400 hover:text-red-300" onClick={() => handleDelete(state.state_id)}>
// //                       <FaTrash />
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}

// //               {currentStates.length === 0 && (
// //                 <tr>
// //                   <td colSpan={3} className="text-center p-4 text-gray-400">
// //                     No results found
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>

// //           {/* PAGINATION */}
// //           <div className="flex justify-end gap-2 mt-6 flex-wrap">
// //             <button
// //               disabled={currentPage === 1}
// //               onClick={() => setCurrentPage(currentPage - 1)}
// //               className="px-4 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-40"
// //             >
// //               Prev
// //             </button>

// //             {[...Array(totalPages)].map((_, i) => (
// //               <button
// //                 key={i}
// //                 onClick={() => setCurrentPage(i + 1)}
// //                 className={`px-3 py-1 rounded ${
// //                   currentPage === i + 1
// //                     ? "bg-blue-600 text-white"
// //                     : "bg-gray-700 hover:bg-gray-600"
// //                 }`}
// //               >
// //                 {i + 1}
// //               </button>
// //             ))}

// //             <button
// //               disabled={currentPage === totalPages}
// //               onClick={() => setCurrentPage(currentPage + 1)}
// //               className="px-4 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-40"
// //             >
// //               Next
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* VIEW MODAL */}
// //       {showModal && selectedState && (
// //         <div
// //           className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
// //           onClick={() => setShowModal(false)}
// //         >
// //           <div
// //             onClick={(e) => e.stopPropagation()}
// //             className="bg-gray-900 w-[400px] rounded-2xl p-6 border border-gray-700 relative"
// //           >
// //             <button
// //               onClick={() => setShowModal(false)}
// //               className="absolute top-3 right-4 text-gray-400 hover:text-white"
// //             >
// //               ✖
// //             </button>

// //             <h2 className="text-xl font-bold mb-4 text-white">State Details</h2>

// //             <div className="space-y-3 text-sm">
// //               <p>
// //                 <span className="text-gray-400">State ID:</span> {selectedState.state_id}
// //               </p>
// //               <p>
// //                 <span className="text-gray-400">State Name:</span> {selectedState.state_name}
// //               </p>
// //             </div>

// //             <div className="text-right mt-5">
// //               <button
// //                 onClick={() => setShowModal(false)}
// //                 className="px-5 py-2 bg-blue-600 rounded hover:bg-blue-500"
// //               >
// //                 Close
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default States;

// import Sidebar from "../components/Sidebar";
// import { useState, useEffect } from "react";
// import Api from "../Api";
// import { FaEye, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

// function States() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 20;
//   const [statesData, setStatesData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedState, setSelectedState] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   //  NEW STATES
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//     state_name: ""
//   });

//   const fetchData = async () => {
//   try {
//     const response = await Api.get("/states");

//     //  SORT DATA ALPHABETICALLY
//     const sortedData = response.data.sort((a, b) =>
//       a.state_name.localeCompare(b.state_name)
//     );

//     setStatesData(sortedData);

//   } catch (error) {
//     console.error("Error fetching states:", error);
//   }
// };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const filteredStates = statesData
//   .map((state) => {
//     const name = (state.state_name || "").toLowerCase();
//     const id = state.state_id?.toString() || "";
//     const query = searchQuery.toLowerCase().trim();

//     let priority = 2;

//     if (name.startsWith(query) || id.startsWith(query)) {
//       priority = 0; // 🔥 highest priority
//     } else if (name.includes(query) || id.includes(query)) {
//       priority = 1;
//     }

//     return { ...state, priority };
//   })
//   .filter((item) => item.priority < 2)
//   .sort((a, b) => a.priority - b.priority);

//   const totalPages = Math.ceil(filteredStates.length / rowsPerPage);
//   const lastIndex = currentPage * rowsPerPage;
//   const firstIndex = lastIndex - rowsPerPage;
//   const currentStates = filteredStates.slice(firstIndex, lastIndex);

//   // VIEW
//   const handleView = (state) => {
//     setSelectedState(state);
//     setIsEditMode(false);
//     setShowModal(true);
//   };

//   //  EDIT
//   const handleEdit = (state) => {
//     setSelectedState(state);

//     setFormData({
//       state_name: state.state_name
//     });

//     setIsEditMode(true);
//     setShowModal(true);
//   };

//   //  CHANGE
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   //  UPDATE (FormData)
//   const handleUpdate = async () => {
//     try {
//       const form = new FormData();
//       form.append("state_name", formData.state_name);

//       await Api.put(`/update_states/${selectedState.state_id}`, form);

//       alert("State updated successfully");

//       fetchData();
//       closeModal();

//     } catch (error) {
//       console.error(error.response?.data);
//       alert("Update failed");
//     }
//   };

//   // DELETE
//   const handleDelete = async (state_id) => {
//     if (window.confirm("Are you sure you want to delete this state?")) {
//       try {
//         await Api.delete(`/states/${state_id}`);
//         setStatesData(statesData.filter((state) => state.state_id !== state_id));
//         alert("State deleted successfully!");
//       } catch (error) {
//         console.error("Error deleting state:", error);
//         alert("Failed to delete state.");
//       }
//     }
//   };

//   // CLOSE MODAL
//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedState(null);
//     setIsEditMode(false);
//   };

//   return (
//     <div className="flex bg-gray-900 min-h-screen text-gray-200">
//       <Sidebar />

//       <div className="ml-64 p-6 w-full">
//         <h1 className="text-3xl font-bold mb-6 text-white">States</h1>

//         {/* SEARCH */}
//         <div className="mb-4 flex items-center gap-2">
//           <FaSearch className="text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search by State Name or ID"
//             className="px-3 py-2 rounded-lg bg-gray-800 text-gray-200 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         <div className="bg-gray-800 rounded-2xl shadow-lg p-4 border border-gray-700 overflow-x-auto">
//           <table className="w-full border-collapse min-w-[600px]">
//             <thead>
//               <tr className="text-left border-b border-gray-700 text-gray-400 uppercase text-sm tracking-wider">
//                 <th className="p-3">State ID</th>
//                 <th className="p-3">State Name</th>
//                 <th className="p-3 text-center">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {currentStates.map((state) => (
//                 <tr
//                   key={state.state_id}
//                   className="border-b border-gray-700 hover:bg-gray-700 transition"
//                 >
//                   <td className="p-3 font-medium text-blue-400">{state.state_id}</td>
//                   <td className="p-3">{state.state_name}</td>
//                   <td className="p-3 flex gap-3 justify-center">
//                     <button
//                       className="text-blue-400 hover:text-blue-300"
//                       onClick={() => handleView(state)}
//                     >
//                       <FaEye />
//                     </button>

//                     <button
//                       className="text-yellow-400 hover:text-yellow-300"
//                       onClick={() => handleEdit(state)}
//                     >
//                       <FaEdit />
//                     </button>

//                     <button
//                       className="text-red-400 hover:text-red-300"
//                       onClick={() => handleDelete(state.state_id)}
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}

//               {currentStates.length === 0 && (
//                 <tr>
//                   <td colSpan={3} className="text-center p-4 text-gray-400">
//                     No results found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           {/* PAGINATION */}
//           <div className="flex justify-end gap-2 mt-6 flex-wrap">
//             <button
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage(currentPage - 1)}
//               className="px-4 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-40"
//             >
//               Prev
//             </button>

//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-3 py-1 rounded ${
//                   currentPage === i + 1
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-700 hover:bg-gray-600"
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}

//             <button
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage(currentPage + 1)}
//               className="px-4 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-40"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* MODAL */}
//       {showModal && selectedState && (
//         <div
//           className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
//           onClick={closeModal}
//         >
//           <div
//             onClick={(e) => e.stopPropagation()}
//             className="bg-gray-900 w-[400px] rounded-2xl p-6 border border-gray-700 relative"
//           >
//             <button
//               onClick={closeModal}
//               className="absolute top-3 right-4 text-gray-400 hover:text-white"
//             >
//               ✖
//             </button>

//             <h2 className="text-xl font-bold mb-4 text-white">
//               {isEditMode ? "Edit State" : "State Details"}
//             </h2>

//             {isEditMode ? (
//               <div className="space-y-4">

//                 <div>
//                   <label className="text-gray-400 text-sm">State Name</label>
//                   <input
//                     type="text"
//                     name="state_name"
//                     value={formData.state_name}
//                     onChange={handleChange}
//                     className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded"
//                   />
//                 </div>

//                 <div className="flex justify-end gap-3">
//                   <button
//                     onClick={closeModal}
//                     className="px-4 py-2 bg-gray-700 rounded"
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     onClick={handleUpdate}
//                     className="px-4 py-2 bg-yellow-500 rounded text-black font-semibold"
//                   >
//                     Update
//                   </button>
//                 </div>

//               </div>
//             ) : (
//               <div className="space-y-3 text-sm">
//                 <p>
//                   <span className="text-gray-400">State ID:</span> {selectedState.state_id}
//                 </p>
//                 <p>
//                   <span className="text-gray-400">State Name:</span> {selectedState.state_name}
//                 </p>

//                 <div className="text-right mt-5">
//                   <button
//                     onClick={closeModal}
//                     className="px-5 py-2 bg-blue-600 rounded hover:bg-blue-500"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             )}

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default States;


import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import Api from "../Api";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

// ✅ NEW IMPORTS
import SearchBar from "../components/SearchBar";
import { prioritySearch } from "../utils/searchUtils";

function States() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;
  const [statesData, setStatesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    state_name: ""
  });

  // FETCH DATA
  const fetchData = async () => {
    try {
      const response = await Api.get("/states");

      const sortedData = response.data.sort((a, b) =>
        (a.state_name || "").localeCompare(b.state_name || "")
      );

      setStatesData(sortedData);

    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ NEW SEARCH LOGIC
  const filteredStates = prioritySearch(statesData, searchQuery, [
    "state_name",
    "state_id"
  ]);

  const totalPages = Math.ceil(filteredStates.length / rowsPerPage);
  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const currentStates = filteredStates.slice(firstIndex, lastIndex);

  // VIEW
  const handleView = (state) => {
    setSelectedState(state);
    setIsEditMode(false);
    setShowModal(true);
  };

  // EDIT
  const handleEdit = (state) => {
    setSelectedState(state);
    setFormData({
      state_name: state.state_name
    });
    setIsEditMode(true);
    setShowModal(true);
  };

  // CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // UPDATE
  const handleUpdate = async () => {
    try {
      const form = new FormData();
      form.append("state_name", formData.state_name);

      await Api.put(`/update_states/${selectedState.state_id}`, form);

      alert("State updated successfully");
      fetchData();
      closeModal();

    } catch (error) {
      console.error(error.response?.data);
      alert("Update failed");
    }
  };

  // DELETE
  const handleDelete = async (state_id) => {
    if (window.confirm("Are you sure you want to delete this state?")) {
      try {
        await Api.delete(`/states/${state_id}`);
        setStatesData(statesData.filter((s) => s.state_id !== state_id));
        alert("State deleted successfully!");
      } catch (error) {
        console.error(error);
        alert("Failed to delete state.");
      }
    }
  };

  // CLOSE MODAL
  const closeModal = () => {
    setShowModal(false);
    setSelectedState(null);
    setIsEditMode(false);
  };

  return (
    <div className="flex bg-gray-900 min-h-screen text-gray-200">
      <Sidebar />

      <div className="ml-64 p-6 w-full">
        <h1 className="text-3xl font-bold mb-6 text-white">States</h1>

        {/* ✅ NEW SEARCH BAR */}
        <SearchBar
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // important
          }}
          placeholder="Search by State Name or ID..."
        />

        <div className="bg-gray-800 rounded-2xl shadow-lg p-4 border border-gray-700 overflow-x-auto">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr className="text-left border-b border-gray-700 text-gray-400 uppercase text-sm">
                <th className="p-3">State ID</th>
                <th className="p-3">State Name</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentStates.map((state) => (
                <tr
                  key={state.state_id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition"
                >
                  <td className="p-3 text-blue-400 font-semibold">
                    {state.state_id}
                  </td>

                  <td className="p-3">
                    {state.state_name || "N/A"}
                  </td>

                  <td className="p-3 flex gap-3 justify-center">
                    <button
                      className="text-blue-400 hover:text-blue-300"
                      onClick={() => handleView(state)}
                    >
                      <FaEye />
                    </button>

                    <button
                      className="text-yellow-400 hover:text-yellow-300"
                      onClick={() => handleEdit(state)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="text-red-400 hover:text-red-300"
                      onClick={() => handleDelete(state.state_id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}

              {currentStates.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center p-4 text-gray-400">
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

      {/* MODAL SAME AS YOURS */}
      {showModal && selectedState && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 w-[400px] rounded-2xl p-6 border border-gray-700 relative"
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-gray-400 hover:text-white"
            >
              ✖
            </button>

            <h2 className="text-xl font-bold mb-4 text-white">
              {isEditMode ? "Edit State" : "State Details"}
            </h2>

            {isEditMode ? (
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">State Name</label>
                  <input
                    type="text"
                    name="state_name"
                    value={formData.state_name}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded"
                  />
                </div>

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
                  <span className="text-gray-400">State ID:</span>{" "}
                  {selectedState.state_id}
                </p>
                <p>
                  <span className="text-gray-400">State Name:</span>{" "}
                  {selectedState.state_name}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default States;