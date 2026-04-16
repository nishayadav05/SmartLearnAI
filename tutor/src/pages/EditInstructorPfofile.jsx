import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import Api from "../services/Api";

function EditInstructorProfile() {
  const navigate = useNavigate();

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [authUser, setAuthUser] = useState(null);

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
    photo: null,
  });

  // ================= LOAD USER + PROFILE =================
  useEffect(() => {
    const fetchData = async () => {
      const userRes = await Api.get("/me");
      const user = userRes.data;

      setAuthUser(user);

      const profileRes = await Api.get(
        `/get_instructor_by_user/${user.user_id}`
      );

      const data = profileRes.data;

      setFormData({
        fullname: user.fullname || "",
        gender: data.gender || "",
        mobile: data.mobile || "",
        qualification: data.qualification
          ? data.qualification.split(",")
          : [],
        experience: data.experience || "",
        skills: data.skills ? data.skills.split(",") : [],
        bio: data.bio || "",
        language: data.language ? data.language.split(",") : [],
        state_id: data.state_id || "",
        city_id: data.city_id || "",
        photo: null,
      });

      if (data.state_id) fetchCities(data.state_id);
    };

    fetchData();
  }, []);

  // ================= STATES =================
  useEffect(() => {
    Api.get("/states").then((res) => setStates(res.data));
  }, []);

  const fetchCities = async (stateId) => {
    const res = await Api.get(`/cities/${stateId}`);
    setCities(res.data);
  };

  // ================= HANDLERS =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMulti = (e, field) => {
    const value = e.target.value;

    if (value && !formData[field].includes(value)) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value],
      }));
    }
  };

  const removeItem = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((item) => item !== value),
    }));
  };

  // ================= SAVE =================
  const handleSave = async () => {
    try {
      const payload = new FormData();

      payload.append("gender", formData.gender);
      payload.append("mobile", formData.mobile);
      payload.append("qualification", formData.qualification.join(","));
      payload.append("bio", formData.bio);
      payload.append("experience", formData.experience);
      payload.append("state_id", formData.state_id);
      payload.append("city_id", formData.city_id);
      payload.append("language", formData.language.join(","));
      payload.append("skills", formData.skills.join(","));

      if (formData.photo) {
        payload.append("photo", formData.photo);
      }

      await Api.put(
        `/update_instructor_profile/${authUser.user_id}`,
        payload
      );

      alert("Profile Updated Successfully");
      navigate("/instructorprofile");

    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  // ================= OPTIONS =================
  const skillOptions = ["React","Node.js","Python","AI","ML","UI/UX"];
  const languageOptions = ["English","Hindi","Gujarati"];
  const qualificationOptions = ["BCA - Bachelor of Computer Applications",
  "BSc CS - Bachelor of Science in Computer Science",
  "BSc IT - Bachelor of Science in Information Technology",
  "B.Tech CS - Bachelor of Technology in Computer Science",
  "B.Tech IT - Bachelor of Technology in Information Technology",
  "B.Tech AI & ML - Bachelor of Technology in Artificial Intelligence & Machine Learning",
  "B.E CE - Bachelor of Engineering in Computer Engineering",
  "BCom - Bachelor of Commerce",
  "BBA - Bachelor of Business Administration",
  "BA - Bachelor of Arts",

  "MCA - Master of Computer Applications",
  "MSc CS - Master of Science in Computer Science",
  "MSc DS - Master of Science in Data Science",
  "M.Tech CS - Master of Technology in Computer Science",
  "MBA IT - Master of Business Administration in Information Technology",
  "MBA BA - Master of Business Administration in Business Analytics",

  "Diploma CE - Diploma in Computer Engineering",
  "Diploma IT - Diploma in Information Technology",

  "Self-Taught - Self Learned (No Formal Degree)",
  "Working Professional IT - Industry Experience in IT",
  "Working Professional Non-IT - Industry Experience in Non-IT",

  "Computer Science - Field of Study",
  "Information Technology - Field of Study",
  "Artificial Intelligence - Field of Study",
  "Data Science - Field of Study",
  "Cyber Security - Field of Study",
  "Business Administration - Field of Study",
  "Commerce - Field of Study",
  "Arts - Field of Study"
];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <SideBar />

      <div className="flex-1 p-8 flex justify-center">
        <div className="w-full max-w-5xl space-y-6">

          {/* HEADER */}
      <div className="bg-white p-6 rounded-2xl shadow flex justify-between items-center">

  {/* LEFT SIDE */}
  <div className="flex items-center gap-4">

    {/* IMAGE */}
    <div className="relative group">
      <img
        src={
          formData.photo
            ? URL.createObjectURL(formData.photo)
            : `http://localhost:8000/instructor_photo/${authUser?.user_id}`
        }
        alt="profile"
        className="w-20 h-20 rounded-full object-cover border-4 border-indigo-500"
      />

      {/* EDIT ICON */}
      <label className="
        absolute bottom-0 right-0 bg-indigo-600 text-white 
        rounded-full p-2 cursor-pointer text-xs
        opacity-0 group-hover:opacity-100 transition
      ">
        ✏️
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) =>
            setFormData({ ...formData, photo: e.target.files[0] })
          }
        />
      </label>
    </div>

    {/* NAME */}
    <div>
      <h2 className="text-xl font-bold">{formData.fullname}</h2>
      <p className="text-gray-500 text-sm">{authUser?.email}</p>
    </div>
  </div>

  {/* RIGHT SIDE BUTTONS */}
  <div className="flex gap-3">
    <button
      onClick={() => navigate("/instructorprofile")}
      className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
    >
      Cancel
    </button>

    <button
      onClick={handleSave}
      className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
    >
      Save
    </button>
  </div>

</div>

          {/* FORM */}
          <div className="bg-white p-6 rounded-2xl shadow grid md:grid-cols-2 gap-4">

            <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" className="border p-2 rounded"/>

            <select name="gender" value={formData.gender} onChange={handleChange} className="border p-2 rounded">
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <input name="experience" value={formData.experience} onChange={handleChange} placeholder="Experience" className="border p-2 rounded"/>

            <select name="state_id" value={formData.state_id} onChange={(e)=>{handleChange(e); fetchCities(e.target.value)}} className="border p-2 rounded">
              <option value="">State</option>
              {states.map(s=><option key={s.state_id} value={s.state_id}>{s.state_name}</option>)}
            </select>

            <select name="city_id" value={formData.city_id} onChange={handleChange} className="border p-2 rounded">
              <option value="">City</option>
              {cities.map(c=><option key={c.city_id} value={c.city_id}>{c.city_name}</option>)}
            </select>

            <input type="file" onChange={(e)=>setFormData({...formData, photo:e.target.files[0]})} className="border p-2 rounded"/>

          </div>

          {/* BIO */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" className="w-full border p-2 rounded"/>
          </div>

          {/* SKILLS */}
          <Section title="Skills" data={formData.skills} options={skillOptions} onAdd={(e)=>handleMulti(e,"skills")} onRemove={(val)=>removeItem("skills",val)} />

          {/* QUALIFICATION */}
          <Section title="Qualification" data={formData.qualification} options={qualificationOptions} onAdd={(e)=>handleMulti(e,"qualification")} onRemove={(val)=>removeItem("qualification",val)} />

          {/* LANGUAGE */}
          <Section title="Languages" data={formData.language} options={languageOptions} onAdd={(e)=>handleMulti(e,"language")} onRemove={(val)=>removeItem("language",val)} />

        </div>
      </div>
    </div>
  );
}

export default EditInstructorProfile;


// 🔥 REUSABLE SECTION
function Section({ title, data, options, onAdd, onRemove }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="font-semibold mb-3">{title}</h3>

      <select onChange={onAdd} className="border p-2 rounded w-full mb-3">
        <option value="">Select {title}</option>
        {options.map((o, i) => (
          <option key={i} value={o}>{o}</option>
        ))}
      </select>

      <div className="flex flex-wrap gap-2">
        {data.map((item, i) => (
          <span key={i} className="bg-indigo-100 px-3 py-1 rounded-full text-sm flex items-center gap-2">
            {item}
            <button onClick={()=>onRemove(item)}>✕</button>
          </span>
        ))}
      </div>
    </div>
  );
}