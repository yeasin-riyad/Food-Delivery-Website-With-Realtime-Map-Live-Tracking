import { useEffect } from "react";
import api from "../api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function useGetCurrentUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 
  const dispatch = useDispatch();
  
    useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        
        const res = await api.get("/api/user/current");
        setUser(res.data.user);
            dispatch(setUserData(res.data));

      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, [dispatch]);

  return { user, loading, error };
}

export default useGetCurrentUser;