import { useEffect, useState, useContext } from "react";
import { Badge, Button, Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import OfferModal from "../../Components/Dashboard/OfferModal";
import { Axios } from "../../Api/Axois";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CraftsMen, ServiceRequests } from "../../Api/Api";
import ViewOfferModal from "../../Components/Dashboard/craftman/ViewOfferModal";
import { AuthContext } from "../../Context/AuthContext";

export default function Allorders() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenoffer, setIsModalOpenoffer] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [allorders, setorders] = useState([]);
  const [myCraft, setMyCraft] = useState(null);
  const [craftManIdState, setCraftManIdState] = useState(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchdata() {
      setLoading(true);
      try {
        const craftsmanId = user?.craftManID;

        const [craftsRes, myCraftRes] = await Promise.all([
          Axios.get(ServiceRequests),
          craftsmanId
            ? Axios.get(`${CraftsMen}/${craftsmanId}`)
            : Promise.resolve({ data: null }),
        ]);

        setorders(craftsRes.data);
        setMyCraft(myCraftRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (user?.craftManID) {
      fetchdata();
    } else {
      setLoading(false);
    }
  }, [user]);

  const filterdata = myCraft
    ? allorders.filter((e) => {
        const isSameCraft =
          Number(e.craftID) === Number(myCraft.craft?.craftID);

        const orderCityId = e.cityID ? Number(e.cityID) : null;
        const craftCityId = Number(
          myCraft.account?.person?.city?.cityID || myCraft.cityID || 0,
        );
        const isSameCity = orderCityId === null || orderCityId === craftCityId;

        return isSameCraft && isSameCity;
      })
    : allorders;

  const filteredData = filterdata.filter((ser) => {
    if (filter === "All") return true;
    if (filter === "UnAssigned")
      return ser.status === "UnAssigned" || ser.assignedCraftManID === null;

    if (filter === "Assigned" || filter === "completed")
      return (
        Number(ser.assignedCraftManID) === Number(myCraft?.craftManID) ||
        ser.status?.toLowerCase() === "completed" ||
        ser.status?.toLowerCase() === "assigned"
      );
    return false;
  });

  const SkeletonCard = () => (
    <Col md={4} className="mb-3">
      <Card className="shadow-sm border-0 p-3 h-100 bg-light">
        <div className="d-flex justify-content-between mb-3">
          <Skeleton width={80} />
          <Skeleton width={50} />
        </div>
        <Skeleton height={40} className="mb-3" />
        <div className="d-flex align-items-center mb-4">
          <Skeleton circle width={20} height={20} className="me-2" />
          <Skeleton width={100} />
        </div>
        <div className="d-flex justify-content-center gap-2 mt-auto">
          <Skeleton width={100} height={35} borderRadius={20} />
          <Skeleton width={100} height={35} borderRadius={20} />
        </div>
      </Card>
    </Col>
  );

  return (
    <Container className="py-4">
      <div className="d-flex align-items-center mb-1 mt-4 gap-2">
        <FontAwesomeIcon
          icon={faList}
          size="xl"
          color="orange"
          className="mt-1"
        />
        <h2 className="fw-bold text-primary">كل الطلبات الواردة:</h2>
      </div>
      <div className="d-flex gap-2 justify-content-between mb-4 text-dark flex-wrap align-items-center">
        <div className="text-muted">
          تعرض هذه الصفحة أهم المشكلات الواردة لتقديم عرضك في منطقتك.
        </div>
        <div className="d-flex gap-2">
          <Button
            variant={filter === "All" ? "primary" : "outline-primary"}
            onClick={() => setFilter("All")}
          >
            الكل
          </Button>
          <Button
            variant={filter === "UnAssigned" ? "primary" : "outline-primary"}
            onClick={() => setFilter("UnAssigned")}
          >
            غير مسندة
          </Button>
          <Button
            variant={filter === "Assigned" ? "primary" : "outline-primary"}
            onClick={() => setFilter("Assigned")}
          >
            مسندة إلي
          </Button>
        </div>
      </div>

      <Row className="g-3">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
        ) : filteredData.length > 0 ? (
          filteredData.map((ser, index) => {
            // التحقق إذا كان الحرفي الحالي قد قدم عرضاً لهذا الطلب
            const hasMyOffer = ser.offers?.some(
              (offer) =>
                Number(offer.craftManID) ===
                Number(myCraft?.craftManID || user?.craftManID),
            );

            return (
              <Col md={4} key={index}>
                <Card className="shadow-sm border-0 p-3 h-100 bg-white d-flex flex-column justify-content-between bg-light">
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <Badge bg="danger">{ser.craft?.craftName}</Badge>
                      <Badge
                        bg={ser.status === "UnAssigned" ? "danger" : "success"}
                      >
                        {ser.status}
                      </Badge>
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
                        {ser.account?.person?.city?.cityName}
                      </small>
                    </div>
                  </div>

                  <hr className="my-2" />

                  <div className="mt-auto">
                    {ser.status === "UnAssigned" || !ser.assignedCraftManID ? (
                      hasMyOffer ? (
                        // إذا قمت بتقديم عرض لهذا الطلب، تظهر هذه الشارة فقط لك
                        <div className="text-center w-100">
                          <Badge bg="info" className="py-2 px-3 fs-6 w-100">
                            تم تقديم عرضك
                          </Badge>
                        </div>
                      ) : (
                        // إذا لم تقم بتقديم عرض، تظهر أزرار التقديم والتفاصيل العادية
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          <Button
                            size="sm"
                            variant="primary"
                            className="rounded-pill px-3 flex-grow-1"
                            onClick={() => {
                              if (myCraft) {
                                setCraftManIdState(myCraft.craftManID);
                                setSelectedId(ser.requestID);
                                setIsModalOpen(true);
                              }
                            }}
                          >
                            تقديم عرض
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            className="rounded-pill px-3 flex-grow-1"
                            onClick={() =>
                              nav(`/dashboard/Crafts/${ser.requestID}`)
                            }
                          >
                            التفاصيل
                          </Button>
                        </div>
                      )
                    ) : (
                      <div className="d-flex justify-content-center">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="rounded-pill px-4 text-white"
                          onClick={() => {
                            setSelectedId(ser.requestID);
                            setIsModalOpenoffer(true);
                          }}
                        >
                          رؤية العرض
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              </Col>
            );
          })
        ) : (
          <Col xs={12} className="text-center py-5">
            <p className="text-muted fw-bold fs-5">
              لا توجد طلبات لعرضها حالياً في منطقتك
            </p>
          </Col>
        )}
      </Row>

      <OfferModal
        isOpen={isModalOpen}
        requestId={selectedId}
        craftManID={craftManIdState}
        onClose={() => setIsModalOpen(false)}
      />
      <ViewOfferModal
        isOpen={isModalOpenoffer}
        requestId={selectedId}
        craftManID={myCraft?.craftManID}
        onClose={() => setIsModalOpenoffer(false)}
      />
    </Container>
  );
}
