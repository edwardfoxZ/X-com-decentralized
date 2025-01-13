import React from "react";

export const Page = () => {
  return (
    <div className="p-52">
      <h1 className="text-5xl font-bold text-[#F29F58]">Post</h1>
      <div className="Post w-full h-full flex">
        <div className="Post-Container flex flex-col mx-auto w-5/12 bg-[#0a0818] text-white p-8 rounded-lg mt-14">
          <div className="flex flex-row items-center gap-2">
            <div className="Profile w-14">
              <img
                className="w-full h-full rounded-full"
                src="https://static.vecteezy.com/system/resources/previews/026/619/142/original/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg"
              />
            </div>
            <p className="text-2xl">WalletAddress</p>
            <button className="mt-1 bg-blue-500 rounded-md px-3 hover:bg-hover-follow">
              Follow
            </button>
          </div>
          <p className="mt-10 px-5 text-xl">text...</p>
        </div>
      </div>
    </div>
  );
};
