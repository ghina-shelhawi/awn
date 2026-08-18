import { useEffect, useState } from "react";
import { Modal, Button, Card, Badge } from "react-bootstrap";
import { byrequest, RequestOffers } from "../../../Api/Api";
import { Axios } from "../../../Api/Axois";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faCoins,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

export default function ViewOfferModal({ isOpen, requestId, onClose }) {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && requestId) {
      setLoading(true);
      Axios.get(`${RequestOffers}/${byrequest}/${requestId}`)
        .then((res) => {
          setOffers(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching offer:", err);
          setLoading(false);
        });
    }
  }, [isOpen, requestId]);

  // تصفية العروض المقبولة فقط
  const acceptedOffers = offers?.filter((e) => e.status === "Accepted") || [];

  return (
    <Modal show={isOpen} onHide={onClose} centered size="md">
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="text-primary fw-bold">
          تفاصيل العرض المعتمد
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="text-center p-4">جاري تحميل البيانات...</div>
        ) : acceptedOffers.length > 0 ? (
          acceptedOffers.map((e, index) => {
            const dateObj = new Date(e.proposedTime);
            const formattedDate = dateObj.toLocaleDateString("en-US");
            const formattedTime = dateObj.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <Card key={index} className="border-0 shadow-sm mb-3 bg-light">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0 text-dark fw-bold">عرض مقدم</h5>
                    <Badge bg="success">معتمد</Badge>
                  </div>

                  <div className="mb-2">
                    <FontAwesomeIcon icon={faCoins} color="orange" />
                    <strong> السعر:</strong> {e.proposedPrice} ل.س
                  </div>
                  <div className="mb-2">
                    <FontAwesomeIcon icon={faCalendar} color="orange" />
                    <strong> التاريخ:</strong> {formattedDate}
                  </div>
                  <div className="mb-2">
                    <FontAwesomeIcon icon={faClock} color="orange" />
                    <strong> الوقت:</strong> {formattedTime}
                  </div>
                  <div className="mt-3 p-2 bg-white rounded border">
                    <small className="text-muted d-block mb-1">
                      ملاحظات العرض:
                    </small>
                    <p className="mb-0">
                      {e.offerNote || "لا توجد ملاحظات إضافية."}
                    </p>
                  </div>
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <div className="text-center p-4 text-muted">
            لا يوجد عرض مقبول لهذا الطلب حالياً.
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose}>
          إغلاق
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
