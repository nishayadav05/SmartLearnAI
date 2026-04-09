// import Sidebar from "../components/Sidebar";
// import { useState, useEffect } from "react";
// import Api from "../Api";
// import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

// function Contacts() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 5;

//   const [contactData, setContactData] = useState([]);
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//   message: ""
// });

//   // VIEW
//   const handleView = (data) => {
//     setSelectedContact(data);
//     setShowModal(true);
//   };

//   const handleEdit = (data) => {
//     setSelectedContact(data);

//     setFormData({
//       message: data.message
//     });

//     setIsEditMode(true);
//     setShowModal(true);
//   };
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };
//   const handleUpdate = async () => {
//     try {
//       const form = new FormData();
//       form.append("message", formData.message);

//       await Api.put(`/update_contact/${selectedContact.contact_id}`, form);

//       //update UI without refresh
//       setContactData((prev) =>
//         prev.map((item) =>
//           item.contact_id === selectedContact.contact_id
//             ? { ...item, message: formData.message }
//             : item
//         )
//       );

//       alert("Contact updated successfully");
//       closeModal();

//     } catch (error) {
//       console.error(error.response?.data);
//       alert("Update failed");
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedContact(null);
//     setIsEditMode(false);
//   };

//   const handleDelete = async (contact_id) => {
//       if (!contact_id) {
//         console.error("Invalid contact_id:", contact_id);
//         return;
//       }

//       if (window.confirm("Are you sure you want to delete this contact?")) {
//         try {
//           await Api.delete(`/contact/${contact_id}`);

//           setContactData((prev) =>
//             prev.filter((contact) => contact.contact_id !== contact_id)
//           );
//           alert("Contact deleted successfully!");
//         } catch (error) {
//           console.error("Error deleting contact:", error);
//           alert("Failed to delete contact.");
//         }
//       }
//     };


//   // FETCH DATA
//   const fetchdata = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const response = await Api.get("/contact_display", {
//         headers: {
//           Authorization: `Bearer ${token}`, // IMPORTANT
//         },
//       });

//       setContactData(response.data);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchdata();
//   }, []);

//   // PAGINATION
//   const totalPages = Math.ceil(contactData.length / rowsPerPage);
//   const lastIndex = currentPage * rowsPerPage;
//   const firstIndex = lastIndex - rowsPerPage;
//   const currentContacts = contactData.slice(firstIndex, lastIndex);

//   return (
//     <div className="flex bg-gray-900 min-h-screen w-full text-gray-200">
//       <Sidebar />

//       <div className="ml-64 p-6 w-full">
//         <h1 className="text-3xl font-bold mb-6 text-white">Contacts</h1>

//         <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">

//           {/* TABLE */}
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="text-left border-b border-gray-700 text-gray-400 uppercase text-sm">
//                   <th className="p-3">Contact ID</th>
//                   <th className="p-3">User ID</th>
//                   <th className="p-3">Message</th>
//                   <th className="p-3">Created At</th>
//                   <th className="p-3 text-center">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {currentContacts.map((data) => (
//                   <tr
//                     key={data.contact_id}
//                     className="border-b border-gray-700 hover:bg-gray-700 transition"
//                   >
//                     <td className="p-3 text-blue-400 font-semibold">
//                       {data.contact_id}
//                     </td>

//                     <td className="p-3">{data.user_id}</td>

//                     <td className="p-3 max-w-[250px]">
//                       {data.message.length > 50
//                         ? data.message.substring(0, 50) + "..."
//                         : data.message}
//                     </td>

//                     <td className="p-3">{data.created_at}</td>

//                     <td className="p-3 flex gap-3 justify-center">
//                       {/* VIEW */}
//                       <button
//                         className="text-blue-400 hover:text-blue-300"
//                         onClick={() => handleView(data)}
//                       >
//                         <FaEye />
//                       </button>

//                   {/* EDIT */}
//                   <button className="text-yellow-400 hover:text-yellow-300" onClick={() => handleEdit(data)}><FaEdit /></button>


//                       {/* DELETE (optional) */}
//                       <button className="text-red-400 hover:text-red-300" onClick={() => handleDelete(data.contact_id)}>
//                         <FaTrash />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* PAGINATION */}
//           <div className="flex justify-end gap-2 mt-6">
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
//               className="px-4 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-40">
//               Next
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* MODAL */}
//       {showModal && selectedContact && (
//         <div
//           className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
//           onClick={() => setShowModal(false)}
//         >
//           <div
//             onClick={(e) => e.stopPropagation()}
//             className="bg-gray-900 w-[500px] rounded-2xl p-6 border border-gray-700 relative"
//           >
//             {/* CLOSE */}
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-3 right-4 text-gray-400 hover:text-white"
//             >
//               ✖
//             </button>

//             <h2 className="text-xl font-bold mb-4 text-white">
//              {isEditMode ? "Edit Contact" : "Contact Details"}
//             </h2>

//           {isEditMode ? (
//             <div className="space-y-4">

//               <div>
//                 <label className="text-gray-400 text-sm">Message</label>
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded"
//                 />
//               </div>

//               <div className="flex justify-end gap-3">
//                 <button
//                   onClick={closeModal}
//                   className="px-4 py-2 bg-gray-700 rounded"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   onClick={handleUpdate}
//                   className="px-4 py-2 bg-yellow-500 rounded text-black font-semibold"
//                 >
//                   Update
//                 </button>
//               </div>

//             </div>
//           ) : (
//             <div className="space-y-3 text-sm">
//               <p><span className="text-gray-400">Contact ID:</span> {selectedContact.contact_id}</p>
//               <p><span className="text-gray-400">User ID:</span> {selectedContact.user_id}</p>
//               <p><span className="text-gray-400">Message:</span> {selectedContact.message}</p>
//               <p><span className="text-gray-400">Created At:</span> {selectedContact.created_at}</p>

//               <div className="text-right mt-5">
//                 <button
//                   onClick={closeModal}
//                   className="px-5 py-2 bg-blue-600 rounded hover:bg-blue-500"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           )}
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

// export default Contacts;

import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import Api from "../Api";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

// ✅ ADD THESE
import SearchBar from "../components/SearchBar";
import { prioritySearch } from "../utils/searchUtils";

function Contacts() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [contactData, setContactData] = useState([]);
  const [search, setSearch] = useState(""); // ✅ NEW

  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    message: ""
  });

  // VIEW
  const handleView = (data) => {
    setSelectedContact(data);
    setShowModal(true);
  };

  const handleEdit = (data) => {
    setSelectedContact(data);

    setFormData({
      message: data.message
    });

    setIsEditMode(true);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      const form = new FormData();
      form.append("message", formData.message);

      await Api.put(`/update_contact/${selectedContact.contact_id}`, form);

      setContactData((prev) =>
        prev.map((item) =>
          item.contact_id === selectedContact.contact_id
            ? { ...item, message: formData.message }
            : item
        )
      );

      alert("Contact updated successfully");
      closeModal();

    } catch (error) {
      console.error(error.response?.data);
      alert("Update failed");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedContact(null);
    setIsEditMode(false);
  };

  const handleDelete = async (contact_id) => {
    if (!contact_id) return;

    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await Api.delete(`/contact/${contact_id}`);

        setContactData((prev) =>
          prev.filter((contact) => contact.contact_id !== contact_id)
        );

        alert("Contact deleted successfully!");
      } catch (error) {
        console.error(error);
        alert("Failed to delete contact.");
      }
    }
  };

  // FETCH
  const fetchdata = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await Api.get("/contact_display", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContactData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  // ✅ APPLY SEARCH
  const filteredContacts = prioritySearch(contactData, search, [
    "contact_id",
    "user_id",
    "message",
    "created_at"
  ]);

  // PAGINATION
  const totalPages = Math.ceil(filteredContacts.length / rowsPerPage);
  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const currentContacts = filteredContacts.slice(firstIndex, lastIndex);

  return (
    <div className="flex bg-gray-900 min-h-screen w-full text-gray-200">
      <Sidebar />

      <div className="ml-64 p-6 w-full">
        <h1 className="text-3xl font-bold mb-6 text-white">Contacts</h1>

          <SearchBar
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by ID, user, message, date..."
          />

        <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">

         
          
          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b border-gray-700 text-gray-400 uppercase text-sm">
                  <th className="p-3">Contact ID</th>
                  <th className="p-3">User ID</th>
                  <th className="p-3">Message</th>
                  <th className="p-3">Created At</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentContacts.map((data) => (
                  <tr
                    key={data.contact_id}
                    className="border-b border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="p-3 text-blue-400 font-semibold">
                      {data.contact_id}
                    </td>

                    <td className="p-3">{data.user_id}</td>

                    <td className="p-3 max-w-[250px]">
                      {(data.message || "").length > 50
                        ? data.message.substring(0, 50) + "..."
                        : data.message}
                    </td>

                    <td className="p-3">{data.created_at}</td>

                    <td className="p-3 flex gap-3 justify-center">
                      <button
                        className="text-blue-400"
                        onClick={() => handleView(data)}
                      >
                        <FaEye />
                      </button>

                      <button
                        className="text-yellow-400"
                        onClick={() => handleEdit(data)}
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="text-red-400"
                        onClick={() => handleDelete(data.contact_id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}

                {currentContacts.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center p-4 text-gray-400">
                      No results found
                    </td>
                  </tr>
                )}
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

      {/* ✅ MODAL (UNCHANGED) */}
      {showModal && selectedContact && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 w-[500px] rounded-2xl p-6 border border-gray-700 relative"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-white"
            >
              ✖
            </button>

            <h2 className="text-xl font-bold mb-4 text-white">
              {isEditMode ? "Edit Contact" : "Contact Details"}
            </h2>

            {isEditMode ? (
              <div className="space-y-4">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded"
                />

                <div className="flex justify-end gap-3">
                  <button onClick={closeModal} className="px-4 py-2 bg-gray-700 rounded">
                    Cancel
                  </button>

                  <button onClick={handleUpdate} className="px-4 py-2 bg-yellow-500 rounded text-black">
                    Update
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-sm">
                <p><span className="text-gray-400">Contact ID:</span> {selectedContact.contact_id}</p>
                <p><span className="text-gray-400">User ID:</span> {selectedContact.user_id}</p>
                <p><span className="text-gray-400">Message:</span> {selectedContact.message}</p>
                <p><span className="text-gray-400">Created At:</span> {selectedContact.created_at}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Contacts;