import { useEffect, useState } from "react";
import api from "../api";
import { useDispatch } from "react-redux";
import { setMyShopData, clearMyShopData } from "../redux/ownerSlice";

function useGetMyShop() {
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMyShop = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get("/api/shop/my-shop");

        setShop(res.data.shop);

        // 🔥 redux-এ save
        dispatch(setMyShopData(res.data.shop));

      } catch (err) {
        const message =
          err.response?.data?.message || "Failed to fetch shop";

        setError(message);

        // optional: redux clear
        dispatch(clearMyShopData());

      } finally {
        setLoading(false);
      }
    };

    fetchMyShop();
  }, [dispatch]);

  return { shop, loading, error };
}

export default useGetMyShop;