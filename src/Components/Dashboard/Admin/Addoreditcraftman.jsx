// // import React, { useState, useEffect } from "react";
// import { Modal, Form, Button, Row, Col } from "react-bootstrap";
// import { CraftsMen } from "../../../Api/Api";
// import { Axios } from "../../../Api/Axois";
// import { useEffect, useState } from "react";

// export default function AddOrEditCraftsmanModal({
//   show,
//   userId,
//   handleClose,
//   onSaveSuccess,
// }) {
//   const [formData, setFormData] = useState({
//     account: {
//       person: {
//         firstName: "",
//         lastName: "",
//         phone: "",
//         city: { cityName: "" },
//         dateOfBirth: "",
//       },
//       userName: "",
//     },
//     experienceYears: "",
//     balance: "",
//     isActive: false,
//     password: "",
//   });

//   useEffect(() => {
//     if (show && userId) {
//       Axios.get(`${CraftsMen}/${userId}`).then((res) => setFormData(res.data));
//     } else if (show) {
//       setFormData({
//         account: {
//           person: {
//             firstName: "",
//             lastName: "",
//             phone: "",
//             city: { cityName: "" },
//             dateOfBirth: "",
//           },
//           userName: "",
//         },
//         experienceYears: "",
//         balance: "",
//         isActive: false,
//         password: "",
//       });
//     }
//   }, [show, userId]);

//   const handleInputChange = (e, path) => {
//     const { value, type, checked } = e.target;
//     const val = type === "checkbox" ? checked : value;

//     setFormData((prev) => {
//       const newState = { ...prev };
//       let current = newState;
//       const keys = path.split(".");

//       for (let i = 0; i < keys.length - 1; i++) {
//         current = current[keys[i]];
//       }
//       current[keys[keys.length - 1]] = val;
//       return newState;
//     });
//   };

//   const handleSubmit = async () => {
//     // نجهز نسخة من البيانات ونحول الحقول الرقمية للتأكد من أنها Number
//     const finalData = {
//       ...formData,
//       balance: formData.balance === "" ? 0 : Number(formData.balance),
//       experienceYears:
//         formData.experienceYears === "" ? 0 : Number(formData.experienceYears),
//     };

//     try {
//       if (userId) {
//         await Axios.put(`${CraftsMen}/${userId}`, finalData);
//       } else {
//         await Axios.post(CraftsMen, finalData);
//       }
//       onSaveSuccess();
//       handleClose();
//     } catch (error) {
//       console.error("Error saving data:", error);
//       alert("حدث خطأ أثناء الحفظ");
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose} size="lg" centered>
//       <Modal.Header closeButton>
//         <Modal.Title>
//           {userId ? "تعديل بيانات الحرفي" : "إضافة حرفي جديد"}
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Row>
//             <Col>
//               <Form.Group>
//                 <Form.Label>الاسم الأول</Form.Label>
//                 <Form.Control
//                   value={formData.account.person.firstName}
//                   onChange={(e) =>
//                     handleInputChange(e, "account.person.firstName")
//                   }
//                 />
//               </Form.Group>
//             </Col>
//             <Col>
//               <Form.Group>
//                 <Form.Label>الاسم الأخير</Form.Label>
//                 <Form.Control
//                   value={formData.account.person.lastName}
//                   onChange={(e) =>
//                     handleInputChange(e, "account.person.lastName")
//                   }
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <Form.Group>
//                 <Form.Label>رقم الهاتف</Form.Label>
//                 <Form.Control
//                   value={formData.account.person.phone}
//                   onChange={(e) => handleInputChange(e, "account.person.phone")}
//                 />
//               </Form.Group>
//             </Col>
//             <Col>
//               <Form.Group>
//                 <Form.Label>المحافظة</Form.Label>
//                 <Form.Control
//                   value={formData.account.person.city.cityName}
//                   onChange={(e) =>
//                     handleInputChange(e, "account.person.city.cityName")
//                   }
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <Form.Group>
//                 <Form.Label>سنوات الخبرة</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={formData.experienceYears}
//                   onChange={(e) => handleInputChange(e, "experienceYears")}
//                 />
//               </Form.Group>
//             </Col>
//             <Col>
//               <Form.Group>
//                 <Form.Label>الرصيد</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={formData.balance}
//                   onChange={(e) => handleInputChange(e, "balance")}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Form.Check
//             type="switch"
//             label="حساب نشط"
//             checked={formData.isActive}
//             onChange={(e) => handleInputChange(e, "isActive")}
//           />
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           إلغاء
//         </Button>
//         <Button variant="primary" onClick={handleSubmit}>
//           حفظ البيانات
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { Axios } from "../../../Api/Axois";
import { useState, useEffect } from "react";
import { cities, Crafts } from "../../../Api/Api";

export default function AddCraftsmanModal({
  show,
  handleClose,
  onSaveSuccess,
}) {
  const [citie, setCities] = useState([]);
  const [crafts, setCrafts] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: new Date().toISOString(),
    gender: true,
    cityID: "",
    userName: "",
    password: "",
    role: "Craftsman",
    email: "",
    address: "",
    phone: "",
    imagePath: "",
    craftID: "",
    experienceYears: 0,
    bio: "",
    idImagePath: "",
  });

  useEffect(() => {
    if (show) {
      Axios.get(`/${cities}`)
        .then((res) => setCities(res.data))
        .catch((err) => console.log("خطأ في جلب المدن", err));

      Axios.get(`${Crafts}`)
        .then((res) => setCrafts(res.data))
        .catch((err) => console.log("خطأ في جلب المهن", err));

      setFormData({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: true,
        cityID: "",
        userName: "",
        password: "",
        role: "Craftsman",
        email: "",
        address: "",
        phone: "",
        imagePath: "",
        craftID: "",
        experienceYears: 0,
        bio: "",
        idImagePath: "",
      });
    }
  }, [show]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const registerData = {
        ...formData,
        cityID: Number(formData.cityID),
        craftID: Number(formData.craftID),
        experienceYears: Number(formData.experienceYears),
      };

      await Axios.post("/Auth/register", registerData);
      onSaveSuccess();
      handleClose();
    } catch (error) {
      console.error("Error saving data:", error);
      alert("حدث خطأ أثناء الحفظ، تأكد من صحة البيانات المدخلة");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>إضافة حرفي جديد</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>الاسم الأول</Form.Label>
                <Form.Control
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>الاسم الأخير</Form.Label>
                <Form.Control
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>اسم المستخدم (UserName)</Form.Label>
                <Form.Control
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>كلمة المرور</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>رقم الهاتف</Form.Label>
                <Form.Control
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>البريد الإلكتروني</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>المهنة</Form.Label>
                <Form.Select
                  name="craftID"
                  value={formData.craftID}
                  onChange={handleChange}
                >
                  <option value="">اختر المهنة...</option>
                  {crafts.map((craft) => (
                    <option key={craft.craftID} value={craft.craftID}>
                      {craft.name || craft.craftName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label>المدينة</Form.Label>
                <Form.Select
                  name="cityID"
                  value={formData.cityID}
                  onChange={handleChange}
                >
                  <option value="">اختر المدينة...</option>
                  {citie.map((city) => (
                    <option key={city.cityID} value={city.cityID}>
                      {city.cityName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>سنوات الخبرة</Form.Label>
                <Form.Control
                  type="number"
                  name="experienceYears"
                  value={formData.experienceYears}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>العنوان</Form.Label>
                <Form.Control
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>تاريخ الميلاد</Form.Label>
              <Form.Control
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                type="date"
              />
            </Form.Group>
          </Col>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          إلغاء
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          حفظ البيانات
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
