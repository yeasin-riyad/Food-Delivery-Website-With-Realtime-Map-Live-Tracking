// import React from "react";
// import { useState } from "react";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

// const SignUp = () => {
//   const primaryColor = "#ff4d2d";
//   const hoverColor = "#e64323";
//   const bgColor = "#fff9f6";
//   const borderColor = "#ddd";
//   const [showPassword, setShowPassword] = useState(false);
//   const [role, setRole] = useState("user");
//   return (
//     <div
//  className="min-h-screen flex items-start sm:items-center justify-center px-4 py-6"      style={{ backgroundColor: bgColor }}
//     >
//       <div
//         className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]`}
//         style={{
//           border: `1px solid ${borderColor}`,
//         }}
//       >
//         <h1
//           className={`text-3xl font-bold mb-2`}
//           style={{ color: primaryColor }}
//         >
//           FoodPanda
//         </h1>
//         <p className="text-gray-600 mb-8">
//           Create your account to get started with delicious food deliveries
//         </p>

//         {/* fullName */}
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 font-medium mb-1"
//             htmlFor="fullName"
//           >
//             Full Name
//           </label>
//           <input
//             type="text"
//             name="fullName"
//             id=""
//             placeholder="Enter Your Full Name"
//             className="w-full border rounded-lg px-3 py-2 focus:outline-none"
//             style={{
//               border: `1px solid ${borderColor}`,
//             }}
//           />
//         </div>

//         {/* Email*/}
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 font-medium mb-1"
//             htmlFor="Email"
//           >
//             Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             id=""
//             placeholder="Enter Your Email"
//             className="w-full border rounded-lg px-3 py-2 focus:outline-none"
//             style={{
//               border: `1px solid ${borderColor}`,
//             }}
//           />
//         </div>

//         {/* Mobile */}
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 font-medium mb-1"
//             htmlFor="mobile"
//           >
//             Mobile
//           </label>
//           <input
//             type="number"
//             name="mobile"
//             id=""
//             placeholder="Enter Your Mobile Number"
//             className="w-full border rounded-lg px-3 py-2 focus:outline-none"
//             style={{
//               border: `1px solid ${borderColor}`,
//             }}
//           />
//         </div>

//         {/* Password*/}
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 font-medium mb-1"
//             htmlFor="Password"
//           >
//             Password
//           </label>
//           <div className="relative">
//             <input
//               type={`${showPassword ? "text" : "password"}`}
//               name="password"
//               id=""
//               placeholder="Enter Your Password"
//               className="w-full border rounded-lg px-3 py-2 focus:outline-none"
//               style={{
//                 border: `1px solid ${borderColor}`,
//               }}
//             />

//             <button
//               onClick={() => setShowPassword((prev) => !prev)}
//               className="cursor-pointer absolute right-3 top-[14px] text-gray-500"
//             >
//               {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
//             </button>
//           </div>
//         </div>

//         {/* Role*/}
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 font-medium mb-1"
//             htmlFor="role"
//           >
//             Role
//           </label>
//           <div className="relative flex sm:space-x-0  md:space-x-2  lg:space-x-2 ">
//             {["user", "owner", "deliveryBoy"].map((r) => (
//               <button
//                 className='flex-1 border rounded-lg px-3 py-2 text-center focus:outline-none font-medium transition-colors duration-200'
//                 style={{
//                   backgroundColor: role === r ? primaryColor : "transparent",
//                   color: role === r ? "#fff" : "#333",
//                   border: `1px solid ${borderColor}`,
//                 }}
//                 key={r}
//                 onClick={() => setRole(r)}
//               >
//                 {r.charAt(0).toUpperCase() + r.slice(1)}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;


import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { motion } from "motion/react";
import api from "../api";

export default function MultiStepSignUp() {
  const primaryColor = "#ff4d2d";
  const borderColor = "#ddd";

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 👉 এখানে formData-তে fullName, email, mobile, password, role সব আছে
    if (!formData.fullName || !formData.email || !formData.mobile || !formData.password) {
      alert("Please fill in all fields");
      return;
    }
    api.post("/api/auth/signup", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 bg-[#fff9f6]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          FoodPanda
        </h1>
        <p className="text-gray-500 mb-6">
          Step {step} of 3 - Create your account
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
          <div
            className="h-2 rounded-full"
            style={{
              width: `${(step / 3) * 100}%`,
              backgroundColor: primaryColor,
            }}
          />
        </div>

        {/* Step Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <div className="space-y-4">
              <input
                type="text"
                name="fullName"
                required
                value={formData?.fullName}
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
                style={{ border: `1px solid ${borderColor}` }}
              />

              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                value={formData?.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
                style={{ border: `1px solid ${borderColor}` }}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <input
                required
                type="number"
                inputMode="numeric"
                name="mobile"
                placeholder="Mobile Number"
                value={formData?.mobile}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
                style={{ border: `1px solid ${borderColor}` }}
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Password"
                 value={formData?.password}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                  style={{ border: `1px solid ${borderColor}` }}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <p className="font-medium text-gray-700">Select Role</p>

              <div className="flex gap-2">
                {["user", "owner", "deliveryBoy"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setFormData({ ...formData, role: r })}
                    className="flex-1 py-2 rounded-lg border text-sm"
                    style={{
                      backgroundColor:
                        formData.role === r ? primaryColor : "transparent",
                      color: formData.role === r ? "#fff" : "#333",
                      border: `1px solid ${borderColor}`,
                    }}
                  >
                    {r[0].toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="px-4 py-2 rounded-lg border"
            >
              Back
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={nextStep}
              className="ml-auto px-4 py-2 rounded-lg text-white"
              style={{ backgroundColor: primaryColor }}
            >
              Next
            </button>
          ) : (
            <button
            onClick={handleSubmit}
              className="ml-auto px-4 py-2 rounded-lg text-white"
              style={{ backgroundColor: primaryColor }}
            >
              Create Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
