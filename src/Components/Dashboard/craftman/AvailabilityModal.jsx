import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Axios } from "../../../Api/Axois";
import { CraftsmanAvailabilities } from "../../../Api/Api";
import { Days } from "../../../Helpers/Days";
import { toast } from "react-toastify";

export default function AvailabilityModal({
  show,
  handleClose,
  availabilityId,
  onSaveSuccess,
  craftman,
  currentSchedule,
}) {
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (availabilityId && show) {
      getAvailability();
    } else if (!show) {
      setSelectedDays([]);
      setStartTime("");
      setEndTime("");
    }
  }, [availabilityId, show]);

  const getAvailability = async () => {
    try {
      const res = await Axios.get(
        `${CraftsmanAvailabilities}/${availabilityId}`,
      );
      setSelectedDays([res.data.dayOfWeek.toString()]);
      setStartTime(res.data.startTime);
      setEndTime(res.data.endTime);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckboxChange = (day) => {
    setSelectedDays([day]);
  };

  const saveData = async (e) => {
    e.preventDefault();

    if (selectedDays.length === 0) {
      toast.error("يرجى اختيار يوم");
      return;
    }

    const day = selectedDays[0];

    const existingEntry = currentSchedule?.find(
      (item) => item.dayOfWeek.toString() === day,
    );

    if (
      existingEntry &&
      !availabilityId &&
      existingEntry.id !== availabilityId
    ) {
      toast.error(
        "هذا اليوم تمت إضافته مسبقاً، يمكنك تعديل وقته من الجدول مباشرة.",
      );
      return;
    }

    try {
      const data = {
        craftmanID: craftman,
        dayOfWeek: parseInt(day),
        startTime,
        endTime,
      };

      if (availabilityId) {
        await Axios.put(`${CraftsmanAvailabilities}/${availabilityId}`, data);
      } else {
        await Axios.post(`${CraftsmanAvailabilities}`, data);
      }

      onSaveSuccess();
      handleClose();
    } catch (err) {
      console.log(err);
      alert("حدث خطأ أثناء الحفظ");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Form onSubmit={saveData}>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="fw-bold text-primary">
            {availabilityId ? "تعديل الموعد" : "إضافة موعد جديد"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-4">
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold mb-3">يوم العمل:</Form.Label>
            <div className="d-flex flex-wrap gap-3 p-3 border rounded shadow-sm">
              {Object.entries(Days).map(([key, value]) => (
                <Form.Check
                  key={key}
                  type="checkbox"
                  label={value}
                  checked={selectedDays.includes(key)}
                  onChange={() => handleCheckboxChange(key)}
                  className="me-3"
                />
              ))}
            </div>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">وقت البدء</Form.Label>
                <Form.Control
                  required
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="shadow-sm"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">وقت الانتهاء</Form.Label>
                <Form.Control
                  required
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="shadow-sm"
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer className="bg-light">
          <Button
            variant="outline-secondary"
            onClick={handleClose}
            className="px-4"
          >
            إلغاء
          </Button>
          <Button type="submit" className="px-4" variant="primary">
            حفظ التغييرات
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
