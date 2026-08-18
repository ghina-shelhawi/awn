import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Axios } from "../../Api/Axois";
import { COmplaints } from "../../Api/Api";

function ComplaintModal({ show, handleClose, requestId, reporterId }) {
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const complaintData = {
      description: description,
      status: "pending",
      requestId: requestId,
      reporterAccountId: reporterId,
    };

    Axios.post(`/${COmplaints}`, complaintData)

      .then((response) => {
        toast.success("تم إرسال الشكوى بنجاح، وسيقوم الدعم الفني بمراجعتها!");
        handleClose();

        setDescription("");
      })
      .catch((error) => {
        console.error("حدث خطأ أثناء إرسال الشكوى:", error);
        toast.error("فشل إرسال الشكوى، تأكد من الاتصال بالسيرفر.");
      });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className="bg-danger text-white">
        <Modal.Title>
          <FontAwesomeIcon icon={faExclamationTriangle} className=" me-2" />{" "}
          تقديم شكوى جديدة
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>شرح تفصيلي للمشكلة</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              required
              placeholder="اكتب هنا كل ما حدث بالتفصيل ليتسنى للأدمن مساعدتك..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            إلغاء
          </Button>
          <Button variant="danger" type="submit">
            إرسال الشكوى الآن
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ComplaintModal;
