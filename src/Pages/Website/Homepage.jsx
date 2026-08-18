import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Layout from "../../Components/Website/Layout";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";

export default function Homepage() {
  const cookie = new Cookies();
  const token = cookie.get("token");

  const nav = useNavigate();

  return (
    <div>
      <div className="tt d-flex align-items-center" dir="rtl">
        <Container>
          <div
            className="homepage-content text-end"
            style={{ fontFamily: "Amiri, serif", fontWeight: "bold" }}
          >
            <h1
              className="p-2 m-1 fw-bold text-primary"
              style={{ fontSize: "50px" }}
            >
              عون ... في كل خطوة صيانة
            </h1>
            <h3 className="p-2 text-muted fw-medium">
              وجهتك الاولى للوصول الى أفضل الحرفيين في منطقتك
            </h3>

            <button
              onClick={
                token
                  ? () => nav("/order")
                  : () => toast.error("يجب تسجيل الدخول اولا ")
              }
              className="mt-3 px-4 py-2 fw-bold text-primary bg-secondary btn-lg rounded-pill border-0 shadow fs-3"
            >
              ابدأ الان
            </button>
          </div>
        </Container>
      </div>

      <Layout />
    </div>
  );
}
