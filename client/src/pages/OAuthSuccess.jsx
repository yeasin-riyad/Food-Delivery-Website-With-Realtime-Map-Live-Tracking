import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

export default function OAuthSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const token = params.get("token");
    const email = params.get("email");
    const name = params.get("name");

    if (!token) {
      navigate("/auth?error=google_failed");
      return;
    }

    // ✅ Redux এ store করো
    dispatch(setUserData({user:{ email, name, token }}));

    // ✅ localStorage (optional but recommended)
    localStorage.setItem("token", token);

    // redirect to dashboard
    navigate("/");
  }, [location, dispatch, navigate]);

  return <p className="text-center mt-10">Logging you in...</p>;
}