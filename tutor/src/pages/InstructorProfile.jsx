import { useEffect, useState, } from "react";
import SideBar from "../components/SideBar";
import Api from "../services/Api";
import { useNavigate } from "react-router-dom";
function InstructorProfile() {

const [isEditing, setIsEditing] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    gender: "",
    mobile: "",
    qualification: [],
    experience: "",
    skills: [],
    bio: "",
    language: [],
    state_id: "",
    city_id: "",
  });

  // ================= GET USER + PROFILE =================
  useEffect(() => {
    const fetchUserAndProfile = async () => {
      try {
        //  Get logged user
        const res = await Api.get("/me");

        const user = res.data;
        setAuthUser(user);

        setFormData((prev) => ({
          ...prev,
          fullname: user.fullname || "",
        }));

        //  CALL PROFILE API (IMPORTANT FIX)
        fetchInstructor(user.user_id);

      } catch (err) {
        console.log("USER ERROR:", err);
      }
    };

    fetchUserAndProfile();
  }, []);

  // ================= FETCH INSTRUCTOR PROFILE =================
  const fetchInstructor = async (user_id) => {
    try {
      const res = await Api.get(`/get_instructor_by_user/${user_id}`);

      const data = res.data;
      console.log("PROFILE DATA:", data);

      setFormData((prev) => ({
        ...prev,
        gender: data.gender || "",
        mobile: data.mobile || "",
        qualification: data.qualification
        ? data.qualification.split(",").map((q) => q.trim())
        : [],
        experience: data.experience || "",
        skills: data.skills ? data.skills.split(",") : [],
        bio: data.bio || "",
        language: data.language ? data.language.split(",") : [],
        state_id: data.state_id || "",
        city_id: data.city_id || "",
      }));

      if (data.state_id) {
        fetchCities(data.state_id);
      }

    } catch (err) {
      console.log("PROFILE ERROR:", err);
    }
  };

  // ================= LOAD STATES =================
  useEffect(() => {
    Api.get("/states")
      .then((res) => setStates(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ================= LOAD CITIES =================
  const fetchCities = async (stateId) => {
    try {
      const res = await Api.get(`/cities/${stateId}`);
      setCities(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ================= STATE CHANGE =================
  const handleStateChange = (e) => {
    const stateId = e.target.value;

    setFormData((prev) => ({
      ...prev,
      state_id: stateId,
      city_id: "",
    }));

    if (stateId) {
      fetchCities(stateId);
    } else {
      setCities([]);
    }
  };

  // ================= MULTI SELECT =================
  const handleMultiSelect = (e, field) => {
    const selected = Array.from(e.target.selectedOptions, (o) => o.value);

    setFormData((prev) => ({
      ...prev,
      [field]: selected,
    }));
  };

  // ================= SAVE PROFILE =================
  const handleSave = async () => {
    try {
      await Api.post(`/insert_update_instructor_profile`, {
        gender: formData.gender || null,
        mobile: formData.mobile || null,
        qualification: formData.qualification.length ? formData.qualification.join(",") : null,
        experience: formData.experience || null,
        bio: formData.bio || null,
        state_id: formData.state_id ? Number(formData.state_id) : null,
        city_id: formData.city_id ? Number(formData.city_id) : null,
        skills: formData.skills.length ? formData.skills.join(",") : null,
        language: formData.language.length ? formData.language.join(",") : null,
      });

      alert("Profile Updated Successfully!");
      setIsEditing(false);
    } catch (err) {
      console.log(err.response?.data);
      alert("Update Failed");
    }
  };



  const skillOptions = [ // Programming
  "C", "C++", "Java", "Python", "JavaScript",

  // Development
  "Full Stack Development",
  "Frontend Development",
  "Backend Development",
  "React",
  "Angular",
  "Node.js",

  // AI / Data
  "Machine Learning",
  "Deep Learning",
  "Artificial Intelligence",
  "Data Science",
  "Data Analytics",
  "Generative AI",
  "Natural Language Processing (NLP)",
  "Computer Vision",

  // DevOps / Cloud
  "DevOps",
  "Cloud Computing",
  "AWS",
  "Azure",
  "Docker",
  "Kubernetes",

  // Security / Blockchain
  "Cyber Security",
  "Ethical Hacking",
  "Blockchain",
  "Web3",

  // Marketing
  "Digital Marketing",
  "Social Media Marketing",
  "Search Engine Optimization (SEO)",
  "Google Ads",
  "Meta Ads",
  "Content Marketing",
  "Email Marketing",
  "Affiliate Marketing",
  "Influencer Marketing",
  "Performance Marketing",

  // Business / Management
  "Business Development",
  "Product Management",
  "Project Management",
  "Entrepreneurship",
  "Startup Strategy",
  "Business Analytics",

  // Design / Creative
  "UI/UX Design",
  "Graphic Design",
  "Video Editing",
  "Motion Graphics",
  "Content Creation",
  "Personal Branding",

  // Modern Tech
  "No-Code / Low-Code Development",
  "Automation",
  "Prompt Engineering",
  "AR/VR",
  "Internet of Things (IoT)"];

  const languageOptions = ["English",
  "Hindi",
  "Gujarati",
  "Marathi",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Punjabi",
  "Bengali",
  "Urdu"];

  const QualificationOptions = [ "BCA",
    "BSc - Computer Science",
    "BSc - IT",
    "B.Tech - Computer Science",
    "B.Tech - IT",
    "B.Tech - AI & ML",
    "B.E - Computer Engineering",
    "BCom - Bachelor of Commerce",
    "BBA",
    "BA",
    "MCA",
    "MSc - Computer Science",
    "MSc - Data Science",
    "M.Tech - Computer Science",
    "MBA - IT",
    "MBA - Business Analytics",
    "Diploma - Computer Engineering",
    "Diploma - IT",
    "Self-Taught",
    "Working Professional - IT",
    "Working Professional - Non-IT",
    "Computer Science",
    "Information Technology",
    "Artificial Intelligence",
    "Data Science",
    "Cyber Security",
    "Business Administration",
    "Commerce",
    "Arts",]



return (
  <div className="min-h-screen bg-gray-100 flex">
  <SideBar />

  <div className="flex-1 p-8">
    <div className="max-w-5xl mx-auto space-y-6">

      {/* HEADER */}
      <div className="bg-white p-6 rounded-2xl shadow flex justify-between items-center">

  {/* LEFT SIDE (PHOTO + INFO) */}
  <div className="flex items-center gap-4">

    {/* PROFILE PHOTO */}
    <img
      src={`http://localhost:8000/instructor_photo/${authUser?.user_id}`}
      alt="profile"
      className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
      onError={(e) => {
        e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
      }}
    />

    {/* NAME + EMAIL */}
    <div>
      <h2 className="text-xl font-bold text-gray-800">
        {formData.fullname || "No Name"}
      </h2>
      <p className="text-gray-500 text-sm">{authUser?.email}</p>
    </div>

  </div>

  {/* EDIT BUTTON */}
  <button
    onClick={() => navigate("/editinstructorprofile")}
    className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
  >
    Edit Profile
  </button>

</div>

      {/* BASIC INFO */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Basic Information
        </h3>

        <div className="grid md:grid-cols-2 gap-4 text-gray-700">
          <p><span className="font-semibold">Gender:</span> {formData.gender || "-"}</p>
          <p><span className="font-semibold">Mobile:</span> {formData.mobile || "-"}</p>
          <p><span className="font-semibold">Experience:</span> {formData.experience || "-"} years</p>
          <p>
            <span className="font-semibold">State:</span>{" "}
            {states.find(s => s.state_id == formData.state_id)?.state_name || "-"}
          </p>
          <p>
            <span className="font-semibold">City:</span>{" "}
            {cities.find(c => c.city_id == formData.city_id)?.city_name || "-"}
          </p>
        </div>
      </div>

      {/* BIO */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-2 border-b pb-2">
          About
        </h3>
        <p className="text-gray-600">
          {formData.bio || "No bio available"}
        </p>
      </div>

      {/* QUALIFICATIONS */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Qualifications
        </h3>

        <div className="flex flex-wrap gap-2">
          {formData.qualification.length > 0 ? (
            formData.qualification.map((q, i) => (
              <span
                key={i}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
              >
                {q}
              </span>
            ))
          ) : (
            <p className="text-gray-500">No data</p>
          )}
        </div>
      </div>

      {/* SKILLS */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Skills
        </h3>

        <div className="flex flex-wrap gap-2">
          {formData.skills.length > 0 ? (
            formData.skills.map((skill, i) => (
              <span
                key={i}
                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-gray-500">No data</p>
          )}
        </div>
      </div>

      {/* LANGUAGES */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Languages
        </h3>

        <div className="flex flex-wrap gap-2">
          {formData.language.length > 0 ? (
            formData.language.map((lang, i) => (
              <span
                key={i}
                className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
              >
                {lang}
              </span>
            ))
          ) : (
            <p className="text-gray-500">No data</p>
          )}
        </div>
      </div>

    </div>
  </div>
</div>

);
}
export default InstructorProfile;


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import SideBar from "../components/SideBar";
// import Api from "../services/Api";

// function InstructorProfile() {
//   const [profile, setProfile] = useState(null);
//   const [user, setUser] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userRes = await Api.get("/me");
//         setUser(userRes.data);

//         const profileRes = await Api.get(
//           `/get_instructor_by_user/${userRes.data.user_id}`
//         );

//         if (profileRes.data.exists) {
//           setProfile(profileRes.data);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="flex bg-gray-100 min-h-screen">
//       <SideBar />

//       <div className="flex-1 p-8 flex justify-center items-start">
//         <div className="w-full max-w-5xl">

//           {/* CARD */}
//           <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">

//             {/* HEADER */}
//             <div className="flex justify-between items-center border-b pb-4">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   Instructor Profile
//                 </h2>
//                 <p className="text-gray-500 text-sm">
//                   Your professional information
//                 </p>
//               </div>

//               <button
//                 onClick={() => navigate("/edit-instructor-profile")}
//                 className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
//               >
//                 Edit Profile
//               </button>
//             </div>

//             {/* PROFILE IMAGE */}
//             <div className="flex items-center gap-5">
//               <img
//                 src={`http://localhost:8000/instructor_photo/${user?.user_id}`}
//                 className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500"
//                 alt="profile"
//               />

//               <div>
//                 <h3 className="text-xl font-semibold">
//                   {user?.fullname || "Instructor"}
//                 </h3>
//                 <p className="text-gray-500">{user?.email}</p>
//               </div>
//             </div>

//             {/* DATA GRID */}
//             <div className="grid md:grid-cols-2 gap-6 text-sm">

//               <ProfileItem label="Gender" value={profile?.gender} />
//               <ProfileItem label="Mobile" value={profile?.mobile} />
//               <ProfileItem label="Experience" value={profile?.experience + " Years"} />
//               <ProfileItem label="State" value={profile?.state_id} />
//               <ProfileItem label="City" value={profile?.city_id} />

//             </div>

//             {/* FULL WIDTH */}
//             <ProfileBlock label="Qualification" value={profile?.qualification} />
//             <ProfileBlock label="Skills" value={profile?.skills} />
//             <ProfileBlock label="Languages" value={profile?.language} />
//             <ProfileBlock label="Bio" value={profile?.bio} />

//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default InstructorProfile;


// function ProfileItem({ label, value }) {
//   return (
//     <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
//       <p className="text-gray-500 text-xs">{label}</p>
//       <p className="font-semibold text-gray-800 mt-1">
//         {value || "Not provided"}
//       </p>
//     </div>
//   );
// }

// function ProfileBlock({ label, value }) {
//   return (
//     <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
//       <p className="text-gray-500 text-xs mb-1">{label}</p>
//       <p className="text-gray-800">
//         {value || "Not provided"}
//       </p>
//     </div>
//   );
// }


