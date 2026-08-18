import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Dash.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useContext } from "react";
import { Menu } from "../../Context/Menu";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Topbar() {
  const menu = useContext(Menu);
  const { user, logout } = useContext(AuthContext);
  const roleid = user.role;
  const setopen = menu.setopen;
  const nav = useNavigate();
  const handleLogout = () => {
    logout();
    nav("/login");
  };
  return (
    <div className="top-bar poistion-fixed">
      <div className="d-flex align-items-center justify-content-between h-100 ">
        <div className="d-flex align-items-center gap-5">
          <div className="d-flex flex-column p-1 mt-2">
            <img
              src={require("../../Assest/photo_2026-05-13_22-13-04.jpg")}
              alt=""
              width={"70px"}
            />
            {roleid === "Craftsman" ? (
              <p>لوحة تحكم الحرفي</p>
            ) : (
              <p>لوحة تحكم الادمن</p>
            )}
          </div>
          <FontAwesomeIcon
            icon={faBars}
            cursor={"pointer"}
            onClick={() => setopen((prev) => !prev)}
          />
        </div>
        <div className="d-flex align-items-center justify-content-center gap-2">
          <img
            src={
              user.account.person.imagePath !== ""
                ? require(`../../Assest/${user.account.person.imagePath}`)
                : require("../../Assest/pngtree-blue-user-icon-profile-and-account-vector-design-vector-sign-vector-png-image_46129432.jpg")
            }
            width={"50px"}
            className="rounded-circle"
            alt=""
          ></img>
          <DropdownButton id="dropdown-basic-button">
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div>
  );
}
