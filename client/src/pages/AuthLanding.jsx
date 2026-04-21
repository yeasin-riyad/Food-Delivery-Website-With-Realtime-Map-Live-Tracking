import React from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function AuthLanding() {
  const navigate = useNavigate();

  const primaryColor = "#ff4d2d";

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
        <button
          className="w-full flex items-center justify-center gap-3 border rounded-xl py-3 mb-4 hover:shadow-md transition"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

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