import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import api from "../api";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AuthLanding() {
      const primaryColor = "#ff4d2d";

   const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleGoogleLogin = () => {
    try {
      setError("");
      const data= window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
      console.log(data,"Google login URL");
    } catch {
      setError("Failed to start Google login");
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const err = params.get("error");

    if (err) {
      setError("Google login failed. Please try again.");
    }
  }, [location]);

   

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#fff9f6]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center">
        
        {/* Logo / Title */}
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: primaryColor }}
        >
          FoodPanda
        </h1>

        <p className="text-gray-500 mb-8">
          Welcome! Continue to your account
        </p>

        {/* Google Login */}
       <div>
         <button
        onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border rounded-xl py-3 mb-4 hover:shadow-md transition"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

            {error && (
        <p className="mt-4 text-red-500 text-sm">
          {error}
        </p>
      )}
       </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Sign In Button */}
        <button
          onClick={() => navigate("/signin")}
          className="w-full py-3 rounded-xl text-white mb-3"
          style={{ backgroundColor: primaryColor }}
        >
          Sign In
        </button>

        {/* Sign Up Button */}
        <button
          onClick={() => navigate("/signup")}
          className="w-full py-3 rounded-xl border"
          style={{ borderColor: primaryColor, color: primaryColor }}
        >
          Create New Account
        </button>
      </div>
    </div>
  );
}