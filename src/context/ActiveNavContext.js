import React, { createContext, useContext, useState } from "react";

const ActiveNavContext = createContext();

export const ActiveNavProvider = ({ children }) => {
  const [activeNav, setActiveNav] = useState(true);

  return (
    <ActiveNavContext.Provider value={{ activeNav, setActiveNav }}>
      {children}
    </ActiveNavContext.Provider>
  );
};

export const useActiveNavContext = () => useContext(ActiveNavContext);
