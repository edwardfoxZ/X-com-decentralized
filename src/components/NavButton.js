import React, { useRef } from "react";

export const NavButton = ({ setActiveNav }) => {
  const activeNav = useRef();

  const toggleNav = () => {
    activeNav.current = !activeNav.current;
    setActiveNav(activeNav.current);
  };
  return (
    <>
      <div className="absolute top-[45%] left-5 text-black text-3xl">
        <button
          onClick={toggleNav}
          className="bg-slate-50 rounded-full px-3 py-1 pb-2 hover:bg-slate-500 hover:text-white focus:bg-[#F29F58] transition-all duration-300"
        >
          {activeNav.current ? ">" : "<"}
        </button>
      </div>
    </>
  );
};
