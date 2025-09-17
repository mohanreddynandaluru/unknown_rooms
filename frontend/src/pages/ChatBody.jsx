import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../componets/Navbar";
import ParticlesBackground from "../componets/ParticlesBackground";
import { useSelector } from "react-redux";

const Body = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const userName = user.userName;
    if (!userName) {
      navigate("/username");
    }
  });
  return (
    <div className="relative min-h-screen flex flex-col">
      <ParticlesBackground />

      {/* Navbar */}

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
