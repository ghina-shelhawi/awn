import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Crafts } from "../../../Api/Api";
import { PlusLg, Trash } from "react-bootstrap-icons";
import { Col, Row, Card, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { Axios } from "../../../Api/Axois";
import AddCraftModal from "../../../Components/Dashboard/Admin/AddCraftModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools } from "@fortawesome/free-solid-svg-icons";

export default function CategoriesPage() {
  const [crafts, setcrafts] = useState([]);
  const [reload, setreload] = useState(0);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Axios.get(`${Crafts}`)
      .then((res) => {
        setcrafts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("حدث خطأ أثناء تحميل البيانات");
      })
      .finally(() => setLoading(false));
  }, [reload]);

  async function deletecraft(id) {
    try {
      await Axios.delete(`${Crafts}/${id}`);
      toast.success("تم حذف المهنة بنجاح");
      setreload((prev) => prev + 1);
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error("فشل الحذف، حاول مجدداً");
    }
  }

  return (
    <Container
      fluid
      className="my-5"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      <div className="d-flex gap-2 align-items-center mb-4">
        <FontAwesomeIcon
          icon={faTools}
          size="xl"
          color="orange"
          className="mb-4"
        ></FontAwesomeIcon>
        <div className="m-0">
          <h2 className="fw-bold text-dark mb-1 ">إدارة الخدمات والمهن</h2>
          <p className="text-muted m-0 small">
            ادارة الحرف التي ستظهر على المنصة:{" "}
          </p>
        </div>
      </div>

      <Row className="g-4 mt-3">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <Col key={i} xs={12} sm={6} md={4} lg={3} xl={2}>
              <Card className="h-100 border-0 shadow-sm">
                <Skeleton height={180} />
                <Card.Body>
                  <Skeleton count={2} />
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <>
            {crafts.map((cat) => (
              <Col key={cat.craftID} xs={12} sm={6} md={4} lg={3} xl={2}>
                <Card
                  className="shadow-sm border-0 h-100 overflow-hidden"
                  style={{
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 20px rgba(0,0,0,0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ height: "180px", overflow: "hidden" }}>
                    <img
                      src={
                        cat.imageUrl
                          ? require(`../../../Assest/${cat.imageUrl}`)
                          : null
                      }
                      alt={cat.category}
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <Card.Body className="text-center p-3">
                    <Card.Title className="fs-6 fw-bold text-secondary mb-3">
                      {cat.category}
                    </Card.Title>
                    <button
                      className="btn btn-outline-danger btn-sm rounded-pill px-4"
                      onClick={() => deletecraft(cat.craftID)}
                    >
                      <Trash className="me-1" /> حذف
                    </button>
                  </Card.Body>
                </Card>
              </Col>
            ))}

            <Col xs={12} sm={6} md={4} lg={3} xl={2}>
              <Card
                className="h-100 align-items-center justify-content-center text-center p-4 border-2"
                style={{
                  border: "2px dashed #ffc107",
                  cursor: "pointer",
                  backgroundColor: "#fffdf9",
                  transition: "0.3s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fff5e6")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fffdf9")
                }
                onClick={() => setShow(true)}
              >
                <PlusLg className="text-warning fs-1" />
                <h6 className="mt-3 text-secondary fw-bold">إضافة مهنة</h6>
              </Card>
            </Col>
          </>
        )}
      </Row>

      <AddCraftModal
        show={show}
        onHide={() => setShow(false)}
        onSuccess={() => setreload((prev) => prev + 1)}
      />
    </Container>
  );
}
