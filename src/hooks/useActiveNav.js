import { useState } from "react";

export const useActiveNav = () => {
  const [activeNav, setActiveNav] = useState(false);

  return { activeNav, setActiveNav };
};
