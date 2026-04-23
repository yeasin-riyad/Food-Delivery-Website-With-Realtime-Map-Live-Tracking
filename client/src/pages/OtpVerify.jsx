import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import { useEffect } from "react";
import { Spinner } from "../components/Spinner";

export default function OtpVerify() {
  const primaryColor = "#ff4d2d";
  const navigate = useNavigate();
  const location = useLocation();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

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
  const email = location.state?.email;

  const handleVerifyOtp = async (e) => {
  e.preventDefault();
  if(otp.some((d) => d === "")){
    setError("Please enter the complete OTP");
    return;
  };
  setError("");
  setLoading(true);

  try {
    await api.post("/api/auth/verify-otp", {
      otp: otp.join(""),
      email,
    });

    navigate("/reset-password", {
      state: { email },
    });
  } catch (err) {
    setError(err.response?.data?.message || "OTP verification failed");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (!email) {
      // যদি direct URL দিয়ে আসে → redirect back
      navigate("/signin");
    }
  }, [email, navigate]);

 // auto focus first input on mount
  useEffect(() => {
  document.getElementById("otp-0")?.focus();
}, []);


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
  disabled={otp.some((d) => d === "") || loading}
  onClick={handleVerifyOtp}
  className="w-full py-3 rounded-xl text-white mb-3 flex items-center justify-center gap-2 disabled:opacity-50"
  style={{ backgroundColor: primaryColor }}
>
  {loading ? <Spinner /> : "Verify OTP"}
</button>

        <p className="text-sm text-gray-500 mt-4">
          Didn’t receive code?{" "}
          <span className="text-orange-500 cursor-pointer hover:underline">
            Resend
          </span>
        </p>
        {error && (
  <p className="mt-3 text-sm text-red-500 text-center">
    {error}
  </p>
)}
      </div>
    </div>
  );
}