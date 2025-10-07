import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router";

const JoinRoom = () => {
  const [wrong, setWrong] = useState(false);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const handleButton = async () => {
    if (title) {
      console.log("button clicked");
      console.log(title + "   ");
      try {
        const res = await axios.get(BASE_URL + `/rooms/${title}`, {
          withCredentials: true,
        });
        // console.log(res);
        if (res.status === 200) {
          return navigate(`/chat/${title}`);
        } else {
          setWrong(true);
        }
      } catch (err) {
        // console.log(err);
        if (err.status == 404) {
          setWrong(true);
        }
      }
    } else {
      setWrong(true);
    }
  };
  return (
    <div className="h-screen flex justify-center">
      <div className="flex gap-6 justify-center items-center flex-col">
        <input
          type="text"
          className="p-2.5 border-2 rounded-2xl Delius text-xl"
          placeholder="Enter roomId"
          onChange={(e) => setTitle(e.target.value)}
        />
        {wrong && (
          <p className="text-red-600">*RoomId is required or Room not found</p>
        )}
        <button
          className=" px-4 py-2 bg-red-500/80 text-white rounded-full hover:bg-red-600/30 transition w-[100%] sm:w-auto Delius"
          onClick={handleButton}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default JoinRoom;
