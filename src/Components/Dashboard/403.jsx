import { Link } from "react-router-dom";
import "./403.css";
export default function Err403({ role }) {
  const isCraftsman = role === "Craftsman";
  return (
    <div className="text-wrapper">
      {" "}
      <div className="title1">403 - ACCESS DENIED</div>{" "}
      <div className="subtitle">
        {" "}
        Oops, you don't have permission to access this page{" "}
        <Link
          to={isCraftsman ? "/dashboard" : "/"}
          style={{ display: "block", textAlign: "center", marginTop: "15px" }}
        >
          {" "}
          {isCraftsman ? "Go to Dashboard" : "Go to Home"}{" "}
        </Link>{" "}
      </div>{" "}
    </div>
  );
}
