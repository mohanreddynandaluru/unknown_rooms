import React, { use } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../componets/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ParticlesBackground from "../componets/ParticlesBackground";
import axios from "axios";
import { setUser } from "../slices/userSlice";
import { BASE_URL } from "../utils/constants";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userName = user?.userName;
        if (!userName) {
          const res = await axios.get(BASE_URL + "/user", {
            withCredentials: true,
          });

          if (res.data?.userName) {
            dispatch(setUser({ userName: res.data.userName }));
          } else {
            navigate("/username");
          }
        }
      } catch (err) {
        console.log("Error in fetching user from cookies", err);
        navigate("/username");
      }
    };

    fetchUser();
  }, [user, dispatch, navigate]);

  return (
    <div>
      <ParticlesBackground />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Body;
