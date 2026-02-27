// import SideBar from "./SideBar";
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Api from "./Api";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { useRef } from "react";
// import { supabase } from "./supabase.jsx";

// function CourseDetail() {
//   const { id } = useParams();

//   const [coursedata, setCourseData] = useState([]);
//   const [course, setCourse] = useState(null);
//   const videoRef = useRef(null);
//   // Fetch "More Courses"
//   const fetchdata = async () => {
//     const response = await Api.get("/course_display");
//     setCourseData(response.data);
//   };

// // const videoUrl = supabase.storage
// //   .from("course_videos")
// //   .getPublicUrl(course.video).data.publicUrl;

// // const videoUrl = course
// //   ? supabase.storage.from("course_videos").getPublicUrl(course.video).data.publicUrl
// //   : null;


//   useEffect(() => {
//     fetchdata();
//   }, []);

//   // Fetch Single Course Data
//   useEffect(() => {
//     axios
//       .get(`http://localhost:8000/single_video_data/${id}`)
//       .then((res) => setCourse(res.data))
//       .catch((err) => console.log(err));
//   }, [id]);

//   // scroll to the video section
// useEffect(() => {
//   setCourse(null);   // ⬅️ force loading + refresh video

//   axios
//     .get(`http://localhost:8000/single_video_data/${id}`)
//     .then((res) => {
//       setCourse(res.data);

//       setTimeout(() => {
//         videoRef.current?.scrollIntoView({ behavior: "smooth" });
//       }, 300);
//     })
//     .catch((err) => console.log(err));
// }, [id]);


//   if (!course) {
//   return <div className="text-center mt-20 text-xl">Loading course...</div>;
//   }
//   const videoUrl = supabase.storage
//     .from("course_videos")
//     .getPublicUrl(course.video).data.publicUrl;


//   return (
//     <div className="w-full min-h-screen bg-gray-100">

//       {/* ====================== TOP HEADER ====================== */}
//      <header className="w-full fixed top-0 left-0 bg-white/70 backdrop-blur-sm shadow-sm 
//                    z-50 py-3 px-5 md:px-10 flex items-center justify-between">

//   {/* LEFT — BACK + LOGO */}
//   <div className="flex items-center gap-4">
//       <Link  to={'/'}>
//     {/* BACK BUTTON */}
//     {/* <a
//       href="/mycourse"
//       className="flex items-center justify-center w-9 h-9 rounded-full 
//                  hover:bg-gray-200 transition cursor-pointer"
//       title="Back"
//     >
//       <span className="text-2xl font-bold text-gray-700">←</span>
//     </a> */}
//     </Link>

//     {/* LOGO */}
//     <div className="flex items-center gap-1 cursor-pointer">
//       <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 
//                      bg-clip-text text-transparent">
//         SmartLearn
//       </h2>
//       <span className="text-xs font-bold text-gray-600">AI</span>
//     </div>

//   </div>

//   {/* CENTER — COURSE TITLE */}
//   <h1 className="hidden md:block text-lg font-semibold text-gray-900 truncate max-w-[400px] text-center">
//     {course.course_title}
//   </h1>

//   {/* RIGHT — INSTRUCTOR */}
//   <div className="flex items-center gap-3 hover:bg-gray-100 px-3 py-1 rounded-lg transition">
//     <img
//       // src="/images/author_logo.png"
//       src={
//   course 
//     ? supabase.storage
//         .from("course_videos")
//         .getPublicUrl(course.video).data.publicUrl
//     : ""
// }

//       className="w-10 h-10 rounded-full border shadow"
//     />
//     <div>
//       <p className="text-sm font-semibold">{course.author}</p>
//       <p className="text-xs text-gray-500">Instructor</p>
//     </div>
//   </div>

// </header>

    
//       {/* ====================== PAGE CONTENT ====================== */}
//       <div className="mx-auto max-w-6xl pt-28 px-4 md:px-8 pb-16 space-y-10">
// {/* BACK BUTTON BELOW HEADER LEFT SIDE */}


//         {/* --------------------- VIDEO PLAYER --------------------- */}
//        <div ref={videoRef} className="w-full bg-black rounded-xl shadow overflow-hidden">
//           <video
//             className="w-full h-[260px] md:h-[480px] object-cover"
//             controls
//           >
//             <source
//               // src={`http://localhost:8000/images/coursevideo/${course.video}`}
//               src={course.videoUrl} 
//               type="video/mp4"
//                  />
//           </video>
//         </div>

//         {/* --------------------- COURSE DESCRIPTION --------------------- */}
//         <div className="bg-white rounded-xl shadow p-6 md:p-8 space-y-6">

//           {/* Author & Price Row */}
//       <div className="bg-white rounded-xl shadow p-6 md:p-8 space-y-6">

//   {/* Author & Price Row */}
//   <div className="flex justify-between items-center border-b pb-5 flex-wrap gap-4">
//     <div>
//       <h2 className="text-xl font-bold text-gray-900">{course.author}</h2>
//       <p className="text-sm text-gray-600">{course.course_date}</p>
//     </div>

//     <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white 
//                        rounded-full font-semibold shadow hover:opacity-90">
//       ₹{course.course_price}
//     </button>
//   </div>

//   {/* What will you learn */}
//   <div className="mt-4">
//     <h3 className="text-xl font-semibold text-gray-900 mb-3">
//       What will you learn
//     </h3>

//     <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 text-sm">
//       {/* Use your real data if available */}
//       <li className="flex items-start gap-2">
//         <span className="text-green-600 text-lg">✔</span>
//         Learn the fundamentals of {course.course_title}
//       </li>
//       <li className="flex items-start gap-2">
//         <span className="text-green-600 text-lg">✔</span>
//         Hands-on practical exercises
//       </li>
//       <li className="flex items-start gap-2">
//         <span className="text-green-600 text-lg">✔</span>
//         Real-world project building
//       </li>
//       <li className="flex items-start gap-2">
//         <span className="text-green-600 text-lg">✔</span>
//         Improve your career & job skills
//       </li>
//     </ul>
//   </div>
// </div>

          

//           {/* Description */}
//           <div>
//             <h3 className="text-2xl font-semibold mb-2 text-gray-900">
//               About this Course
//             </h3><p className="text-gray-700 leading-relaxed">You learn in this course:{course.tag}</p>
//             <p className="text-gray-700 leading-relaxed">
//               {course.description}
//             </p>
//           </div>
//         </div>

//         {/* --------------------- OTHER COURSES --------------------- */}
//         <div className="bg-white rounded-xl shadow p-6 space-y-6">
//           <h3 className="text-xl font-semibold text-gray-900">More Courses</h3>
//           {coursedata
//               .filter((c) => c.course_id !== Number(id))
//               .map((data,i) => (
//           // {coursedata.map((data, i) => (
//            <Link
//                 to={`/coursedetail/${data.course_id}`}
//                 // key={index}
//                 key={data.course_id}
//                 className="block bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer"
//               >
        
//             <div
//               //  key={data.course_id}
//               className="flex gap-4 cursor-pointer hover:bg-gray-50 p-3 rounded-lg 
//                          transition-all duration-300 hover:shadow-md"
//             >
//               {/* Thumbnail */}
//               <div className="w-32 h-20 md:w-40 md:h-28 bg-gray-200 rounded-lg overflow-hidden">
//                 <img
//                   src={data.thumbnail}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               {/* Course Info */}
//               <div className="flex flex-col justify-between flex-1">
//                 <h4 className="text-sm font-semibold text-gray-900">
//                   {data.course_title}
//                 </h4>
//                 <p className="text-xs text-gray-600">Skill Level: {data.skill_level}</p>

//                 <p className="text-xs text-gray-600">{data.course_date}</p>
//               </div>

//               <div className="text-gray-600 text-xl">⋮</div>
//             </div>
//             </Link>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// }

// export default CourseDetail;



import SideBar from "../components/SideBar.jsx";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Api from "../services/Api";
import axios from "axios";
import { supabase } from "../supabase.jsx";

function CourseDetail() {
  const { id } = useParams();
  const [coursedata, setCourseData] = useState([]);
  const [course, setCourse] = useState(null);
  const videoRef = useRef(null);

  // Fetch all courses
  useEffect(() => {
    const fetchData = async () => {
      const response = await Api.get("/course_display");
      setCourseData(response.data);
    };
    fetchData();
  }, []);

  // Fetch single course based on ID
  useEffect(() => {
    setCourse(null); // loading state

    axios
      .get(`http://localhost:8000/single_video_data/${id}`)
      .then((res) => {
        setCourse(res.data);

        // Scroll to video
        setTimeout(() => {
          videoRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      })
      .catch((err) => console.log(err));
  }, [id]);
  
  // Wait for course before rendering
  if (!course) {
    return <div className="text-center mt-20 text-xl">Loading course...</div>;
  }

  // Generate Signed/Public Video URL from Supabase
  // const videoUrl = supabase.storage
  //   .from("course_videos")
  //   .getPublicUrl(course.video).data.publicUrl;
  const videoUrl = course.video_url;

  return (
    <div className="w-full min-h-screen bg-gray-100">

      {/* ====================== HEADER ====================== */}
      <header className="w-full fixed top-0 left-0 bg-white/70 backdrop-blur-sm shadow-sm 
        z-50 py-3 px-5 md:px-10 flex items-center justify-between">

        <div className="flex items-center gap-4">
          <Link to={"/"}>
            {/* Back button (optional) */}
          </Link>

          <div className="flex items-center gap-1 cursor-pointer">
            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 
              bg-clip-text text-transparent">
              SmartLearn
            </h2>
            <span className="text-xs font-bold text-gray-600">AI</span>
          </div>
        </div>

        {/* Course Title */}
        <h1 className="hidden md:block text-lg font-semibold text-gray-900 truncate max-w-[400px]">
          {course.course_title}
        </h1>

        {/* Instructor */}
        <div className="flex items-center gap-3 hover:bg-gray-100 px-3 py-1 rounded-lg transition">
          <img
            src="/images/author_logo.png"
            className="w-10 h-10 rounded-full border shadow"
          />
          <div>
            <p className="text-sm font-semibold">{course.author}</p>
            <p className="text-xs text-gray-500">Instructor</p>
          </div>
        </div>
      </header>

      {/* ====================== PAGE CONTENT ====================== */}
      <div className="mx-auto max-w-6xl pt-28 px-4 md:px-8 pb-16 space-y-10">

        {/* Video Player */}
        <div ref={videoRef} className="w-full bg-black rounded-xl shadow overflow-hidden">
          <video className="w-full h-[260px] md:h-[480px] object-cover" controls>
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>

        {/* Course Details */}
        <div className="bg-white rounded-xl shadow p-6 md:p-8 space-y-6">

          <div className="flex justify-between items-center border-b pb-5 flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{course.author}</h2>
              <p className="text-sm text-gray-600">{course.course_date}</p>
            </div>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 
              text-white rounded-full font-semibold shadow hover:opacity-90">
              ₹{course.course_price}
            </button>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-900">About this Course</h3>
            <p className="text-gray-700 leading-relaxed">
              You learn in this course: {course.tag}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {course.description}
            </p>
          </div>
        </div>

        {/* More Courses */}
        <div className="bg-white rounded-xl shadow p-6 space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">More Courses</h3>

          {coursedata
            .filter((c) => c.course_id !== Number(id))
            .map((data) => (
              <Link
                to={`/coursedetail/${data.course_id}`}
                key={data.course_id}
                className="block bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition"
              >
                <div className="flex gap-4 hover:bg-gray-50 p-3 rounded-lg transition">
                  <div className="w-32 h-20 md:w-40 md:h-28 bg-gray-200 rounded-lg overflow-hidden">
                    <img src={`https://rwompwlcjbigfbnovqxu.supabase.co/storage/v1/object/public/course_thumbnail/${data.thumbnail}`} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex flex-col justify-between flex-1">
                    <h4 className="text-sm font-semibold text-gray-900">{data.course_title}</h4>
                    <p className="text-xs text-gray-600">Skill Level: {data.skill_level}</p>
                    <p className="text-xs text-gray-600">{data.course_date}</p>
                  </div>
                  
                  <div className="text-gray-600 text-xl">⋮</div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
