import {
  FaHome,
  FaUsers,
  FaChalkboardTeacher,
  FaEnvelope,
  FaBookOpen,
  FaBlog,
  FaUserGraduate,
  FaCity,
  FaMapMarkedAlt,
  // FaUserCircle, 
  // FaChevronUp,
  FaChevronDown, 
  FaLock, 
  FaKey, 
  FaSignOutAlt
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";


function Sidebar() {

  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);
  const adminName = localStorage.getItem("adminName");
  const adminEmail = localStorage.getItem("adminEmail");
  const handleLogout = () => {
    // Clear auth data (if stored)
    localStorage.removeItem("token"); // optional
    sessionStorage.clear(); // optional

    // Redirect to login page
    navigate("/");
  };


  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
    ${
      isActive
        ? "bg-blue-600 text-white shadow-lg scale-[1.02]"
        : "text-gray-400 hover:bg-gray-700 hover:text-white hover:translate-x-1"
    }`;

  return (
    <div className="w-64 h-screen bg-gray-900 border-r border-gray-800 fixed flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-blue-500 tracking-wide">
          SmartLearn.AI
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          AI Learning Dashboard
        </p>
      </div>

      {/* Menu */}
      <ul className="space-y-2 px-4 mt-6 flex-1 overflow-y-auto">

        <NavLink to="/dashboard" className={menuClass}>
          <FaHome className="text-lg" />
          Dashboard
        </NavLink>

        <NavLink to="/users" className={menuClass}>
          <FaUsers className="text-lg" />
          Users
        </NavLink>

        <NavLink to="/student" className={menuClass}>
          <FaUserGraduate className="text-lg" />
          Students
        </NavLink>

        <NavLink to="/instructors" className={menuClass}>
          <FaChalkboardTeacher className="text-lg" />
          Instructors
        </NavLink>

        <NavLink to="/courses" className={menuClass}>
          <FaBookOpen className="text-lg" />
          Courses
        </NavLink>

        <NavLink to="/blogs" className={menuClass}>
          <FaBlog className="text-lg" />
          Blogs
        </NavLink>

        <NavLink to="/contacts" className={menuClass}>
          <FaEnvelope className="text-lg" />
          Contacts
        </NavLink>

        <NavLink to="/cities" className={menuClass}>
          <FaCity className="text-lg" />
          Cities
        </NavLink>

        <NavLink to="/states" className={menuClass}>
          <FaMapMarkedAlt className="text-lg" />
          States
        </NavLink>

      </ul>
      <div className="p-4 border-t border-gray-800">
        {/* <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg
                    text-gray-400 hover:bg-red-600 hover:text-white
                    transition-all duration-300"
        >
          <FaSignOutAlt className="text-lg" />
          Logout
        </button> */}
<div className=" border-t border-gray-800 relative">

  {/* Profile Section */}
  <div
    onClick={() => setOpenDropdown(!openDropdown)}
    className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-gray-800 transition-all"
  >
    {/* Avatar */}
    <div className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
  {adminName ? adminName.charAt(0).toUpperCase() : "A"}
</div>

    {/* Name + Email */}
   <div className="flex-1 min-w-0 overflow-hidden">
   <p className="text-sm font-semibold text-white break-words">
      {adminName || "Admin"}
    </p>
    <p
      className="text-xs text-gray-400 truncate w-full"
      title={adminEmail}
    >
      {adminEmail || "admin@gmail.com"}
    </p>
  </div>

    {/* Arrow */}
   <FaChevronDown
    className={`text-white text-sm ml-2 shrink-0 transition-transform duration-300 ${
      openDropdown ? "rotate-180" : ""
    }`}
  />
  </div>

  {/* Dropdown */}
  {openDropdown && (
    <div className="absolute bottom-20 left-2 right-2 bg-gray-900 border border-gray-700 rounded-xl shadow-xl overflow-hidden">

      <button
        onClick={() => navigate("/changepassword")}
        className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-green-500 hover:bg-gray-800 transition"
      >
        <FaLock />
        Change Password
      </button>

      <button
        onClick={() => navigate("/forgotpassword")}
        className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-yellow-400 hover:bg-gray-800 transition"
      >
        <FaKey />
        Forgot Password
      </button>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-600 hover:text-white transition"
      >
        <FaSignOutAlt />
        Logout
      </button>

    </div>
  )}

</div>
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-gray-800 text-xs text-gray-500 text-center">
        © 2026 SmartLearn.AI
      </div>

    </div>
  );
}

export default Sidebar;