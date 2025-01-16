import React, { useRef } from "react";
import { useActiveNavContext } from "../context/ActiveNavContext";
import { Link } from "react-router-dom";

export const Nav = ({ addressOf }) => {
  const { activeNav } = useActiveNavContext();
  const navRef = useRef(null);
  const addressSlice = addressOf?.slice(0, 8) || "Unknown";

  return (
    <div
      ref={navRef}
      className={`relative flex flex-col w-5/12 h-full bg-[#441752] p-5 border-r-2 ${
        activeNav
          ? "-translate-x-[100%] transition-all ease-in-out duration-700 w-0"
          : "transition-all ease-in-out duration-700"
      } overflow-hidden`}
    >
      <div className="flex flex-col mx-auto text-[#AB4459]">
        <p
          className={`text-4xl font-bold ${
            !activeNav
              ? "translate-y-3 transition-all duration-500 delay-700 ease-out"
              : ""
          }`}
        >
          Decentralized X
        </p>
      </div>
      <div className="flex flex-col gap-9 px-10 mt-44 text-[#AB4459] text-2xl">
        <a
          className={`${
            !activeNav
              ? "translate-x-3 transition-all duration-500 delay-700 ease-out hover:text-[#ff315b] hover:delay-0"
              : ""
          }`}
          href="/"
        >
          Home
        </a>
        <a
          className={`${
            !activeNav
              ? "translate-x-3 transition-all duration-500 delay-700 ease-out hover:text-[#ff315b] hover:delay-0"
              : ""
          }`}
          href="/notifications"
        >
          Notifications
        </a>
        <Link
          className={`${
            !activeNav
              ? "translate-x-3 transition-all duration-500 delay-700 ease-out hover:text-[#ff315b] hover:delay-0"
              : ""
          }`}
          to="/tweets"
        >
          Tweets
        </Link>
        <Link
          className={`${
            !activeNav
              ? "translate-x-3 transition-all duration-500 delay-700 ease-out hover:text-[#ff315b] hover:delay-0"
              : ""
          }`}
          to="/following"
        >
          Follwing
        </Link>
        <a
          className={`${
            !activeNav
              ? "translate-x-3 transition-all duration-500 delay-700 ease-out hover:text-[#ff315b] hover:delay-0"
              : ""
          }`}
          href="/notifications"
        >
          Messages
        </a>
      </div>
      <div
        className={`absolute flex flex-row items-center gap-3 bottom-12 left-14 text-[#AB4459] text-3xl ${
          !activeNav
            ? "-translate-y-3 transition-all duration-500 delay-700 ease-out"
            : ""
        }`}
      >
        <div className="w-14">
          <img
            draggable={false}
            className="w-full h-full rounded-full"
            src="https://static.vecteezy.com/system/resources/previews/013/042/571/large_2x/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg"
            alt="Profile"
          />
        </div>
        <p>{addressSlice}...</p>
      </div>
    </div>
  );
};
