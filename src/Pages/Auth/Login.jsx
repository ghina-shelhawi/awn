import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, replace, useNavigate } from "react-router-dom";
import axios from "axios";

import { baseuRL, login } from "../../Api/Api";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const { loginData } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setErr("");

    try {
      const res = await axios.post(`${baseuRL}/${login}`, {
        userName,
        password,
      });

      setLoading(false);
      toast.success("تم تسجيل الدخول بنجاح اهلا بك");
      const token = res.data.token;
      const role = res.data?.identity?.role;
      const user = res.data.identity;
      console.log(role);
      loginData(token, user);

      if (role === "Craftsman") {
        navigate("/dashboard", { replace: true });
      } else if (role === "Admin") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        setErr("اسم المستخدم أو كلمة المرور غير صحيحة");
      } else {
        setErr("حدث خطأ في الاتصال بالخادم");
      }
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center my-5">
      <div
        className="card my-5 shadow-lg p-4"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "15px" }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">أهلاً بك في عون</h2>
          <p className="text-muted small">سجل دخولك للبدء في تقديم خدماتك</p>
        </div>

        {err && (
          <div className="alert alert-danger text-center" role="alert">
            {err}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">اسم المستخدم</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your username"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">كلمة المرور</label>
            <input
              type="password"
              className="form-control"
              placeholder="****"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-secondary text-white w-100 py-2 mt-3 fw-bold"
            disabled={loading}
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل دخول"}
          </button>
        </form>

        <div className="text-center mt-3">
          <NavLink to="/register" className="text-decoration-none">
            ليس لديك حساب؟ سجل الآن
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
