import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../Api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await Api.post("/forgot_password", { email });

      if (res.data.success) {
        setMessage("OTP sent to your email ✅");

        // store email for next step
        localStorage.setItem("resetEmail", email);

        setTimeout(() => navigate("/verifyotp"), 1500);
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage("Error sending OTP ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl border border-gray-800">

        <h2 className="text-2xl text-white text-center mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSendOtp} className="space-y-4">

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700"
          />

          {message && <p className="text-center text-red-400">{message}</p>}

          <button className="w-full py-3 bg-blue-600 rounded-lg text-white">
            Send OTP
          </button>

        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;