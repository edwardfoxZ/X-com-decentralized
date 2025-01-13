import React from "react";
import { useActiveNavContext } from "../context/ActiveNavContext";

export const Nav = () => {
  const { activeNav, setActiveNav } = useActiveNavContext();

  return (
    <div
      className={`relative flex flex-col w-5/12 h-full bg-[#213555] p-5 border-r-2 transition-transform duration-300 ${
        activeNav ? "-translate-x-[100%]" : ""
      } overflow-hidden`}
    >
      <div className="flex flex-col mx-auto text-white">
        <p className="text-4xl font-bold">Decentralized X</p>
      </div>
      <div className="flex flex-col gap-9 px-10 mt-44 text-white text-2xl">
        <a href="/">Home</a>
        <a href="/notifications">Notifications</a>
      </div>
      <div className="absolute flex flex-row items-center gap-3 bottom-12 left-14 text-white text-3xl">
        <div className="w-14">
          <img
            draggable={false}
            className="w-full h-full rounded-full"
            src="https://static.vecteezy.com/system/resources/previews/013/042/571/large_2x/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg"
            alt="Profile"
          />
        </div>
        <p>WalletAddress</p>
      </div>
    </div>
  );
};
