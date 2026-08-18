import { Outlet } from "react-router-dom";

import Topbar from "../../Components/Dashboard/Topbar";
import SideBar from "../../Components/Dashboard/Sidebar";

export default function Dashboard() {
  return (
    <div className="position-relative dashboard ">
      <Topbar />
      <div style={{ marginTop: "70px" }} className="d-flex gap-3">
        <SideBar />
        <div className="w-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
