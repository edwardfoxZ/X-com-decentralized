import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { LiaPenNibSolid } from "react-icons/lia";

export const Page = () => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="p-52">
      <h1 className="text-5xl font-bold text-[#F29F58]">Post</h1>
      <div className="Post w-full h-full flex">
        <div className="Post-Container flex flex-col mx-auto w-5/12 bg-[#0a0818] text-white p-8 pb-5 rounded-lg mt-14">
          <div className="flex flex-row items-center gap-2">
            <div className="Profile w-14">
              <img
                draggable={false}
                className="w-full h-full rounded-full"
                src="https://static.vecteezy.com/system/resources/previews/026/619/142/original/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg"
                alt="Profile"
              />
            </div>
            <p className="text-2xl font-mono">0x000000</p>
            <button className="mt-1 bg-blue-500 rounded-md px-3 hover:bg-hover-follow">
              Follow
            </button>
          </div>
          <p className="mt-5 px-5 text-xl font-semibold">
            I got rugged buying 3 tokens this week I didn’t get on X and call
            anyone a farmer I didn’t bitch or complain I made a choice to
            gamble, I lost money. It happens. Bitching and crying will NOT bring
            the Solana back. 🤒
          </p>
          <span
            onClick={() => setLiked(!liked)}
            className="w-1 mt-5 px-5 text-3xl cursor-pointer"
          >
            {liked ? <FaHeart color="red" /> : <FaRegHeart color="red" />}
          </span>
        </div>
      </div>

      <div className="Create-Tweet absolute bottom-32 right-32 text-[#F29F58] text-5xl">
        <button className="bg-[#441752] hover:bg-[#912faf] p-3 rounded-full transition-all duration-300 ease-in-out">
          <LiaPenNibSolid />
        </button>
      </div>
    </div>
  );
};
