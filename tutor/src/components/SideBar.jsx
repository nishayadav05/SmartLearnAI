import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../services/Api";

// Icons
import { MdDashboard, MdOndemandVideo, MdMessage } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { FaUsers, FaPlusCircle, FaUserGraduate } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";

function SideBar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  // 🔹 Fetch logged user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await Api.get("/me");
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  // 🔹 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = () => setShowMenu(false);

    if (showMenu) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  // 🔹 Switch to student
  const handleStudentSwitch = async () => {
    try {
      const res = await Api.get("/get_student_by_user");

      if (res.data.exists) {
        window.location.href = "http://localhost:5173/home";
      } else {
        window.location.href = "http://localhost:5173/exampleprofile";
      }
    } catch (err) {
      console.error(err);
      alert("Please login first");
      window.location.href = "http://localhost:5173/login";
    }
  };

  const menuItems = [
    { icon: <MdDashboard />, label: "Dashboard", path: "/dashboard" },
    { icon: <MdOndemandVideo />, label: "My Courses", path: "/" },
    { icon: <FaPlusCircle />, label: "Create Course", path: "/courseupload" },
    { icon: <FaUsers />, label: "Students", path: "/" },
    { icon: <MdMessage />, label: "Messages", path: "/qnapage" },
    { icon: <IoSettingsSharp />, label: "Profile", path: "/instructorprofile" },
    // { icon: <FaUsers />, label: "Switch to Student", action: "student" },
  ];

  const handleLogout = async () => {
      try {
        await fetch("http://localhost:8000/logout", {
          method: "POST",
          credentials: "include", // ✅ IMPORTANT (for cookies)
        });

        // Optional: clear local storage
        localStorage.clear();

        // ✅ Redirect to landing page
        window.location.href="http://localhost:5173/"
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

  return (
    <div
      className={`
        h-screen bg-slate-900 text-white shadow-2xl 
        transition-all duration-300 ease-in-out 
        flex flex-col overflow-hidden fixed left-0 top-0 z-50
        ${open ? "w-64" : "w-16"}
      `}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* LOGO */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-700">
        <div className="text-blue-500 font-extrabold text-3xl">S</div>
        <span
          className={`text-lg font-semibold transition-all duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          SmartLearn.AI
        </span>
      </div>

      {/* MENU */}
      <ul className="px-3 mt-6 space-y-3">
        {menuItems.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              if (item.action === "student") {
                handleStudentSwitch();
              } else {
                item.path && navigate(item.path);
              }
            }}
            className="
              group relative flex items-center gap-4 p-3 rounded-lg cursor-pointer
              hover:bg-blue-600 hover:shadow-blue-500/40 hover:shadow-md
              transition-all duration-200
            "
          >
            <span className="text-xl">{item.icon}</span>

            {open && (
              <span className="text-sm font-medium">{item.label}</span>
            )}

            {!open && (
              <span
                className="
                  absolute left-14 bg-gray-800 px-2 py-1 rounded text-xs
                  opacity-0 group-hover:opacity-100 transition
                "
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>

      {/* PROFILE SECTION */}
      <div className="relative px-3 mt-auto mb-3">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="
            flex items-center gap-3 p-3 rounded-xl
            bg-gradient-to-r from-slate-800 to-slate-700
            hover:scale-105 transition-all duration-200
            shadow-lg cursor-pointer
          "
        >
          {/* IMAGE */}
          <img
            src={`http://localhost:8000/instructor_photo/${user?.user_id}`}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
            onError={(e) => {
              e.target.src =
                "https://cdn-icons-png.flaticon.com/512/149/149071.png";
            }}
          />

          {/* NAME */}
          {open && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold">
                {user?.fullname || "Instructor"}
              </span>
              <span className="text-xs text-gray-400">Instructor</span>
            </div>
          )}
        </div>

        {/* DROPDOWN */}
        {showMenu && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              absolute bottom-16 left-3 w-full
              bg-slate-800 rounded-xl shadow-xl
              border border-slate-700 overflow-hidden
            "
          >
            <div
              onClick={handleStudentSwitch}
              className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-blue-600 cursor-pointer transition"
            >
              <FaUserGraduate />
              Switch to Student
            </div>

            <div
                onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-red-600 cursor-pointer transition"
            >
              <RiLogoutCircleLine />
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;