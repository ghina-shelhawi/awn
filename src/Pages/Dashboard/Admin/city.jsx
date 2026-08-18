import { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axois";
import { cities } from "../../../Api/Api";
import { Button, Container, Table, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function City() {
  const [city, setcity] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [reload, setreload] = useState(0);
  const [cityName, setCityName] = useState("");

  const fetchcity = async () => {
    try {
      const res = await Axios.get(`${cities}`);
      setcity(res.data);
    } catch (err) {
      toast.error("حدث خطا");
    }
  };

  useEffect(() => {
    fetchcity();
  }, [reload]);

  async function deletecity(id) {
    try {
      const response = await Axios.delete(`${cities}/${id}`);
      setreload((prev) => prev + 1);
    } catch (err) {
      if (err.response.status === 500) {
        toast.error("لايمكن حذف هذه المدينة لانه يوجد سجلات متعلقة بها");
      }
    }
  }

  async function addCity() {
    await Axios.post(`${cities}`, { cityName: cityName });
    setCityName("");
    setShowModal(false);
    setreload((prev) => prev + 1);
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between my-4">
        <div className="d-flex align-items-center gap-2 ">
          <FontAwesomeIcon icon={faLocationDot} size="xl" color="orange" />
          <div>
            <h2 className="fw-bold">المدن السورية الحالية:</h2>
          </div>
        </div>
        <Button
          className="bg-secondary border-0"
          onClick={() => setShowModal(true)}
        >
          + إضافة مدينة
        </Button>
      </div>

      <div className="card shadow-sm border-0 p-3 rounded-3">
        <h5 className="fw-bold mb-3 text-primary">
          المدن الموجودة على المنصة:
        </h5>
        <Table hover border={2} striped responsive>
          <thead className="table-primary">
            <tr>
              <th>الرقم</th>
              <th>المدينة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {city.length > 0 ? (
              city.map((item, index) => (
                <tr key={item.cityID}>
                  <td>{index + 1}</td>
                  <td>{item.cityName}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faTrash}
                      size="lg"
                      className="text-danger me-3"
                      onClick={() => deletecity(item.cityID)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td colSpan={3} className="fw-bold text-primary">
                  لايوجد بيانات لعرضها
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <Modal centered show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>إضافة مدينة جديدة</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="أدخل اسم المدينة..."
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={addCity}>
            حفظ
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
