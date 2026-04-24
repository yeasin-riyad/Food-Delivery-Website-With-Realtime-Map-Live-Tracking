import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCity } from "../redux/userSlice";

const useGetCity = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const apikey = import.meta.env.VITE_GEOAPIKEY;
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position?.coords?.latitude;
      const longitude = position?.coords?.longitude;
      console.log(latitude,"Latitude.....");
      console.log(longitude,"Longitude.......");
      console.log(position)
      let result;
      if (latitude && longitude) {
        result = await axios.get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`,
        );
      }

      dispatch(setCity(result?.data?.results[0]?.city));
    });
  }, [userData]);
};

export default useGetCity;
