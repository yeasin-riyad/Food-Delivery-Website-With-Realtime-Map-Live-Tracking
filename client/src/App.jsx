import { Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp.jsx"
import MultiStepSignIn from "./pages/MultiStepSignIn.jsx"
import AuthLanding from "./pages/AuthLanding.jsx"


function App() {

  return (
  <Routes>
    {/* Define your routes here */}
          <Route path="/" element={<AuthLanding />} />

    <Route path="/signup" element={<SignUp />} />
    <Route path="/signin" element={<MultiStepSignIn />} />
  </Routes>
  )
}

export default App
