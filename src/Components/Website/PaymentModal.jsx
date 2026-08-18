import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faLock,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import { Axios } from "../../Api/Axois";
import { LedgerEntries, ServiceRequests } from "../../Api/Api";
import { toast } from "react-toastify";

function PaymentModal({
  show,
  handleClose,
  requestId,
  reporterId,
  onPaymentSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const paymentData = {
      requestId: requestId.requestID,
      amount: requestId.agreedPrice,
      type: "دفع",
      description: "دفع لخدمة",
      action: "سحب",
      accountID: reporterId,
    };

    try {
      await Axios.post(`${LedgerEntries}`, paymentData);

      await Axios.put(`${ServiceRequests}/${requestId.requestID}`, {
        ...requestId,
        status: "completed",
      });

      toast.success(
        ` تمت عملية الدفع بنجاح! تم تحويل مبلغ ${requestId?.agreedPrice} ل.س إلى حساب الحرفي.`,
      );

      if (onPaymentSuccess) {
        onPaymentSuccess();
      }

      handleClose();
    } catch (err) {
      console.error("Payment Error:", err);
      setError(
        "فشلت عملية الدفع أو تحديث حالة الطلب. يرجى التحقق من بيانات البطاقة أو الاتصال.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      contentClassName="rounded-4"
      scrollable={true}
      style={{ direction: "rtl" }}
    >
      <Modal.Header
        closeVariant="white"
        className="border-0 bg-primary text-white"
      >
        <Modal.Title className="fs-5 fw-bold ms-auto">
          <FontAwesomeIcon icon={faLock} className="text-warning ms-2" />
          الدفع الإلكتروني الآمن
        </Modal.Title>
        <button
          onClick={handleClose}
          className="btn-close"
          style={{
            marginLeft: "10px",
            marginRight: "0",
            filter: "invert(1) grayscale(100%) brightness(200%)",
          }}
        />
      </Modal.Header>

      <Form onSubmit={handlePaymentSubmit} className="bg-light">
        <Modal.Body className="px-4 py-3">
          {error && (
            <Alert variant="danger" className="py-2 small text-center">
              {error}
            </Alert>
          )}

          <div className="bg-white p-3 rounded-3 border mb-3 shadow-sm text-right">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted small">الحرفي المسؤول:</span>
              <span className="fw-bold text-dark">
                {requestId?.assignedCraftMan?.account?.person?.firstName}{" "}
                {requestId?.assignedCraftMan?.account?.person?.lastName}
              </span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-muted small">المبلغ المستحق للدفع:</span>
              <span className="fw-bold text-success fs-5">
                <FontAwesomeIcon icon={faCoins} className="ms-1 text-warning" />
                {requestId?.agreedPrice} ل.س
              </span>
            </div>
          </div>

          <div
            className="p-3 text-white rounded-3 mb-4 shadow-sm"
            style={{
              background: "linear-gradient(135deg, #303c50 0%, #1e2a45 100%)",
              position: "relative",
              direction: "ltr",
            }}
          >
            <div className="d-flex justify-content-between align-items-start mb-4">
              <FontAwesomeIcon
                icon={faCreditCard}
                size="2x"
                className="text-secondary"
              />
              <span
                className="small tracking-widest fw-bold text-secondary"
                style={{ letterSpacing: "2px" }}
              >
                AOUN CARD
              </span>
            </div>

            <div
              className="fs-4 mb-3 text-center fw-bold"
              style={{ letterSpacing: "3px", fontFamily: "monospace" }}
            >
              {cardNumber || "•••• •••• •••• ••••"}
            </div>
            <div className="d-flex justify-content-between small text-secondary">
              <div>
                <div style={{ fontSize: "0.65rem" }}>CARD HOLDER</div>
                <div
                  className="text-uppercase fw-bold text-white"
                  style={{ fontSize: "0.8rem" }}
                >
                  Aoun Platform User
                </div>
              </div>
              <div className="text-end">
                <div style={{ fontSize: "0.65rem" }} className="text-secondary">
                  EXPIRES
                </div>
                <div
                  className="fw-bold text-white"
                  style={{ fontSize: "0.8rem" }}
                >
                  {expiryDate || "MM/YY"}
                </div>
              </div>
            </div>
          </div>

          <Form.Group
            className="mb-3 text-right"
            style={{ textAlign: "right" }}
          >
            <Form.Label className="small fw-bold text-secondary">
              رقم البطاقة الإلكترونية
            </Form.Label>
            <Form.Control
              type="text"
              maxLength="19"
              placeholder="1234 5678 1234 5678"
              className="text-center"
              style={{ direction: "ltr", fontFamily: "monospace" }}
              value={cardNumber}
              onChange={(e) =>
                setCardNumber(
                  e.target.value
                    .replace(/\s?/g, "")
                    .replace(/(\d{4})/g, "$1 ")
                    .trim(),
                )
              }
              required
            />
          </Form.Group>

          <Row>
            <Col xs={6}>
              <Form.Group
                className="mb-3 text-right"
                style={{ textAlign: "right" }}
              >
                <Form.Label className="small fw-bold text-secondary">
                  تاريخ الانتهاء
                </Form.Label>
                <Form.Control
                  type="text"
                  maxLength="5"
                  placeholder="MM/YY"
                  className="text-center"
                  style={{ direction: "ltr" }}
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group
                className="mb-3 text-right"
                style={{ textAlign: "right" }}
              >
                <Form.Label className="small fw-bold text-secondary">
                  الرمز السري (CVV)
                </Form.Label>
                <Form.Control
                  type="password"
                  maxLength="3"
                  placeholder="•••"
                  className="text-center"
                  style={{ direction: "ltr" }}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer className="border-0 px-4 pb-4 pt-0 d-flex justify-content-between">
          <Button
            variant="outline-secondary"
            className="rounded-3 px-3"
            onClick={handleClose}
          >
            إلغاء
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="fw-bold border-0 rounded-3 text-dark px-4"
            style={{ backgroundColor: "#ffb703" }}
          >
            {loading
              ? "جاري المعالجة..."
              : ` تأكيد دفع ${requestId?.agreedPrice} ل.س`}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default PaymentModal;
