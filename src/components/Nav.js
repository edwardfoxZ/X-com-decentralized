import React from "react";

export const Nav = () => {
  return (
    <div className="relative flex flex-col w-5/12 h-full bg-[#213555] p-5 border-r-2">
      <div className="flex flex-col mx-auto text-white">
        <p className="text-4xl font-bold">Decentralized X</p>
      </div>
      <div className="flex flex-col gap-9 px-10 mt-44 text-white text-2xl">
        <a href="">Home</a>
        <a href="">Notification</a>
      </div>
      <div className="absolute flex flex-row items-center gap-3 bottom-12 left-14 text-white text-3xl">
        <div className="w-14">
          <img className="w-full h-full rounded-full" src="https://th.bing.com/th/id/R.183cc3f6afac4052ca3dc8c131438139?rik=kSkS%2bIRSeFTbtQ&pid=ImgRaw&r=0" />
        </div>
        <p>WalletAddress</p>
      </div>
      <div className="absolute top-[45%] -right-3 text-black text-3xl">
        <button className="bg-slate-50 rounded-full px-3 py-1 pb-2 hover:bg-slate-500 hover:text-white transition-all duration-300">
          {"<"}
        </button>
      </div>
    </div>
  );
};
