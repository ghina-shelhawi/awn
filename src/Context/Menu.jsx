import { useState } from "react";
import { createContext } from "react";

export const Menu = createContext(true);
export default function Menucontext({ children }) {
  const [open, setopen] = useState(true);

  return <Menu.Provider value={{ open, setopen }}>{children}</Menu.Provider>;
}
