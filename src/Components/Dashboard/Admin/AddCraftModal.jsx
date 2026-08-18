import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import { Crafts } from "../../../Api/Api";
import { toast } from "react-toastify";
import { Axios } from "../../../Api/Axois";

export default function AddCraftModal({ show, onHide, onSuccess }) {
  const [name, setName] = useState("");
  const [category, setcategory] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async () => {
    const datatosend = {
      craftName: name,
      category: category,
      imageUrl: image.name,
      imagePath: image.name,
    };

    try {
      await Axios.post(`${Crafts}`, datatosend);
      toast.success("تم إضافة المهنة بنجاح");
      onSuccess();
      onHide();
    } catch (error) {
      toast.error("حدث خطأ أثناء الإضافة");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>إضافة مهنة جديدة</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>اسم المهنة</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>الفئة</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setcategory(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>صورة المهنة</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          إلغاء
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          حفظ المهنة
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
