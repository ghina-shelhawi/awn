import { Modal, Button } from "react-bootstrap";
import Map from "../../Map";

export default function OrderMapModal({ show, handleClose, location }) {
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold text-primary">
          موقع الطلب على الخريطة
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-0">
        <Map coords={location} selectcity={true} isReadOnly={true} />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          إغلاق
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
