import { useEffect, useState } from "react";
import Api from "../services/Api";
import { Home, User, BarChart2, BookOpen, Camera } from "lucide-react";
import { Link } from "react-router";

function Sidebar1() {
  const [user, setUser] = useState(null);

    useEffect(() => {
      Api.get("/me")
        .then(res => setUser(res.data))
        // .catch(() => alert("Unauthorized"));
    }, []);
  return (
    <div className="w-64 bg-slate-600 text-white p-6 sticky top-0 h-screen flex flex-col">

      {/* ===== Profile Section ===== */}
      <div className="flex flex-col items-center mb-10">
        
        <div className="relative group">
          
          {/* Profile Image */}
          <img
            src="https://lirp.cdn-website.com/18180652/dms3rep/multi/opt/UCI-Headshots-MFIN-372-640w.jpeg"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-400 shadow-lg"
          />

          {/* Camera Button */}
          <button className="absolute bottom-1 right-1 bg-indigo-600 p-2 rounded-full shadow-md 
                             hover:bg-indigo-700 transition group-hover:scale-110">
            <input type="file" className="hidden" id="profileUpload" /><Camera size={16} />
          </button>
        </div>

        <h2 className="mt-4 text-lg font-semibold">{user?.fullname}</h2>
        <p className="text-sm text-indigo-200">AI Learner</p>
      </div>

      {/* ===== Navigation ===== */}
      <nav className="space-y-6 flex-1">
        
        <Link
          to="/exampleprofile"
          className="flex items-center gap-3 hover:bg-indigo-600 px-4 py-2 rounded-lg transition"
        >
          <Home size={20} />
          Dashboard
        </Link>

        <Link
          to="/profilesection"
          className="flex items-center gap-3 hover:bg-indigo-600 px-4 py-2 rounded-lg transition"
        >
          <User size={20} />
          Profile
        </Link>

        <Link
          to="/analyticspage"
          className="flex items-center gap-3 hover:bg-indigo-600 px-4 py-2 rounded-lg transition"
        >
          <BarChart2 size={20} />
          Analytics
        </Link>

        <Link
          to="/coursepage"
          className="flex items-center gap-3 hover:bg-indigo-600 px-4 py-2 rounded-lg transition"
        >
          <BookOpen size={20} />
          Courses
        </Link>

      </nav>

    </div>
  );
}

export default Sidebar1;
