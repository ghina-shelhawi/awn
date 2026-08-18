import { Outlet } from "react-router-dom";
import NavBar from "../../Components/Website/Navbar";
import Footer from "../../Components/Website/Footer";

export default function WebsiteLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}
