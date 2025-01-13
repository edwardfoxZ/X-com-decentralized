import React from "react";

export const NavButton = ({ setActiveNav, activeNav }) => {
  return (
    <>
      <div className="absolute top-[45%] left-5 text-black text-3xl">
        {activeNav ? (
          <button
            onClick={() => setActiveNav(false)}
            className="bg-slate-50 rounded-full px-3 py-1 pb-2 hover:bg-slate-500 hover:text-white focus:bg-[#F29F58] transition-all duration-300"
          >
            {">"}
          </button>
        ) : (
          <button
            onClick={() => setActiveNav(true)}
            className="bg-slate-50 rounded-full px-3 py-1 pb-2 hover:bg-slate-500 hover:text-white transition-all duration-300"
          >
            {"<"}
          </button>
        )}
      </div>
    </>
  );
};
