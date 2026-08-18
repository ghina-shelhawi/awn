import React from "react";
import { Modal, Button, Row, Col, Card, Badge, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBriefcase,
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faWallet,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function CraftsmanDetailsModal({
  show,
  handleClose,
  craftsman,
}) {
  if (!craftsman) return null;

  const { account, craft, experienceYears, balance, isVerified } = craftsman;
  const person = account?.person;

  const imageUrl = person?.profileImage || "https://via.placeholder.com/150";

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered dir="rtl">
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="fw-bold text-dark">
          تفاصيل الحرفي: {person?.firstName} {person?.lastName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <Row className="g-3">
          <Col md={4} className="text-center">
            <Card className="border-0 shadow-sm p-3 h-100 d-flex align-items-center justify-content-center">
              <Image
                src={
                  account.person.imagePath !== ""
                    ? require(`../../../Assest/${account.person?.imagePath}`)
                    : null
                }
                roundedCircle
                width={150}
                height={150}
                alt=""
                className="mb-3 border border-3 border-warning"
              />
              <h5 className="fw-bold">
                {person?.firstName} {person?.lastName}
              </h5>
              <Badge bg={isVerified ? "success" : "danger"}>
                {isVerified ? "موثق" : "غير موثق"}
              </Badge>
            </Card>
          </Col>

          <Col md={8}>
            <Row className="g-3">
              <Col md={12}>
                <Card className="border-0 shadow-sm p-3 bg-light">
                  <h6 className="text-primary fw-bold mb-3 border-bottom pb-2">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    المعلومات الشخصية
                  </h6>
                  <p className="mb-2">
                    <strong>البريد الإلكتروني:</strong>{" "}
                    {account?.person.email || "غير متوفر"}
                  </p>
                  <p className="mb-2">
                    <strong>رقم الهاتف:</strong> {person?.phone || "غير متوفر"}
                  </p>
                  <p className="mb-0">
                    <strong>المحافظة:</strong>{" "}
                    {person?.city?.cityName || "غير متوفرة"}
                  </p>
                </Card>
              </Col>

              <Col md={12}>
                <Card className="border-0 shadow-sm p-3 bg-light">
                  <h6 className="text-primary fw-bold mb-3 border-bottom pb-2">
                    <FontAwesomeIcon icon={faBriefcase} className="me-2" />
                    معلومات المهنة
                  </h6>
                  <p className="mb-2">
                    <strong>المهنة:</strong> {craft?.craftName} (
                    {craft?.category})
                  </p>
                  <p className="mb-2">
                    <strong>سنوات الخبرة:</strong> {experienceYears} سنوات
                  </p>
                  <p className="mb-0">
                    <strong>رصيد المحفظة:</strong> {balance} ل.س
                  </p>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          إغلاق
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
