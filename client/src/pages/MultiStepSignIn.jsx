import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

export default function MultiStepSignIn() {
  const primaryColor = "#ff4d2d";
  const borderColor = "#ddd";

  const [view, setView] = useState("signin"); // signin | forgot | success
  const [step, setStep] = useState(1); // 1: email, 2: password
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
                  className="ml-auto px-5 py-2.5 rounded-xl text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  Sign in
                </button>
              )}
            </div>
          </>
        )}

        {/* ================= FORGOT PASSWORD ================= */}
        {view === "forgot" && (
          <>
            <p className="text-gray-500 mb-6">
              Enter your email to receive a reset link
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border px-3 py-3 rounded-xl mb-4 focus:outline-none"
              style={{ border: `1px solid ${borderColor}` }}
            />

            <button
              onClick={() => setView("success")}
              className="w-full py-3 rounded-xl text-white"
              style={{ backgroundColor: primaryColor }}
            >
              Send Reset Link
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
            <p className="text-green-600 mb-6">
              Reset link sent! Check your email.
            </p>

            <button
              onClick={() => {
                setView("signin");
                setStep(1);
              }}
              className="w-full py-3 rounded-xl text-white"
              style={{ backgroundColor: primaryColor }}
            >
              Back to Sign in
            </button>
          </>
        )}
      </div>
    </div>
  );
}
