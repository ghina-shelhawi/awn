import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Pages/Website/Website.css";
import "./Components/Dashboard/Dash.css";
import "./Pages/Dashboard/Dashboard.css";
import { ToastContainer } from "react-toastify";
import "./sass/Custom.css";
import "./Pages/Dashboard/Dashboard.css";
import "./Pages/Website/Website.css";
import "./index.css";
import { HashRouter } from "react-router-dom";
import Windocontext from "./Context/Windowsize";
import "react-loading-skeleton/dist/skeleton.css";
import Menucontext from "./Context/Menu";
import { AuthContext, AuthProvider } from "./Context/AuthContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Windocontext>
    <Menucontext>
      <AuthProvider>
        <HashRouter>
          <App />
          <ToastContainer position="top-center" />
        </HashRouter>
      </AuthProvider>
    </Menucontext>
  </Windocontext>,
);
