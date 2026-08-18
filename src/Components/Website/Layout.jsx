import { useEffect, useState } from "react";
import { Axios } from "../../Api/Axois";
import { Crafts } from "../../Api/Api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Accordion, Container } from "react-bootstrap";

export default function Layout() {
  const [crafts, setcrafts] = useState([]);
  const [loading, setloading] = useState(false);

  // مصفوفة أبرز أعمالنا (ضعي أسماء الصور الموجودة لديك في مجلد Assest)
  const portfolioWorks = [
    {
      id: 1,
      image: require("../../Assest/photo_2026-08-18_05-42-24.jpg"),
      className: "work-img-1",
    },
    {
      id: 2,
      image: require("../../Assest/photo_2026-08-18_05-42-27.jpg"),
      className: "work-img-2",
    },
    {
      id: 3,
      image: require("../../Assest/photo_2026-08-18_05-46-41.jpg"),
      className: "work-img-3",
    },
    {
      id: 4,
      image: require("../../Assest/photo_2026-08-18_05-42-20.jpg"),
      className: "work-img-4",
    },
    {
      id: 5,
      image: require("../../Assest/photo_2026-08-18_05-41-43.jpg"),
      className: "work-img-5",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const res = await Axios.get(Crafts);
        setcrafts(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setloading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ overflowX: "hidden" }}>
      {/* قسم أبرز الخدمات */}
      <div className="container mt-5">
        <div className="text-center mb-5 animate-fade-in">
          <h2 className="fw-bold text-primary">الخدمات المقدمة</h2>
          <div className="mx-auto line"></div>
        </div>
      </div>

      <div className="d-flex flex-wrap m-4 gap-4 p-3 align-items-center justify-content-center">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="m-2">
                  <Skeleton circle={true} height={200} width={200} />
                </div>
              ))
          : crafts.map((item, index) => (
              <div
                key={item.craftID || index}
                className="service-card-anim text-center m-2"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <img
                  className="rounded-circle shadow-lg hover-zoom"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                  alt={item.name || "خدمة"}
                  src={
                    item.imageUrl
                      ? require(`../../Assest/${item.imageUrl}`)
                      : ""
                  }
                />
                <h5 className="mt-3 fw-bold text-dark">{item.name}</h5>
              </div>
            ))}
      </div>

      {/* قسم أبرز أعمالنا */}
      <div className="container my-5 py-4">
        <div className="text-center mb-5 animate-fade-in">
          <h2 className="fw-bold text-primary">أبرز أعمالنا</h2>
          <div className="mx-auto line"></div>
        </div>

        <div
          className="portfolio-grid-container mx-auto"
          style={{ maxWidth: "1200px" }}
        >
          {portfolioWorks.map((work, index) => (
            <div
              key={work.id}
              className={`portfolio-item-box portfolio-anim ${work.className}`}
              style={{ animationDelay: `${index * 0.2}s ` }}
            >
              <div className="card border-0 shadow-lg h-100 rounded-4 overflow-hidden work-card">
                <img
                  src={work.image}
                  alt="أبرز أعمالنا"
                  className="w-100 h-100 object-fit-cover work-img"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* قسم الأسئلة الشائعة (معدل باستخدام مكونات React-Bootstrap لضمان عملها 100%) */}
      <div className="container my-5 py-4">
        <div className="text-center mb-5 animate-fade-in">
          <h2 className="fw-bold text-primary">الأسئلة الشائعة</h2>
          <div className="mx-auto line"></div>
        </div>

        <Container style={{ maxWidth: "800px" }}>
          <Accordion
            defaultActiveKey="0"
            className="shadow-sm rounded-3 overflow-hidden"
          >
            <Accordion.Item
              eventKey="0"
              className="border-0 mb-3 shadow-sm rounded-3"
            >
              <Accordion.Header className="fw-bold text-end">
                كيف يمكنني طلب خدمة؟
              </Accordion.Header>
              <Accordion.Body className="text-muted text-end">
                يمكنك طلب الخدمة بسهولة عبر الضغط على زر ابدأ الآن وتسجيل
                الدخول.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item
              eventKey="1"
              className="border-0 mb-3 shadow-sm rounded-3"
            >
              <Accordion.Header className="fw-bold text-end">
                كيف تعمل المنصة؟
              </Accordion.Header>
              <Accordion.Body className="text-muted text-end">
                من خلال طلبك للمهنة سوف تصلك قائمة من عروض الحرفيين وتقوم
                باختيار الانسب لك
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item
              eventKey="2"
              className="border-0 mb-3 shadow-sm rounded-3"
            >
              <Accordion.Header className="fw-bold text-end">
                كيف يمكنني الوثوق بالحرفيين الموجودين في المنصة؟
              </Accordion.Header>
              <Accordion.Body className="text-muted text-end">
                نحرص في منصتنا على التحقق من هوية الحرفيين، بالإضافة إلى عرض
                تقييمات وآراء العملاء السابقين بكل شفافية لمساعدتك في اختيار
                الأنسب.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item
              eventKey="3"
              className="border-0 mb-3 shadow-sm rounded-3"
            >
              <Accordion.Header className="fw-bold text-end">
                كيف يتم تقييم الحرفيين؟
              </Accordion.Header>
              <Accordion.Body className="text-muted text-end">
                بعد إتمام الخدمة، يتيح لك النظام تقييم أداء الحرفي لكتابة
                ملاحظاتك بكل شفافية.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .service-card-anim {
          animation: fadeInUp 0.8s ease forwards;
          opacity: 0;
        }

        .portfolio-anim {
          animation: fadeInUp 0.9s ease forwards;
          opacity: 0;
        }

        /* تنسيق الشبكة الفنية الشبيهة بالصورة (Mosaic / Asymmetric Grid) */
        .portfolio-grid-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(2, 220px);
          gap: 16px;
        }

        .work-img-1 { grid-column: span 1; grid-row: span 1; }
        .work-img-2 { grid-column: span 1; grid-row: span 1; }
        .work-img-3 { grid-column: span 1; grid-row: span 2; }
        .work-img-4 { grid-column: span 1; grid-row: span 1; }
        .work-img-5 { grid-column: span 1; grid-row: span 1; }

        @media (max-width: 768px) {
          .portfolio-grid-container {
            grid-template-columns: repeat(1, 1fr);
            grid-template-rows: auto;
          }
          .work-img-1, .work-img-2, .work-img-3, .work-img-4, .work-img-5 {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
            height: 250px;
          }
        }

        .hover-zoom:hover {
          transform: scale(1.08);
        }

        .work-card:hover .work-img {
          transform: scale(1.08);
        }
        
        .work-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .work-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,.15) !important;
        }.work-img {
          transition: transform 0.5s ease;
        }
      `}</style>
    </div>
  );
}
