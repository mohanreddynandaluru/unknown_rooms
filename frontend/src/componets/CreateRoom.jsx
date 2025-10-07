import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";
const CreateRoom = () => {
  const [wrong, setWrong] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const navigate = useNavigate();
  const handleButton = async () => {
    if (title && subTitle) {
      console.log("button clicked");
      console.log(title + "   " + subTitle);
      try {
        const res = await axios.post(
          BASE_URL + "/rooms",
          {
            roomName: title,
            subtitle: subTitle,
          },
          { withCredentials: true }
        );
        console.log(res);
        if (res.data.status === "success") {
          return navigate(`/chat/${res.data.room.roomId}`);
        }
      } catch (err) {
        console.log(err);
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
          placeholder="Enter Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="p-2.5 border-2 rounded-2xl Delius text-xl"
          placeholder="Enter Subtitle"
          onChange={(e) => setSubTitle(e.target.value)}
        />
        {wrong && (
          <p className="text-red-600">*Title and Subtitle is required</p>
        )}
        <button
          className=" px-4 py-2 bg-red-500/80 text-white rounded-full hover:bg-red-600/30 transition w-[100%] sm:w-auto Delius"
          onClick={handleButton}
        >
          Create Room
        </button>
      </div>
    </div>
  );
};

export default CreateRoom;
