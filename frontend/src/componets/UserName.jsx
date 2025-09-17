import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/userSlice.js";
import Footer from "./Footer.jsx";

const UserName = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const handleButton = async () => {
    if (userName.trim() === "") {
      alert("username cannot be empty");
      return;
    }
    try {
      const user = await axios.post(
        `${BASE_URL}/user`,
        { userName },
        { withCredentials: true }
      );
      console.log(user.data.userName);
      dispatch(setUser({ userName: user.data.userName }));
      navigate("/");
    } catch (err) {
      console.log("Error in saving username", err);
      alert("Error in saving username");
      return;
    }
  };
  useEffect(() => {
    if (user.userName) {
      navigate(-2);
    }
  });

  return (
    <div>
      <Footer font={"Asimovian"} />
      <div className="flex justify-center items-center gap-4 h-[60vh]">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Enter Fake Username"
            className="p-2.5 border-2 rounded-2xl Delius text-xl"
            id="username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 Delius text-xl"
          onClick={handleButton}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default UserName;
