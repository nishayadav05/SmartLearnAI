import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../services/Api";
import { Code, Brain, Monitor, Briefcase, User, Palette, Megaphone } from "lucide-react";

const menuItems = ["All","Beginner", "Intermediate", "Advanced"];
const categories = [
  { name: "Development", icon: <Code size={22} /> },
  { name: "Artificial Intelligence & Data Science", icon: <Brain size={22} /> },
  { name: "IT & Software", icon: <Monitor size={22} /> },
  { name: "Business", icon: <Briefcase size={22} /> },
  { name: "Personal Development", icon: <User size={22} /> },
  { name: "Design", icon: <Palette size={22} /> },
  { name: "Marketing", icon: <Megaphone size={22} /> },
];

function AllCourses() {
  const [active, setActive] = useState(0);
  const [coursedata, setCourseData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // const fetchdata = async () => {
  //   const response = await Api.get("/course_display");
  //   setCourseData(response.data);
  // };

  const fetchdata = async () => {
  const response = await Api.get("/course_display");
  console.log("Fetched courses:", response.data);
  
  console.log("Count:", response.data.length);
  setCourseData(response.data);
  console.log(response.data);
};
    
    const roleMap = [null, "Beginner", "Intermediate", "Advanced"];

    const filteredCourses = Array.isArray(coursedata)
    ? coursedata.filter((course) => {

      const skillMatch =
        roleMap[active] === null || course.skill_level === roleMap[active];

      const categoryMatch =
        selectedCategory === "All" || course.category === selectedCategory;

      return skillMatch && categoryMatch;
    })
  : [];


  useEffect(() => {
    fetchdata();
  }, []);
 
  
return (
    <div className="flex fullscreen w-[100%] h-[100%] bg-gradient-to-br from-white to-slate-100">
      <div className="ml-20 md:ml-24 p-10 w-full">
        <h1 className="text-3xl font-bold mb-4">All Courses</h1>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`px-6 py-3 text-sm font-medium transition ${
                active === index
                  ? "border-b-2 border-purple-600 text-purple-700"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex gap-12 bg-white p-6 rounded-xl shadow-sm mb-10 items-center">
        {categories.map((item, index) => (
            <div
                key={index}
                onClick={() => setSelectedCategory(item.name)}
                className={`flex flex-col items-center cursor-pointer transition
                ${selectedCategory === item.name ? "text-blue-600" : "text-gray-600"}
                hover:text-blue-600`}
            >
                <div className="mb-2">{item.icon}</div>
                <p className="text-sm font-medium">{item.name}</p>
            </div>
         ))}
        </div>
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {coursedata.length > 0 ? (
            filteredCourses.map((data) => (
              <Link
                to={`/coursedisplay/${data.course_id}`}
                // key={index}
                key={data.course_id}
                className="block bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer"
              >
                <div className="hover:scale-105 transition-transform duration-300">
                <div className="relative w-full overflow-hidden rounded-t-xl">
                  <img
                    src={`https://rwompwlcjbigfbnovqxu.supabase.co/storage/v1/object/public/course_thumbnail/${data.thumbnail}`}
                    alt={data.course_title}
                    className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                    {data.course_title}
                  </h3>

                  <div className="flex items-center gap-1 mt-1">
                    <span className="font-bold text-yellow-600 text-sm">
                      ⭐ {data.category || "4.7"}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-2 text-xs">
                    <p>For: {data.skill_level}</p>
                  </div>

                  <div className="flex gap-2 mt-2 text-xs">
                    <p>Prerequisites: {data.prerequisites}</p>
                  </div>
                   <div className="flex gap-2 mt-2 text-xs">
                    <p>{data.categories}</p>
                  </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-600">No courses found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllCourses;
