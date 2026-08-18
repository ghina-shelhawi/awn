import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Axios } from "../../Api/Axois";
import { Reviews } from "../../Api/Api";
import { toast } from "react-toastify";

function Review({
  show,
  handleClose,
  requestId,
  reporterId,
  onPaymentSuccess,
}) {
  const [generalRating, setGeneralRating] = useState(5);

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const reviewData = {
      requestID: requestId.requestID,
      rating: generalRating,

      comment: comment,
    };

    try {
      await Axios.post(
        `/${Reviews}`,

        reviewData,
      );

      toast.success("شكراً لك! تم إرسال تقييمك للخدمة بنجاح.");
      if (onPaymentSuccess) {
        onPaymentSuccess();
      }

      handleClose();

      setGeneralRating(5);
      setComment("");
    } catch (error) {
      console.error("حدث خطأ أثناء إرسال التقييم:", error);
      toast.error("فشل إرسال التقييم، يرجى التحقق من الاتصال بالسيرفر.");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (currentValue, setValue, size = "1x") => {
    return (
      <div className="d-flex justify-content-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesomeIcon
            key={star}
            icon={faStar}
            size={size}
            style={{
              cursor: "pointer",
              color: star <= currentValue ? "#ffc107" : "#e4e5e9",
              transition: "color 0.15s ease-in-out",
            }}
            onClick={() => setValue(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="md">
      <Modal.Header
        closeButton
        closeVariant="white"
        className="text-white border-0"
        style={{ backgroundColor: "#1e293b" }}
      >
        <Modal.Title className="w-100 text-center fs-5 fw-bold">
          <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />
          تم اكتمال الطلب بنجاح
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit} style={{ backgroundColor: "#f8fafc" }}>
        <Modal.Body className="px-4 py-3">
          <p className="text-muted text-center small mb-4">
            شكرا لاختيارك منصة عون رأيك في تقييم الطلب يساعد الحرفيين لدينا في
            تطوير خدماتهم
          </p>

          <div className="text-center mb-4">
            <h6 className="fw-bold text-dark mb-2">
              كم تقيم جودة الخدمة الاجمالية
            </h6>
            {renderStars(generalRating, setGeneralRating, "2x")}
          </div>

          <Form.Group className="mb-3">
            <Form.Label
              className="fw-bold text-dark small text-uppercase"
              style={{ fontSize: "0.8rem" }}
            >
              ملاحظات اضافية
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              className="border-2 rounded-3"
              placeholder="اكتب تعليقك عن تجربتك للحرفي"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ fontSize: "0.9rem" }}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className="border-0  d-flex justify-content-end px-4 pb-4 pt-0">
          <Button
            variant="link"
            className="text-muted text-decoration-none small p-0"
            onClick={handleClose}
          >
            تخطي الان
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="fw-bold px-4 py-2 border-0 rounded-3 shadow-sm text-dark"
            style={{
              backgroundColor: "#ffb703",
            }}
          >
            {loading ? "يتم الارسال.." : "ارسال التقييم"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default Review;
