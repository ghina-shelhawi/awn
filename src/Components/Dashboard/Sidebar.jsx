import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Dash.css";
import { Menu } from "../../Context/Menu";
import { Window } from "../../Context/Windowsize";
import { links } from "./NavLink";
import { AuthContext } from "../../Context/AuthContext";

export default function SideBar() {
  const menu = useContext(Menu);
  const windowsize = useContext(Window);

  const { user } = useContext(AuthContext);

  const windows = windowsize.wind;
  const isopen = menu.open;

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "80px",
          right: "0",
          width: "100%",
          height: "150vh",
          backgroundColor: "rgba(0,0,0,0.2)",
          display: windows < "768" && isopen ? "block" : "none",
        }}
      ></div>
      <div
        className="side-bar pt-3"
        style={{
          right: windows < "768" ? (isopen ? 0 : "-100%") : 0,
          width: isopen ? "240px" : "fit-content",
          position: windows < "768" ? "fixed" : "sticky",
        }}
      >
        {links.map(
          (link, key) =>
            user &&
            link.role.includes(user.role) && (
              <NavLink
                key={key}
                to={link.to}
                className="d-flex align-items-center gap-2 side-bar-link"
              >
                <FontAwesomeIcon color="orange" size="lg" icon={link.icon} />
                <p
                  className="m-0"
                  style={{ display: isopen ? "block" : "none" }}
                >
                  {link.name}
                </p>
              </NavLink>
            ),
        )}
      </div>
    </>
  );
}
