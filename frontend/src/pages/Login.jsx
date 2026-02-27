import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Api from "../services/Api";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


const handleLogin = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  try {
    const res = await Api.post("/login", formData);

    console.log("Login Response:", res.data);

    if (res.data.success) {

      localStorage.setItem("token", res.data.token);

      //  FIXED HERE (no nested user assumption)
      const user_id = res.data.user_id;  

      if (!user_id) {
        alert("User ID not found in response!");
        return;
      }

      const studentRes = await Api.get(`/get_student_by_user/${user_id}`);

      const stud_id = studentRes.data.stud_id;

      navigate(`/exampleprofile/${stud_id}`);

    } else {
      alert("Invalid Credentials!");
    }

  } catch (err) {
    console.error(err);
    alert("Login Failed");
  }
};

  return (
    <div>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={() => navigate("/")}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          />

          <motion.div
            className="relative bg-white w-[380px] rounded-lg shadow-xl p-6 z-10"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
              <p className="text-sm text-gray-500">Please login to your account</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="text"
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-1">Password</label>
                <input
                  type="password"
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                Login
              </button>
            </form>

            <p className="text-sm text-center mt-4">
              Don’t have an account?
              <Link to="/registration" className="text-blue-600 ml-1 hover:underline">
                Register here
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Login;