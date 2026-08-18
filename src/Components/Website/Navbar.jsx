import "./Navbar.css";
import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faClipboardList,
  faSignOutAlt,
  faUser,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export default function NavBar() {
  const nav = useNavigate();
  const { user, token, logout } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setOpen(false);
    logout();
    nav("/login");
  };

  return (
    <div className="border-bottom bg-primary">
      <nav className="d-flex align-items-center mx-md-4 justify-content-between py-4 px-3 px-md-0 position-relative">
        <img
          src={require("../../Assest/photo_2026-05-13_22-13-04.jpg")}
          alt=""
          width={"90px"}
          style={{ cursor: "pointer" }}
          onClick={() => nav("/")}
        />

        <div className="d-none d-md-block">
          <div
            className="d-flex align-items-center mt-2 text-white justify-content-center gap-2 gap-md-4 list-unstyled m-0"
            style={{ fontSize: "20px", fontWeight: "450" }}
          >
            <NavLink to="/" className="text-decoration-none">
              <li className="py-1">الصفحة الرئيسية</li>
              <hr className="li-color m-auto" />
            </NavLink>
            <NavLink to="/craftmans" className="text-decoration-none">
              <li className="py-1">الحرفيين</li>
              <hr className="li-color m-auto" />
            </NavLink>
            <NavLink to="/about" className="text-decoration-none">
              <li className="py-1">حول</li>
              <hr className="li-color m-auto" />
            </NavLink>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-center gap-3">
          {token ? (
            <div className="d-flex align-items-center justify-content-center position-relative gap-2">
              <img
                src={
                  user?.account?.person.imageUrl
                    ? require(`../../Assest/${user?.account?.person.imagePath}`)
                    : require(
                        `../../Assest/pngtree-blue-user-icon-profile-and-account-vector-design-vector-sign-vector-png-image_46129432.jpg`,
                      )
                }
                width={"60px"}
                className="rounded-circle"
                alt=""
              />
              <FontAwesomeIcon
                icon={faChevronDown}
                onClick={() => setOpen((prev) => !prev)}
                style={{
                  cursor: "pointer",
                  color: "white",
                  background: "orange",
                }}
                size="lg"
                className="p-1 rounded"
              />

              {open && (
                <div
                  className="position-absolute rounded-4 p-2 bg-white text-end shadow"
                  style={{
                    top: "100%",
                    width: "14rem",
                    left: "-10%",
                    zIndex: "3000",
                    border: "1px solid #eee",
                  }}
                >
                  <div
                    className="d-flex align-items-center gap-3 p-2 mb-2 rounded-3"
                    style={{ backgroundColor: "#f8fafd" }}
                  >
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center bg-secondary text-white"
                      style={{
                        width: "40px",
                        height: "40px",
                        minWidth: "40px",
                      }}
                    >
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div style={{ lineHeight: "1.2", overflow: "hidden" }}>
                      <div
                        className="fw-bold text-dark text-truncate"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {user?.userName || user?.name || "مستخدم"}
                      </div>
                      <small
                        className="text-muted text-truncate d-block"
                        style={{ fontSize: "0.65rem" }}
                      >
                        {user?.account.person?.email || "غير متوفر"}
                      </small>
                    </div>
                  </div>

                  <div
                    className="p-hover d-flex justify-content-between align-items-center p-2 rounded-3 mb-1"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      nav("/myprofile");
                      setOpen(false);
                    }}
                  >
                    <span className="ms-2">ملفي الشخصي</span>
                    <FontAwesomeIcon icon={faUser} />
                  </div>

                  <div
                    className="p-hover d-flex justify-content-between align-items-center p-2 rounded-3 mb-1"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      nav("/myorder");
                      setOpen(false);
                    }}
                  >
                    <span className="ms-2">طلباتي</span>
                    <FontAwesomeIcon icon={faClipboardList} />
                  </div>

                  <div className="my-2 border-bottom"></div>

                  <div
                    className="d-flex justify-content-between align-items-center p-2 rounded-3 text-danger"
                    style={{ backgroundColor: "#fff5f5", cursor: "pointer" }}
                    onClick={handleLogout}
                  >
                    <span className="ms-2">تسجيل خروج</span>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => nav("/login")}
              className="rounded-pill px-3 py-1 text-white border-0"
              style={{ background: "#5590ca" }}
            >
              انشاء حساب
            </button>
          )}

          <div
            className="d-md-none text-white fs-3"
            style={{ cursor: "pointer" }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            className="position-absolute bg-primary w-100 start-0 p-3 shadow-lg d-md-none d-flex flex-column gap-3 text-white border-top border-light"
            style={{ top: "100%", zIndex: "2999" }}
          >
            <NavLink
              to="/"
              className="text-decoration-none text-white fs-5"
              onClick={() => setMobileMenuOpen(false)}
            >
              الصفحة الرئيسية
            </NavLink>
            <NavLink
              to="/craftmans"
              className="text-decoration-none text-white fs-5"
              onClick={() => setMobileMenuOpen(false)}
            >
              الحرفيين
            </NavLink>
            <NavLink
              to="/about"
              className="text-decoration-none text-white fs-5"
              onClick={() => setMobileMenuOpen(false)}
            >
              حول
            </NavLink>
          </div>
        )}
      </nav>
    </div>
  );
}
