import React from "react";
import { useSelector } from "react-redux";
import UserDashboard from "../components/UserDashboard";
import OwnerDashboard from "../components/OwnerDashboard";
import DeliveryBoy from "../components/DeliveryBoy";

const Home = () => {
  const { userData } = useSelector((state) => state.user);
  return (
    <div className="w-[100vw] min-h-[100vh] pt-[100px] flex flex-col items-center bg-[#fff9fc]">
      {userData?.user?.role == "user" && <UserDashboard />}
      {userData?.user?.role == "owner" && <OwnerDashboard />}
      {userData?.user?.role == "deliveryBoy" && <DeliveryBoy/>}
    </div>
  );
};

export default Home;
