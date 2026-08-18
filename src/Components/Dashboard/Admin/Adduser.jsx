// import React, { useState, useEffect } from "react";
// import { Modal, Button, Form, Row, Col } from "react-bootstrap";
// import {
//   Person,
//   Envelope,
//   Telephone,
//   Calendar,
//   GeoAlt,
//   Lock,
//   PersonPlus,
//   PencilSquare,
// } from "react-bootstrap-icons";
// import axios from "axios";

// export default function AddUserModal({
//   show,
//   handleClose,
//   selectuser,
//   onSaveSuccess,
// }) {
//   const isEditing = selectuser ? true : false;
//   const [formData, setFormData] = useState({});

//   // تعبئة البيانات عند فتح الموديل للتعديل
//   //   useEffect(() => {
//   //     if (userData) {
//   //       setFormData(userData);
//   //     } else {
//   //       setFormData({}); // تفريغ الحقول عند الإضافة
//   //     }
//   //   }, [userData]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     try {
//       if (isEditing) {
//         // طلب التعديل
//         await axios.put(
//           `https://your-api.com/api/users/${selectuser.id}`,
//           formData,
//         );
//       } else {
//         // طلب الإضافة
//         await axios.post(`https://your-api.com/api/users`, formData);
//       }
//       onSaveSuccess();
//       handleClose();
//     } catch (error) {
//       console.error("خطأ في الحفظ:", error);
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered size="lg">
//       <Modal.Header closeButton>
//         <Modal.Title>
//           {isEditing ? (
//             <PencilSquare className="me-2 text-warning" />
//           ) : (
//             <PersonPlus className="me-2 text-warning" />
//           )}
//           {isEditing ? "تعديل مستخدم" : "إضافة مستخدم جديد"}
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Row>
//             <Col lg={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label>
//                   <Person className="me-1 text-warning" /> الاسم الأول
//                 </Form.Label>
//                 <Form.Control
//                   name="first_name"
//                   defaultValue={formData.first_name}
//                   onChange={handleChange}
//                   type="text"
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>
//                   <Person className="me-1 text-warning" /> الكنية
//                 </Form.Label>
//                 <Form.Control
//                   name="last_name"
//                   defaultValue={formData.last_name}
//                   onChange={handleChange}
//                   type="text"
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>
//                   <Envelope className="me-1 text-warning" /> البريد الإلكتروني
//                 </Form.Label>
//                 <Form.Control
//                   name="email"
//                   defaultValue={formData.email}
//                   onChange={handleChange}
//                   type="email"
//                 />
//               </Form.Group>
//             </Col>
//             <Col lg={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label>
//                   <Telephone className="me-1 text-warning" /> الهاتف
//                 </Form.Label>
//                 <Form.Control
//                   name="phone"
//                   defaultValue={formData.phone}
//                   onChange={handleChange}
//                   type="text"
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>
//                   <GeoAlt className="me-1 text-warning" /> المحافظة
//                 </Form.Label>
//                 <Form.Control
//                   name="city"
//                   defaultValue={formData.city}
//                   onChange={handleChange}
//                   type="text"
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3">
//                 <Form.Label>
//                   <Lock className="me-1 text-warning" /> كلمة المرور
//                 </Form.Label>
//                 <Form.Control
//                   name="password"
//                   onChange={handleChange}
//                   type="password"
//                   placeholder="**"
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           إلغاء
//         </Button>
//         <Button variant="primary" className="text-white" onClick={handleSave}>
//           {isEditing ? "حفظ التعديلات" : "إضافة المستخدم"}
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import {
  Person,
  Envelope,
  Telephone,
  GeoAlt,
  Lock,
  PersonPlus,
} from "react-bootstrap-icons";
import { Axios } from "../../../Api/Axois";
import { Accounts, cities } from "../../../Api/Api";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

export default function AddUserModal({ show, handleClose, onSaveSuccess }) {
  // تهيئة الحقول لتتوافق مع هيكل الـ Backend الظاهر في الصورة
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phone: "",
    password: "",
    cityID: "",
    role: "Customer",
    gender: true,
    dateOfBirth: "",
    address: "string",
    imagePath: "string",
  });

  const [citie, setCities] = useState([]);

  const cookie = new Cookies();
  const token = cookie.get("token");

  useEffect(() => {
    if (show) {
      setFormData({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        phone: "",
        password: "",
        cityID: "",
        role: "Customer",
        gender: true,
        dateOfBirth: "",
        address: "string",
        imagePath: "string",
      });

      const fetchCities = async () => {
        try {
          const res = await Axios.get(`/${cities}`, {});
          setCities(res.data);
        } catch (err) {
          console.error("خطأ في جلب المحافظات:", err);
        }
      };

      fetchCities();
    }
  }, [show, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "cityID" ? Number(value) : value,
    });
  };

  const handleSave = async () => {
    try {
      await Axios.post(`/Auth/register`, formData, {});

      toast.success("تم إضافة المستخدم بنجاح");
      if (onSaveSuccess) onSaveSuccess();
      handleClose();
    } catch (error) {
      console.error("خطأ في الحفظ:", error);
      toast.error("حدث خطأ أثناء إضافة المستخدم");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <PersonPlus className="me-2 text-warning" />
          إضافة مستخدم جديد (Customer)
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <Person className="me-1 text-warning" /> الاسم الأول
                </Form.Label>
                <Form.Control
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  type="text"
                  placeholder="الاسم الأول"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <Person className="me-1 text-warning" /> الكنية
                </Form.Label>
                <Form.Control
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  type="text"
                  placeholder="الكنية"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <Person className="me-1 text-warning" /> اسم المستخدم
                  (UserName)
                </Form.Label>
                <Form.Control
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  type="text"
                  placeholder="اسم المستخدم"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <Envelope className="me-1 text-warning" /> البريد الإلكتروني
                </Form.Label>
                <Form.Control
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="name@example.com"
                />
              </Form.Group>
            </Col>

            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <Telephone className="me-1 text-warning" /> الهاتف
                </Form.Label>
                <Form.Control
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="text"
                  placeholder="رقم الهاتف"
                />
              </Form.Group>

              {/* قائمة المحافظات المنسدلة لجلب الـ cityID */}
              <Form.Group className="mb-3">
                <Form.Label>
                  <GeoAlt className="me-1 text-warning" /> المحافظة
                </Form.Label>
                <Form.Select
                  name="cityID"
                  value={formData.cityID}
                  onChange={handleChange}
                >
                  <option value="">اختر المحافظة...</option>
                  {citie.map((cityItem, index) => (
                    <option key={index} value={cityItem.cityID}>
                      {cityItem.cityName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <Envelope className="me-1 text-warning" /> تاريخ الميلاد
                </Form.Label>
                <Form.Control
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  type="date"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <Lock className="me-1 text-warning" /> كلمة المرور
                </Form.Label>
                <Form.Control
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="**"
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          إلغاء
        </Button>
        <Button variant="primary" className="text-white" onClick={handleSave}>
          إضافة المستخدم
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
