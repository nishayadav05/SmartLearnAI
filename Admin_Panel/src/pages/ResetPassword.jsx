import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../Api";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match ❌");
      return;
    }

    try {
      const res = await Api.post("/reset_password", {
        email,
        new_password: newPassword
      });

      if (res.data.success) {
        setMessage("Password Reset Successful ✅");

        localStorage.removeItem("resetEmail");

        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage("Error resetting password ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl border border-gray-800">

        <h2 className="text-2xl text-white text-center mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleReset} className="space-y-4">

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg"
          />

          {message && <p className="text-center text-red-400">{message}</p>}

          <button className="w-full py-3 bg-blue-600 rounded-lg text-white">
            Reset Password
          </button>

        </form>
      </div>
    </div>
  );
}

export default ResetPassword;