import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { loadSlim } from "@tsparticles/slim";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import iconMap from "../utils/roomsData.jsx"; // mapping FaGlobe → component

const Home = () => {
  const [init, setInit] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Init particles
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });

    // Fetch rooms from API
    const fetchRooms = async () => {
      try {
        const res = await fetch("http://localhost:4000/rooms");
        const data = await res.json();
        setRooms(data.rooms); // assuming API returns { rooms: [...] }
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6">
      {init && (
        <Particles
          id="tsparticles"
          options={{
            background: { color: "#000000" },
            particles: {
              number: { value: 170 },
              size: { value: 3 },
              move: { enable: true, speed: 0.5 },
              opacity: { value: 0.3 },
              links: { enable: true, color: "#ffffff", opacity: 0.4 },
            },
          }}
          className="absolute inset-0 -z-10"
        />
      )}

      <h1 className="text-4xl font-bold text-center mb-10 Asimovian bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-transparent bg-clip-text">
        Explore the Rooms
      </h1>

      {/* Rooms grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-9/12 mx-auto">
        {rooms.map((room) => {
          const Icon = iconMap[room.icon] || iconMap["FaGlobe"]; // fallback icon
          return (
            <div
              key={room._id}
              className="relative group backdrop-blur-sm bg-white/10 border border-white/20 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 overflow-hidden"
            >
              {/* Background image */}
              <div
                style={{ backgroundImage: `url(${room.image})` }}
                className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              ></div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-semibold text-white Asimovian">
                    {room.title}
                  </h2>
                  <Icon className="text-3xl text-blue-400" />
                </div>
                <p className="text-gray-300 text-sm Delius">{room.subtitle}</p>
                <Link to={`/chat/${room.roomId}`}>
                  <button className="text-center border-1 items-center mt-4 px-4 py-2 bg-red-500/80 text-white rounded-full hover:bg-orange-600/30 transition-colors duration-300 w-full Delius">
                    Join
                  </button>
                </Link>
              </div>
            </div>
          );
        })}

        {/* Extra card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-semibold text-white flex Asimovian justify-center items-center h-full">
            More Rooms coming soon...
          </h2>
        </div>
      </div>

      {/* Divider */}
      <div className="m-4 Asimovian text-white text-center flex flex-col justify-center items-center">
        <p>-----</p>
        <h5>OR</h5>
        <p>-----</p>
      </div>

      {/* Create/Join buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-2xl">
        <Link to="/create-room">
          <button className="mt-4 px-4 py-2 bg-green-500/80 text-white rounded-full hover:bg-green-600/30 transition w-[100%] sm:w-auto Delius">
            Create New Room
          </button>
        </Link>
        <Link to="/join-room">
          <button className="mt-4 px-4 py-2 bg-green-500/80 text-white rounded-full hover:bg-green-600/30 transition w-[100%] sm:w-auto Delius">
            Join Room
          </button>
        </Link>
      </div>

      <Footer font={"Nabla"} />
    </div>
  );
};

export default Home;
