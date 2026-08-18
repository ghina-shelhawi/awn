import { CloseButton, Container } from "react-bootstrap";
import NavBar from "../../Components/Website/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointer,
  faMobileScreenButton,
  faTools,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function About() {
  const nav = useNavigate();
  return (
    <>
      <div
        className="about-page"
        style={{ direction: "rtl", fontFamily: "Cairo, sans-serif" }}
      >
        <section className="py-5 bg-light">
          <div className="container px-4 px-lg-5 my-5">
            <div className="row gx-4 gx-lg-5 align-items-center">
              <div className="col-md-6 text-end">
                <h1 className="display-4 fw-bolder  mb-3 text-secondary">
                  من نحن؟
                </h1>
                <p className="lead fw-normal text-muted mb-4">
                  منصة <span className="text-primary fw-bold">"عون"</span> هي
                  حلقة الوصل الرقمية بين أصحاب المهارات والحرفيين وبين الباحثين
                  عن خدمات احترافية. انطلقت المنصة لتسهيل الوصول إلى الكفاءات
                  المهنية في سوق العمل المحلي، مع ضمان تجربة مستخدم سلسة،
                  موثوقة، وسريعة.
                </p>
                <button
                  onClick={() => nav("/")}
                  className="btn btn-primary btn-lg rounded-pill px-5 shadow"
                >
                  ابدأ الآن
                </button>
              </div>
              <div className="col-md-6">
                <img
                  className="card-img-top mb-5 mb-md-0 rounded-4 shadow-lg border"
                  src={require("../../Assest/photo_2026-05-04_00-23-06.jpg")}
                  alt="حرفي يعمل بإتقان"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="fw-bold">أهدافنا الاستراتيجية</h2>
              <div className="mx-auto line"></div>
            </div>
            <div className="row g-4 justify-content-center">
              {[
                {
                  title: "تسهيل الوصول",
                  desc: "تمكين المستخدمين من العثور على الحرفي المناسب وحجز الخدمة بضغطة زر.",
                  icon: faHandPointer,
                  color: "#0d6efd",
                },
                {
                  title: "دعم الحرفيين",
                  desc: "توفير مساحة رقمية للمهنيين لعرض مهاراتهم وتسويق أعمالهم بشكل منظم.",
                  icon: faTools,
                  color: "#f1c40f",
                },
                {
                  title: "الموثوقية",
                  desc: "بناء مجتمع خدمي قائم على التقييمات الحقيقية والشفافية في التعامل.",
                  icon: faMobileScreenButton,
                  color: "#e67e22",
                },
              ].map((obj, i) => (
                <div key={i} className="col-md-4">
                  <div className="card h-100 border-0 shadow-sm text-center p-4 hover-lift">
                    <div
                      className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3 mx-auto"
                      style={{
                        width: "80px",
                        background: `${obj.color}`,
                        height: "80px",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={obj.icon}
                        size="3x"
                      ></FontAwesomeIcon>
                    </div>
                    <h4 className="fw-bold">{obj.title}</h4>
                    <p className="text-muted">{obj.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-5   bg-primary text-white">
          <div className="container text-center">
            <div className="row g-4">
              <div className="col-6 col-md-3">
                <h2 className="fw-bold mb-0">1500+</h2>
                <small className="text-secondary">حرفي مسجل</small>
              </div>
              <div className="col-6 col-md-3">
                <h2 className="fw-bold mb-0">50k+</h2>
                <small className="text-secondary">عملية ناجحة</small>
              </div>
              <div className="col-6 col-md-3">
                <h2 className="fw-bold mb-0">4.9/5</h2>
                <small className="text-secondary">رضا العملاء</small>
              </div>
              <div className="col-6 col-md-3">
                <h2 className="fw-bold mb-0">24/7</h2>
                <small className="text-secondary">دعم فني</small>
              </div>
            </div>
          </div>
        </section>
        <style>
          {`
        .hover-lift { transition: transform 0.3s ease; }
        .hover-lift:hover { transform: translateY(-10px); `}
        </style>
      </div>
    </>
  );
}
