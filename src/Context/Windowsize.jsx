import { useEffect, useState } from "react";
import { createContext } from "react";

export const Window = createContext(null);
export default function Windocontext({ children }) {
  const [wind, setwind] = useState(window.innerWidth);
  useEffect(() => {
    function setwidowwidth() {
      setwind(window.innerWidth);
    }
    window.addEventListener("resize", setwidowwidth);
    return () => {
      window.removeEventListener("resize", setwidowwidth);
    };
  }, []);
  return (
    <Window.Provider value={{ wind, setwind }}>{children}</Window.Provider>
  );
}
