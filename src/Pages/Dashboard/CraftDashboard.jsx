import {
  Container,
  Row,
  Col,
  Badge,
  Card,
  Button,
  Spinner,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCoins,
  faList,
  faListAlt,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useContext } from "react";
import "./Dashboard.css";
import OfferModal from "../../Components/Dashboard/OfferModal";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../Api/Axois";
import { CraftsMen, ServiceRequests } from "../../Api/Api";
import { formatDate } from "../../Helpers/Data";
import { AuthContext } from "../../Context/AuthContext";

export default function CraftDashboard() {
  const [orders, setorders] = useState([]);
  const [myCraft, setMyCraft] = useState(null);
  const [selectedId, setSelectedId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchdata() {
      try {
        setLoading(true);

        const craftsmanId = user?.craftManID;

        const [craftsRes, myCraftRes] = await Promise.all([
          Axios.get(ServiceRequests),
          craftsmanId
            ? Axios.get(`${CraftsMen}/${craftsmanId}`)
            : Promise.resolve({ data: null }),
        ]);

        setorders(craftsRes.data);
        setMyCraft(myCraftRes.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (user?.craftManID) {
      fetchdata();
    }
  }, [user]);

  const filterdata = myCraft
    ? orders
        .filter(
          (e) =>
            Number(e.craft?.craftID) === Number(myCraft.craft?.craftID) &&
            e.assignedCraftManID === null &&
            !e.offers?.some(
              (offer) => Number(offer.craftManID) === Number(user?.craftManID),
            ) &&
            Number(e.cityID) === Number(myCraft.account?.person?.city?.cityID),
        )
        .slice(0, 4)
    : [];

  const filterdatamine = orders.filter(
    (e) => Number(e.assignedCraftManID) === Number(user.craftManID),
  );
  if (loading) {
    return (
      <Container className="text-center py-5 mt-5">
        <Spinner animation="border" variant="warning" />
        <p className="mt-2 text-muted">جاري تحميل لوحة التحكم...</p>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="my-4">
        <div>
          <h2 className="fw-bold mb-1 text-primary">
            أهلاً بك مجدداً،{" "}
            {myCraft?.account?.person?.firstName || user?.firstName}{" "}
            {myCraft?.account?.person?.lastName || user?.lastName}
          </h2>
          <p className="text-muted m-0">
            نظرة عامة على الطلبات والمهام الخاصة بك
          </p>
        </div>
      </div>

      <Row className="mb-4 g-3">
        {[
          {
            title: "الرصيد:",
            count: "0",
            color: "success",
            icon: faCoins,
          },
          {
            title: "طلبات بانتظار عرض:",
            count: filterdata.length,
            color: "warning",
            icon: faList,
          },
          {
            title: "طلباتي الحالية:",
            count: filterdatamine.length,
            color: "primary",
            icon: faListAlt,
          },
        ].map((item, idx) => (
          <Col md={4} key={idx}>
            <Card className="border-0 shadow-sm p-3 border-end border-4 border-warning h-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-bold mb-1">{item.title}</div>
                  <div className={`fs-4 fw-bold text-${item.color}`}>
                    {item.count}
                  </div>
                </div>
                <div
                  className={`p-3 rounded-circle bg-${item.color}-subtle text-${item.color}`}
                >
                  <FontAwesomeIcon icon={item.icon} size="lg" />
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="g-4">
        <Col lg={8}>
          <div className="card shadow-sm border-0 p-3 rounded-3 bg-white h-100">
            <div className="d-flex align-items-center mb-3">
              <FontAwesomeIcon
                icon={faList}
                className="text-warning me-2"
                size="lg"
              />
              <h5 className="m-0 fw-bold text-primary">
                أحدث الطلبات في منطقتك
              </h5>
            </div>

            <Row className="g-3">
              {filterdata.length > 0 ? (
                filterdata.map((ser, key) => (
                  <Col md={6} key={key}>
                    <Card className="shadow-sm border-0 p-3 h-100 d-flex flex-column justify-content-between bg-light">
                      <div>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <Badge bg="danger">{ser.craft?.craftName}</Badge>
                          <small className="text-muted">
                            {formatDate(ser.requestDate)}
                          </small>
                        </div>
                        <p className="fw-bold fs-6 mb-2 text-dark">
                          {ser.description}
                        </p>
                        <div className="d-flex align-items-center mb-3">
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className="text-secondary me-1"
                          />
                          <small className="text-muted">
                            {ser.city.cityName}
                          </small>
                        </div>
                      </div>
                      <div className="d-flex gap-2 mt-auto">
                        <Button
                          size="sm"
                          variant="primary"
                          className="rounded-pill px-3 flex-grow-1"
                          onClick={() => {
                            setSelectedId(ser.requestID);
                            setIsModalOpen(true);
                          }}
                        >
                          تقديم عرض
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          className="rounded-pill px-3"
                          onClick={() =>
                            nav(`/dashboard/Crafts/${ser.requestID}`)
                          }
                        >
                          التفاصيل
                        </Button>
                      </div>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col xs={12} className="text-center py-4 text-muted fw-bold">
                  لا توجد طلبات جديدة متاحة في منطقتك حالياً
                </Col>
              )}
            </Row>
          </div>
        </Col>

        <Col lg={4}>
          <div className="card shadow-sm border-0 p-3 rounded-3 bg-white h-100">
            <div className="d-flex align-items-center mb-3">
              <FontAwesomeIcon
                icon={faBook}
                className="text-warning me-2"
                size="lg"
              />
              <h5 className="m-0 fw-bold text-primary">المهام الحالية:</h5>
            </div>

            <div className="d-flex flex-column gap-3">
              {filterdatamine.length > 0 ? (
                filterdatamine.map((ser, key) => (
                  <Card
                    key={key}
                    className="shadow-sm border-0 border-end border-4 border-warning bg-light"
                  >
                    <Card.Body className="d-flex justify-content-between align-items-center p-3">
                      <div className="fw-bold text-dark fs-6">
                        {ser.description}
                      </div>
                      <Badge bg="info">{ser.status}</Badge>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <div className="text-center py-4 text-muted fw-bold">
                  لا توجد مهام حالية مسندة إليك
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <OfferModal
        isOpen={isModalOpen}
        requestId={selectedId}
        craftManID={myCraft?.craftManID || user?.craftManID}
        onClose={() => setIsModalOpen(false)}
      />
    </Container>
  );
}
