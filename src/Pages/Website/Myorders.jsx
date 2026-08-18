import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Nav, Card, Button, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faClock,
  faCreditCard,
  faCalendar,
  faAngleLeft,
  faExclamationTriangle,
  faStar,
  faCheckDouble,
  faCheckCircle,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ComplaintModal from "../../Components/Website/ComplaintModal";
import Review from "../../Components/Website/Review";
import PaymentModal from "../../Components/Website/PaymentModal";
import { Axios } from "../../Api/Axois";
import { ServiceRequests } from "../../Api/Api";
import Transform from "../../Helpers/Transform";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";

const ManageRequests = () => {
  const [myorder, setmyorder] = useState([]);
  const [loadin, setLoading] = useState(false);
  const { user, loading } = useContext(AuthContext);
  async function fetchdata() {
    setLoading(true);
    try {
      const res = await Axios.get(`/${ServiceRequests}`);
      setmyorder(res.data);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);

  const [activeTab, setActiveTab] = useState("all");
  const nav = useNavigate();

  const [showComplaint, setShowComplaint] = useState(false);
  const [showreview, setshowreview] = useState(false);
  const [showPaymentModal, setshowPaymentModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const userAccountID = user?.accountID;

  const userRequests = myorder.filter((req) => req.accountID === userAccountID);

  const filteredRequests = userRequests.filter((req) => {
    if (activeTab === "all") return true;
    if (activeTab === "UnAssigned") return req.status === "UnAssigned";
    if (activeTab === "completed") return req.status === "completed";
    return true;
  });

  if (!user || loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">جارِ التحميل...</span>
        </div>
      </div>
    );
  }

  return filteredRequests.length !== 0 ? (
    <>
      <div className="mb-5">
        <Container>
          <div className="mt-5 justify-content-between d-flex align-items-center">
            <div>
              <h2 className="fw-bold text-dark mb-1">إدارة الطلبات:</h2>
              <p className="text-muted small">
                تابع حالة طلباتك والعروض المقدمة من الحرفيين
              </p>
            </div>

            <Nav
              variant="pills"
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-4 gap-2 border-0 "
            >
              <Nav.Item>
                <Nav.Link
                  eventKey="all"
                  className="rounded-2 px-3 py-1 custom-tab"
                >
                  الكل ({userRequests.length})
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="UnAssigned"
                  className="rounded-2 px-3 py-1 custom-tab"
                >
                  قيد التنفيذ (
                  {userRequests.filter((r) => r.status === "UnAssigned").length}
                  )
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="completed"
                  className="rounded-2 px-3 py-1 custom-tab"
                >
                  مكتملة (
                  {userRequests.filter((r) => r.status === "completed").length})
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <div>
            {loadin
              ? Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div style={{ minHeight: "200px" }} key={i}>
                      <SkeletonTheme highlightColor="#d8dde5">
                        <div className="card p-3 mb-3">
                          <Skeleton height={75} width={75} className="mb-2" />
                          <Skeleton count={3} />
                        </div>
                      </SkeletonTheme>
                    </div>
                  ))
              : userRequests.length > 0 && (
                  <Row className="g-3">
                    {filteredRequests.map((request) => (
                      <Col xs={12} key={request.requestID}>
                        <Card className="border-0 shadow p-3 rounded-3 bg-white border-light-subtle">
                          <Row className="align-items-start">
                            <Col
                              md={12}
                              className="d-flex align-items-center justify-content-between gap-1"
                            >
                              <div className="d-flex align-items-center gap-3">
                                <img
                                  src={request.ImagePath}
                                  className="rounded-3 shadow-2xs"
                                  style={{
                                    width: "75px",
                                    height: "75px",
                                    objectFit: "cover",
                                  }}
                                  alt=""
                                />
                                <div className="d-flex flex-column">
                                  <span className="text-warning small fw-bold mt-1">
                                    {request.craft?.category}
                                  </span>
                                  <h4 className="fw-bold h5 text-dark mb-1">
                                    {request.description}
                                  </h4>
                                  <div className="text-muted small d-flex align-items-center gap-1 mb-2">
                                    <FontAwesomeIcon
                                      icon={faMapMarkerAlt}
                                      className="text-secondary"
                                    />
                                    <span>{request.city?.cityName}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-center gap-2">
                                <div>
                                  {request.status === "completed" && (
                                    <Badge
                                      bg="info"
                                      className="rounded-2 p-2 small fw-normal"
                                    >
                                      <FontAwesomeIcon
                                        icon={faCheckDouble}
                                        className="ms-1"
                                        size="lg"
                                      />
                                      مكتملة
                                    </Badge>
                                  )}
                                </div>
                                {request.status === "Assigned" && (
                                  <div>
                                    <Badge
                                      bg={"success"}
                                      className=" rounded-2 p-2 small fw-normal"
                                    >
                                      <FontAwesomeIcon
                                        icon={faCheckCircle}
                                        size="lg"
                                        className="ms-1"
                                      />
                                      تم الحجز والموافقة
                                    </Badge>
                                  </div>
                                )}

                                <div>
                                  {request.status === "Assigned" ||
                                  request.status === "completed" ? (
                                    <Badge
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      bg="danger"
                                      className="small p-2 rounded-2 fw-bold"
                                      onClick={() => {
                                        setSelectedRequestId(request.requestID);
                                        setShowComplaint(true);
                                      }}
                                    >
                                      <FontAwesomeIcon
                                        icon={faExclamationTriangle}
                                        size="lg"
                                      />
                                    </Badge>
                                  ) : null}
                                </div>
                                <div>
                                  {request.status === "UnAssigned" && (
                                    <Badge className="rounded-2 p-2 small fw-normal">
                                      <FontAwesomeIcon
                                        icon={faClock}
                                        className="ms-1"
                                        size="lg"
                                      />
                                      قيد انتظار العروض
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </Col>
                          </Row>

                          <hr className="text-muted opacity-25 my-3" />

                          <Row className="align-items-center d-flex justify-content-between g-2">
                            <Col md={6} xs={12}>
                              {request.assignedCraftMan ? (
                                <div className="d-flex align-items-center justify-content-between ">
                                  <div className="d-flex align-items-center gap-2">
                                    <img
                                      src={""}
                                      className="rounded-circle"
                                      width="40"
                                      height="40"
                                      style={{ objectFit: "cover" }}
                                      alt=""
                                    />
                                    <div>
                                      <div className="text-muted text-xs">
                                        الحرفي المختار:
                                      </div>
                                      <div className="fw-bold text-dark small">
                                        {
                                          request.assignedCraftMan.account
                                            ?.person.firstName
                                        }{" "}
                                        {
                                          request.assignedCraftMan.account
                                            ?.person.lastName
                                        }
                                      </div>
                                    </div>
                                  </div>
                                  <div className="me-2">
                                    <div className="text-muted text-xs">
                                      السعر
                                    </div>
                                    <div className="fw-bold me-2 text-dark small">
                                      {request.agreedPrice}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="d-flex align-items-center justify-content-between ">
                                  <div>
                                    <div className="text-muted text-xs">
                                      <FontAwesomeIcon
                                        icon={faCalendar}
                                        color="orange"
                                        size="lg"
                                      />{" "}
                                      تاريخ النشر:
                                    </div>
                                    <div className="fw-bold mx-4 mt-1 text-dark small">
                                      {Transform(request.requestDate)}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-muted  text-xs">
                                      العروض
                                    </div>
                                    <div className="fw-bold text-center me-1 small">
                                      {request.offers?.length || 0}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Col>

                            <Col
                              md={6}
                              xs={12}
                              className="d-flex justify-content-md-end justify-content-center gap-2 mt-2 mt-md-0"
                            >
                              {request.status === "Assigned" && (
                                <div className="d-flex gap-2">
                                  <Button
                                    onClick={() => {
                                      setSelectedRequestId(request);
                                      setshowPaymentModal(true);
                                    }}
                                    style={{ background: "#ddd" }}
                                    className="fw-bold text-dark px-2 rounded-2 border-0 d-flex align-items-center gap-1"
                                  >
                                    <FontAwesomeIcon
                                      icon={faMoneyBill}
                                      size="lg"
                                      color="green"
                                    />{" "}
                                    نقدي
                                  </Button>
                                  <Button
                                    onClick={() => {
                                      setSelectedRequestId(request);
                                      setshowPaymentModal(true);
                                    }}
                                    style={{ background: "#ddd" }}
                                    className="fw-bold text-dark px-2 rounded-2 border-0 d-flex align-items-center gap-1"
                                  >
                                    <FontAwesomeIcon
                                      icon={faCreditCard}
                                      size="lg"
                                      color="orange"
                                    />{" "}
                                    إلكتروني
                                  </Button>
                                </div>
                              )}
                              {request.assignedCraftManID &&
                                request.status === "completed" &&
                                request.reviews.length === 0 && (
                                  <Button
                                    onClick={() => {
                                      setSelectedRequestId(request);
                                      setshowreview(true);
                                    }}
                                    style={{ background: "#ddd" }}
                                    className="fw-bold text-dark px-2 rounded-2 border-0 d-flex align-items-center gap-1"
                                  >
                                    <FontAwesomeIcon
                                      icon={faStar}
                                      size="lg"
                                      color="orange"
                                    />{" "}
                                    تقييم الطلب
                                  </Button>
                                )}

                              {!request.assignedCraftManID &&
                                request.status === "UnAssigned" && (
                                  <Button
                                    style={{ background: "orange" }}
                                    onClick={() =>
                                      nav(`/myorder/offer/${request.requestID}`)
                                    }
                                    className="small px-3 rounded-2 text-dark fw-bold text-decoration-none d-flex align-items-center gap-1 border-light-subtle"
                                  >
                                    مراجعة العروض{" "}
                                    <FontAwesomeIcon
                                      icon={faAngleLeft}
                                      size="xs"
                                    />
                                  </Button>
                                )}
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                )}
          </div>
        </Container>

        <ComplaintModal
          show={showComplaint}
          handleClose={() => setShowComplaint(false)}
          requestId={selectedRequestId}
          reporterId={user.accountID}
        />
        <Review
          show={showreview}
          handleClose={() => setshowreview(false)}
          requestId={selectedRequestId}
          reporterId={user.accountID}
          onPaymentSuccess={fetchdata}
        />

        <PaymentModal
          show={showPaymentModal}
          handleClose={() => setshowPaymentModal(false)}
          requestId={selectedRequestId}
          reporterId={user.accountID}
          onPaymentSuccess={fetchdata}
        />
      </div>
    </>
  ) : (
    <p className="text-center text-muted fs-4 my-4"> لايوجد طلبات بعد ...</p>
  );
};

export default ManageRequests;
