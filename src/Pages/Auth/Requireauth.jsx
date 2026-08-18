import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import Err403 from "../../Components/Dashboard/403";

export default function Requireauth({ allowedrole }) {
  const { user, token, loading } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  if (loading || !user) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">جارِ التحميل...</span>
        </div>
      </div>
    );
  }

  return allowedrole.includes(user.role) ? (
    <Outlet />
  ) : (
    <Err403 role={user.role} />
  );
}
