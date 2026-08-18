import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Homepage from "./Pages/Website/Homepage";
import Craftsman from "./Pages/Website/Craftsman";

import Dashboard from "./Pages/Dashboard/Dashboard";

import "react-toastify/dist/ReactToastify.css"; // لا تنسَ استيراد ملف الـ CSS
import About from "./Pages/Website/About";
import Myprofile from "./Pages/Website/Myprofile";
import Orderservice from "./Pages/Website/Orderservice";
import Details from "./Pages/Website/Details";
import Myorder from "./Pages/Website/Myorders";

import WebsiteLayout from "./Pages/Website/Wbsitelayout";
import Offerservice from "./Pages/Website/Offerservice";
import CraftDashboard from "./Pages/Dashboard/CraftDashboard";
import Problemdetalis from "./Pages/Dashboard/Problemdetails";
import Allorders from "./Pages/Dashboard/Allorders";
import ProfileSettings from "./Pages/Dashboard/Profile";
import MyServices from "./Pages/Dashboard/Myservices";
import WorkSchedule from "./Pages/Dashboard/Availibity";
import Register from "./Pages/Auth/Register";
import Users from "./Pages/Dashboard/Admin/Users";
import CraftsmanManagement from "./Pages/Dashboard/Admin/Allcraftsman";
import CategoriesPage from "./Pages/Dashboard/Admin/craft";
import Complaint from "./Pages/Dashboard/Admin/Complaint";
import Finanical from "./Pages/Dashboard/Admin/Finanical";
import MyOffers from "./Pages/Dashboard/Myoffer";

import City from "./Pages/Dashboard/Admin/city";

import Orderreview from "./Pages/Dashboard/Admin/OrderReviw";
import ManageRequests from "./Pages/Website/Myorders";
import Manageorder from "./Pages/Dashboard/Admin/Manageorder";
import DashboardHome from "./Pages/Dashboard/Admin/AdminDas";
import Requireauth from "./Pages/Auth/Requireauth";
import Err403 from "./Components/Dashboard/403";

export default function App() {
  return (
    <div>
      <Routes>
        <Route element={<WebsiteLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/403" element={<Err403 />} />
          <Route path="/" element={<Homepage />} />

          <Route path="/about" element={<About />} />
          <Route path="/order" element={<Orderservice />} />

          <Route path="/myprofile" element={<Myprofile />} />
          <Route path="/myorder" element={<Myorder />} />
          <Route path="/myorder/offer/:id" element={<Offerservice />} />
          <Route path="/craftmans" element={<Craftsman />}></Route>
          <Route path="/details/:id" element={<Details />}></Route>
        </Route>
        <Route element={<Requireauth allowedrole={["Craftsman", "Admin"]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route element={<Requireauth allowedrole={["Craftsman"]} />}>
              <Route path="Craftdash" element={<CraftDashboard />}></Route>
              <Route path="Crafts/:id" element={<Problemdetalis />} />
              <Route path="profile" element={<ProfileSettings />} />
              <Route path="myservices" element={<MyServices />} />
              <Route path="availiblity" element={<WorkSchedule />} />
              <Route path="myoffer" element={<MyOffers />} />
              <Route path="allorder" element={<Allorders />} />
            </Route>
            <Route element={<Requireauth allowedrole={["Admin"]} />}>
              <Route path="user" element={<Users />} />
              <Route path="craft" element={<CategoriesPage />} />
              <Route path="Allcraftsman" element={<CraftsmanManagement />} />
              <Route path="complaint" element={<Complaint />} />
              <Route path="financial" element={<Finanical />} />

              <Route path="city" element={<City />} />
              <Route path="orderreview" element={<Orderreview />} />
              <Route path="Awnorder" element={<Manageorder />} />
              <Route path="admindash" element={<DashboardHome />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
