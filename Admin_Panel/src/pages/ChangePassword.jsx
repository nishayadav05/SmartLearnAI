import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../Api";

function ChangePassword() {
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const adminEmail = localStorage.getItem("adminEmail");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match");
      return;
    }

    try {
      const res = await Api.post(
  "/change_password",
  {
    old_password: oldPassword,
    new_password: newPassword
  },
  {
    headers: {
      email: adminEmail   // VERY IMPORTANT
    }
  }
);

     if (res.data.success) {
      alert("Password changed successfully. ");
      navigate("/dashboard");
    } else {
      alert(res.data.message);
    }
    } catch (err) {
      console.error(err);
      setMessage("Error changing password ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">

      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-800">

        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
          />

          {message && (
            <p className="text-sm text-center text-red-400">{message}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            Update Password
          </button>

        </form>

      </div>

    </div>
  );
}

export default ChangePassword;