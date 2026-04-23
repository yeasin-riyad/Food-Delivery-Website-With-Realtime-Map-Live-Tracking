import { useEffect } from "react";
import api from "../api";
import { useState } from "react";

function useGetCurrentUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 
  
    useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await api.get("/api/user/current");
        setUser(res.data.user);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, []);

  return { user, loading, error };
}

export default useGetCurrentUser;