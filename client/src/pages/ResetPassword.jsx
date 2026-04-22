import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";

export default function ResetPassword() {
  const primaryColor = "#ff4d2d";
  const borderColor = "#ddd";
  const navigate = useNavigate();
  const location=useLocation();
  console.log(location.state?.email)

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    api.post("/api/auth/reset-password", {email:location.state?.email, password: formData.password })
    .then(res => {
      alert("Password reset successful! Please sign in with your new password.");
      navigate("/signin");
    })
    .catch(err => {
      alert("Error: " + err.response.data.message);
    });
  };


  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#fff9f6]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">

        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          Set New Password
        </h1>

        <p className="text-gray-500 mb-6">
          Create a strong password for your account
        </p>

        {/* Password */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="New Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-3 py-3 rounded-xl"
            style={{ border: `1px solid ${borderColor}` }}
          />

          <button
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-3 text-gray-500"
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>

        {/* Confirm Password */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full border px-3 py-3 rounded-xl mb-6"
          style={{ border: `1px solid ${borderColor}` }}
        />

        <button
        disabled={!formData.password || formData.password !== formData.confirmPassword}
     
          className={`w-full py-3 rounded-xl text-white mb-3 ${!formData.password || formData.password !== formData.confirmPassword ? "bg-gray-400 cursor-not-allowed" : ""}`}  

          style={{ backgroundColor: primaryColor }}
            onClick={handleResetPassword}
        >
          Update Password
        </button>
      </div>
    </div>
  );
}