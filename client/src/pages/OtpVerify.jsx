import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OtpVerify() {
  const primaryColor = "#ff4d2d";
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^[0-9]*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto focus next
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#fff9f6]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center">

        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          Verify OTP
        </h1>

        <p className="text-gray-500 mb-6">
          Enter the 4-digit code sent to your email
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-between gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
            required
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-14 h-14 text-center text-xl border rounded-xl"
            />
          ))}
        </div>

        <button
        disabled={otp.some((d) => d === "")}
          onClick={() => navigate("/reset-password")}
          className={`w-full py-3 rounded-xl text-white mb-3 ${otp.some((d) => d === "") ? "bg-gray-400 cursor-not-allowed" : ""}`}
          style={{ backgroundColor: primaryColor }}
        >
          Verify OTP
        </button>

        <p className="text-sm text-gray-500 mt-4">
          Didn’t receive code?{" "}
          <span className="text-orange-500 cursor-pointer hover:underline">
            Resend
          </span>
        </p>
      </div>
    </div>
  );
}