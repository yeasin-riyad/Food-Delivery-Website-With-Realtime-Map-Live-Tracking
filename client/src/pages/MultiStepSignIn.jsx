import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

export default function MultiStepSignIn() {
  const primaryColor = "#ff4d2d";
  const borderColor = "#ddd";

  const [view, setView] = useState("signin"); // signin | forgot | success
  const [step, setStep] = useState(1); // 1: email, 2: password
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    if(formData.email === "" || formData.password === ""){
      setError("Please fill in all fields");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/auth/signin", formData);
        dispatch(setUserData(res?.data?.user));
    } catch (err) {
      setError(err.response?.data?.message || "Signin failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if(formData.email === ""){
      setError("Please enter your email");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await api.post("/api/auth/send-otp", { email: formData.email });
      setView("success");
      setFormData({ email: "", password: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep((s) => Math.min(2, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 bg-[#fff9f6]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          FoodPanda
        </h1>

        {/* ================= SIGN IN ================= */}
        {view === "signin" && (
          <>
            <p className="text-gray-500 mb-6">Step {step} of 2 - Sign in</p>

            {/* Progress */}
            <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${(step / 2) * 100}%`,
                  backgroundColor: primaryColor,
                }}
              />
            </div>

            {/* Step Content */}
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* STEP 1: Email */}
              {step === 1 && (
                <>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border px-3 py-3 rounded-xl focus:outline-none"
                    style={{ border: `1px solid ${borderColor}` }}
                  />
                </>
              )}

              {/* STEP 2: Password */}
              {step === 2 && (
                <>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full border px-3 py-3 rounded-xl focus:outline-none"
                      style={{ border: `1px solid ${borderColor}` }}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-3 text-gray-500"
                    >
                      {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                  </div>

                  <button
                    onClick={() => setView("forgot")}
                    className="text-sm text-right w-full hover:underline"
                    style={{ color: primaryColor }}
                  >
                    Forgot password?
                  </button>
                </>
              )}
            </motion.div>

            {/* Actions */}
            <div className="flex justify-between mt-6">
              {step > 1 ? (
                <button
                  onClick={prevStep}
                  className="px-4 py-2 rounded-lg border"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 2 ? (
                <button
                  onClick={nextStep}
                  disabled={!formData.email}
                  className="ml-auto px-5 py-2.5 rounded-xl text-white disabled:opacity-50"
                  style={{ backgroundColor: primaryColor }}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSignin}
                  disabled={loading}
                  className="ml-auto px-5 py-2.5 rounded-xl text-white flex items-center justify-center gap-2 disabled:opacity-50"
                  style={{ backgroundColor: primaryColor }}
                >
                  {loading ? <Spinner /> : "Sign in"}
                </button>
              )}
            </div>
          </>
        )}

        {/* ================= FORGOT PASSWORD ================= */}
        {view === "forgot" && (
          <>
            <p className="text-gray-500 mb-6">
              Enter your email to receive otp for password reset
            </p>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border px-3 py-3 rounded-xl mb-4"
            />

            <button
              onClick={handleForgotPassword}
              disabled={loading}
              className="w-full py-3 rounded-xl text-white flex items-center justify-center gap-2 disabled:opacity-50"
              style={{ backgroundColor: primaryColor }}
            >
              {loading ? <Spinner /> : "Send OTP"}
            </button>

            <button
              onClick={() => {
                setView("signin");
                setStep(1);
              }}
              className="mt-4 text-sm w-full text-center hover:underline"
              style={{ color: primaryColor }}
            >
              Back to Sign in
            </button>
          </>
        )}

        {/* ================= SUCCESS ================= */}
        {view === "success" && (
          <>
            <p className="text-green-600 mb-6">Otp sent! Check your email.</p>

            <button
              onClick={() => {
                navigate("/verify-otp", {
                  state: { email: formData?.email },
                });
              }}
              className="w-full py-3 rounded-xl text-white"
              style={{ backgroundColor: primaryColor }}
            >
              Verify OTP
            </button>
          </>
        )}
        {error && (
        <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
      )}
      </div>
      
    </div>
  );
}
