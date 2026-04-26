import { Navigate, Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp.jsx"
import MultiStepSignIn from "./pages/MultiStepSignIn.jsx"
import AuthLanding from "./pages/AuthLanding.jsx"
import OtpVerify from "./pages/OtpVerify.jsx"
import ResetPassword from "./pages/ResetPassword.jsx"
import OAuthSuccess from "./pages/OAuthSuccess.jsx"
import useGetCurrentUser from "./hooks/useGetCurrentUser.jsx"
import { useSelector } from "react-redux"
import Home from "./pages/Home.jsx"
import useGetCity from "./hooks/useGetCity.jsx"
import useGetMyShop from "./hooks/useGetMyShop.jsx"


function App() {
  useGetCurrentUser(); // ✅ App লেভেলে কল করো যাতে সব পেজে ইউজার ডেটা থাকে
  useGetCity();
  useGetMyShop();
  const {userData} = useSelector((state) => state.user);

  console.log("Current User in App.jsx:", userData); // ✅ ইউজার ডেটা কনসোল লগ করো.

  return (
  <Routes>
    {/* Define your routes here */}
          <Route path="/auth" element={!userData ?<AuthLanding />:<Navigate to="/" />} />

    <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to="/" />} />
    <Route path="/signin" element={!userData ? <MultiStepSignIn /> : <Navigate to="/" />} />
    <Route path="/verify-otp" element={!userData ? <OtpVerify /> : <Navigate to="/" />} />
<Route path="/reset-password" element={!userData ? <ResetPassword /> : <Navigate to="/" />} />
<Route path="/oauth-success" element={!userData ? <OAuthSuccess /> : <Navigate to="/" />} />
<Route path="/" element={userData?<Home />:<Navigate to="/auth" />} />
  </Routes>
  )
}

export default App
