import { useState, useEffect, useContext } from "react";
import { Table, Button, Modal, Form, Container } from "react-bootstrap";
import { Axios } from "../../Api/Axois";
import { byCraftmen, Services } from "../../Api/Api";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHammer,
  faPencil,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../Context/AuthContext";

export default function MyServices() {
  const [services, setServices] = useState([]);
  const [show, setShow] = useState(false);
  const [newService, setNewService] = useState({
    serviceID: null,
    title: "",
    price: "",
    imagePath: "",
  });

  useEffect(() => {
    fetchServices();
  }, []);
  const { user } = useContext(AuthContext);
  const craftmanid = user.craftManID;
  const fetchServices = () => {
    Axios.get(`${Services}/${byCraftmen}/${craftmanid}`)
      .then((res) => setServices(res.data))
      .catch((err) => console.error("خطأ في جلب الخدمات", err));
  };

  const handleAddOrEdit = () => {
    const datatosend = {
      craftmanID: craftmanid,
      title: newService.title,
      startingPrice: parseFloat(newService.price),
      imagePath: newService.imagePath,
      description: "وصف الخدمة",
      isActive: true,
    };

    const request = newService.serviceID
      ? Axios.put(`${Services}/${newService.serviceID}`, datatosend)
      : Axios.post(`${Services}`, datatosend);

    request
      .then(() => {
        toast.success(
          newService.serviceID
            ? "تم تعديل الخدمة بنجاح"
            : "تمت إضافة الخدمة بنجاح",
        );
        setShow(false);
        setNewService({ serviceID: null, title: "", price: "", imagePath: "" });
        fetchServices();
      })
      .catch((err) => {
        toast.error("حدث خطأ أثناء المعالجة");
        console.error(err);
      });
  };

  const openEditModal = (s) => {
    setNewService({
      serviceID: s.serviceID,
      title: s.title,
      price: s.startingPrice,
      imagePath: s.imagePath || s.imageUrl || "",
    });
    setShow(true);
  };

  const handleDelete = (id) => {
    Axios.delete(`${Services}/${id}`)
      .then(() => {
        setServices(services.filter((s) => s.serviceID !== id));
        toast.success("تم حذف الخدمة بنجاح");
      })
      .catch((err) => {
        toast.error("تعذر الحذف");
        console.error(err);
      });
  };

  return (
    <Container className="p-4">
      <div className="d-flex justify-content-between align-items-center my-4">
        <div className="d-flex align-items-start gap-2 ">
          <FontAwesomeIcon
            icon={faHammer}
            size="xl"
            color="orange"
            className="mt-2"
          />
          <div>
            <h2 className="fw-bold m-0">إدارة خدماتي:</h2>
            <small className="small m-0 text-muted">
              ابرز خدماتي في المنصة
            </small>
          </div>
        </div>
        <Button
          variant="warning"
          style={{ height: "40px", color: "white" }}
          onClick={() => {
            setNewService({
              serviceID: null,
              title: "",
              price: "",
              imagePath: "",
            });
            setShow(true);
          }}
        >
          + إضافة خدمة
        </Button>
      </div>
      <div className="card shadow-sm border-0 p-3 rounded-3">
        <Table hover responsive border={2} striped>
          <thead className="table-primary ">
            <tr>
              <th>عنوان الخدمة</th>
              <th>السعر</th>
              <th>صورة عن عملي بالخدمة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.serviceID}>
                <td>{s.title}</td>
                <td>{s.startingPrice} ل.س</td>
                <td>
                  <div className="d-flex align-items-center justify-content-start">
                    {s.imageUrl || s.imagePath ? (
                      <img
                        src={
                          s.imageUrl
                            ? require(`../../Assest/${s.imageUrl}`)
                            : ""
                        }
                        width="50px"
                        className="border"
                        alt="service"
                      />
                    ) : (
                      "لا توجد صورة"
                    )}
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center mt-2 justify-content-start gap-3">
                    <FontAwesomeIcon
                      icon={faPencil}
                      size="lg"
                      color="orange"
                      style={{ cursor: "pointer" }}
                      onClick={() => openEditModal(s)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      size="lg"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(s.serviceID)}
                      className="text-danger"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {newService.serviceID ? "تعديل الخدمة" : "إضافة خدمة جديدة"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>اسم الخدمة</Form.Label>
            <Form.Control
              value={newService.title}
              onChange={(e) =>
                setNewService({ ...newService, title: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>السعر</Form.Label>
            <Form.Control
              type="number"
              value={newService.price}
              onChange={(e) =>
                setNewService({ ...newService, price: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>صورة الخدمة</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  setNewService({
                    ...newService,
                    imagePath: e.target.files[0].name,
                  });
                }
              }}
            />

            {newService.imagePath && (
              <div className="mt-2 p-2 border rounded d-flex justify-content-between align-items-center bg-light">
                <span className="text-truncate" style={{ maxWidth: "80%" }}>
                  {newService.imagePath}
                </span>

                <Button
                  variant="link"
                  className="text-danger p-0"
                  onClick={() =>
                    setNewService({ ...newService, imagePath: "" })
                  }
                >
                  <FontAwesomeIcon icon={faTimes} /> حذف
                </Button>
              </div>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddOrEdit}>
            حفظ التغييرات
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
