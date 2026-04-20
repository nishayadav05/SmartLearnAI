import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../Api";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.post("/verify_otp", {
        email,
        otp
      });

      if (res.data.success) {
        setMessage("OTP Verified ✅");

        setTimeout(() => navigate("/resetpassword"), 1500);
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage("Error verifying OTP ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-md">
        <h2 className="text-white text-2xl mb-4 text-center">Verify OTP</h2>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 rounded bg-gray-800 text-white"
          />

          {message && <p className="text-red-400 text-center">{message}</p>}

          <button className="w-full bg-blue-600 p-3 rounded text-white">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;