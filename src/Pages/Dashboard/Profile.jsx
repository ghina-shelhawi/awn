// // // import React, { useState, useEffect, useContext } from "react";
// // // import {
// // //   Container,
// // //   Row,
// // //   Col,
// // //   Form,
// // //   Button,
// // //   Card,
// // //   Spinner,
// // //   Image,
// // // } from "react-bootstrap";
// // // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // // import { faPlus } from "@fortawesome/free-solid-svg-icons";
// // // import { AuthContext } from "../../Context/AuthContext";
// // // import { Axios } from "../../Api/Axois";
// // // import { cities, CraftsMen } from "../../Api/Api";
// // // import { toast } from "react-toastify";
// // // import Transform from "../../Helpers/Transform";

// // // export default function EditProfile() {
// // //   const { user, updateProfileData } = useContext(AuthContext);

// // //   const [profile, setProfile] = useState({
// // //     firstName: "",
// // //     lastName: "",
// // //     email: "",
// // //     bio: "",
// // //     phone: "",
// // //     gender: true,
// // //     craft: "",
// // //     experienceYears: "",
// // //     cityID: "",
// // //     image: null,
// // //     imagePreview: "",
// // //   });

// // //   const [citie, setCities] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [me, setMe] = useState([]);

// // //   useEffect(() => {
// // //     if (user && user.craftManID) {
// // //       Axios.get(`/${CraftsMen}/${user.craftManID}`)
// // //         .then((res) => {
// // //           setMe(res.data);
// // //         })
// // //         .catch((error) => {
// // //           console.error(error);
// // //           toast.error("حدث خطأ في جلب بيانات الحرفي");
// // //         });
// // //     }
// // //   }, [user]);

// // //   useEffect(() => {
// // //     Axios.get(`/${cities}`)
// // //       .then((res) => {
// // //         setCities(res.data);
// // //       })
// // //       .catch((error) => {
// // //         console.error(error);
// // //         toast.error("فشل في تحميل المحافظات");
// // //       });
// // //   }, []);

// // //   useEffect(() => {
// // //     if (user) {
// // //       setProfile({
// // //         firstName: user.account?.person?.firstName || "",
// // //         lastName: user.account?.person?.lastName || "",
// // //         email: user.account?.person?.email || "",
// // //         bio: me?.bio || "",
// // //         dateOfBirth: user?.account?.person?.dateOfBirth || "",
// // //         phone: user.account?.person?.phone || "",
// // //         gender: user.account?.person?.gender ?? true,
// // //         craft: user.craft?.craftName || "",
// // //         experienceYears: me?.experienceYears || "",
// // //         cityID: user.account?.person?.city?.cityID || "",
// // //         image: null,
// // //         imagePreview:
// // //           user.account?.person?.imagePath || "https://via.placeholder.com/150",
// // //       });
// // //       setLoading(false);
// // //     }
// // //   }, [user, me]);

// // //   const handleImageChange = (e) => {
// // //     const file = e.target.files[0];
// // //     if (file) {
// // //       setProfile({
// // //         ...profile,
// // //         image: file,
// // //         imagePreview: URL.createObjectURL(file),
// // //       });
// // //     }
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       const profileData = {
// // //         firstName: profile.firstName,
// // //         lastName: profile.lastName,
// // //         dateOfBirth: user?.account?.person?.dateOfBirth,
// // //         gender: profile.gender,
// // //         cityID: Number(profile.cityID),
// // //         email: profile.email,
// // //         address: user?.account?.person?.address || "string",
// // //         phone: profile.phone,
// // //         imagePath: profile.imagePreview,
// // //       };

// // //       const craftManprofile = {
// // //         experienceYears: Number(profile.experienceYears),
// // //         bio: profile.bio,
// // //         idImagePath: profile.imagePreview,
// // //       };

// // //       await updateProfileData(
// // //         profileData,
// // //         user?.account?.userName,
// // //         craftManprofile,
// // //       );
// // //     } catch (error) {
// // //       console.error("Error updating profile:", error);
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <Container className="text-center py-5 mt-5">
// // //         <Spinner animation="border" variant="warning" />
// // //         <p className="mt-2 text-muted">جاري تحميل البيانات...</p>
// // //       </Container>
// // //     );
// // //   }
// // //   return (
// // //     <Container className="py-4">
// // //       <Card className="border-0 shadow-sm p-4 bg-white rounded-3">
// // //         <h2 className="fw-bold text-primary mb-4">تعديل الملف الشخصي:</h2>
// // //         <Form onSubmit={handleSubmit}>
// // //           <Row className="mb-4">
// // //             <Col xs={12} className="text-center">
// // //               <div className="position-relative d-inline-block">
// // //                 <Image
// // //                   src={profile.imagePreview}
// // //                   roundedCircle
// // //                   style={{
// // //                     width: "120px",
// // //                     height: "120px",
// // //                     objectFit: "cover",
// // //                   }}
// // //                   className="shadow-sm border border-3 border-light"
// // //                 />
// // //                 <label
// // //                   htmlFor="upload-image"
// // //                   className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow"
// // //                   style={{
// // //                     width: "35px",
// // //                     height: "35px",
// // //                     cursor: "pointer",
// // //                     border: "2px solid white",
// // //                   }}
// // //                 >
// // //                   <FontAwesomeIcon icon={faPlus} size="sm" />
// // //                 </label>
// // //                 <input
// // //                   id="upload-image"
// // //                   type="file"
// // //                   className="d-none"
// // //                   accept="image/*"
// // //                   onChange={handleImageChange}
// // //                 />
// // //               </div>
// // //             </Col>
// // //           </Row>

// // //           <Row>
// // //             <Col md={6}>
// // //               <Form.Group className="mb-3">
// // //                 <Form.Label>الاسم الأول</Form.Label>
// // //                 <Form.Control
// // //                   type="text"
// // //                   value={profile.firstName}
// // //                   onChange={(e) =>
// // //                     setProfile({ ...profile, firstName: e.target.value })
// // //                   }
// // //                 />
// // //               </Form.Group>
// // //             </Col>
// // //             <Col md={6}>
// // //               <Form.Group className="mb-3">
// // //                 <Form.Label>الاسم الأخير</Form.Label>
// // //                 <Form.Control
// // //                   type="text"
// // //                   value={profile.lastName}
// // //                   onChange={(e) =>
// // //                     setProfile({ ...profile, lastName: e.target.value })
// // //                   }
// // //                 />
// // //               </Form.Group>
// // //             </Col>
// // //           </Row>

// // //           <Row>
// // //             <Col md={6}>
// // //               <Form.Group className="mb-3">
// // //                 <Form.Label>البريد الإلكتروني</Form.Label>
// // //                 <Form.Control
// // //                   type="email"
// // //                   value={profile.email}
// // //                   onChange={(e) =>
// // //                     setProfile({ ...profile, email: e.target.value })
// // //                   }
// // //                 />
// // //               </Form.Group>
// // //             </Col>
// // //             <Col md={6}>
// // //               <Form.Group className="mb-3">
// // //                 <Form.Label>المدينة</Form.Label>
// // //                 <Form.Select
// // //                   value={profile.cityID}
// // //                   onChange={(e) =>
// // //                     setProfile({ ...profile, cityID: e.target.value })
// // //                   }
// // //                 >
// // //                   <option value="">اختر المدينة</option>
// // //                   {citie.map((city) => (
// // //                     <option key={city.cityID} value={city.cityID}>
// // //                       {city.cityName}
// // //                     </option>
// // //                   ))}
// // //                 </Form.Select>
// // //               </Form.Group>
// // //             </Col>
// // //           </Row>

// // //           <Row>
// // //             <Col md={6}>
// // //               <Form.Group className="mb-3">
// // //                 <Form.Label>رقم الهاتف</Form.Label>
// // //                 <Form.Control
// // //                   type="text"
// // //                   value={profile.phone}
// // //                   onChange={(e) =>
// // //                     setProfile({ ...profile, phone: e.target.value })
// // //                   }
// // //                 />
// // //               </Form.Group>
// // //             </Col>
// // //             <Col md={6}>
// // //               <Form.Group className="mb-3">
// // //                 <Form.Label>الجنس</Form.Label>
// // //                 <Form.Control
// // //                   type="text"
// // //                   value={profile.gender === true ? "ذكر" : "أنثى"}
// // //                   onChange={(e) =>
// // //                     setProfile({ ...profile, gender: e.target.value === "ذكر" })
// // //                   }
// // //                 />
// // //               </Form.Group>
// // //             </Col>
// // //           </Row>

// // //           <Row>
// // //             <Col md={6}>
// // //               <Form.Group className="mb-3">
// // //                 <Form.Label>تاريخ الميلاد</Form.Label>
// // //                 <Form.Control
// // //                   type="date"
// // //                   value={Transform(profile.dateOfBirth)}
// // //                   onChange={(e) =>
// // //                     setProfile({ ...profile, dateOfBirth: e.target.value })
// // //                   }
// // //                 />
// // //               </Form.Group>
// // //             </Col>
// // //             <Col md={6}>
// // //               <Form.Group className="mb-3">
// // //                 <Form.Label>سنوات الخبرة</Form.Label>
// // //                 <Form.Control
// // //                   type="number"
// // //                   value={profile.experienceYears}
// // //                   onChange={(e) =>
// // //                     setProfile({ ...profile, experienceYears: e.target.value })
// // //                   }
// // //                 />
// // //               </Form.Group>
// // //             </Col>
// // //           </Row>

// // //           <Row>
// // //             <Col md={12}>
// // //               <Form.Group className="mb-3">
// // //                 <Form.Label>النبذة التعريفية (Bio)</Form.Label>
// // //                 <Form.Control
// // //                   as="textarea"
// // //                   rows={3}
// // //                   value={profile.bio}
// // //                   onChange={(e) =>
// // //                     setProfile({ ...profile, bio: e.target.value })
// // //                   }
// // //                 />
// // //               </Form.Group>
// // //             </Col>
// // //           </Row>

// // //           <div className="mt-4">
// // //             <Button
// // //               variant="success"
// // //               type="submit"
// // //               className="px-5 rounded-pill"
// // //             >
// // //               حفظ كافة التعديلات
// // //             </Button>
// // //           </div>
// // //         </Form>
// // //       </Card>
// // //     </Container>
// // //   );
// // // }
// // import React, { useState, useEffect, useContext } from "react";
// // import {
// //   Container,
// //   Row,
// //   Col,
// //   Form,
// //   Button,
// //   Card,
// //   Spinner,
// //   Image,
// // } from "react-bootstrap";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faPlus } from "@fortawesome/free-solid-svg-icons";
// // import { AuthContext } from "../../Context/AuthContext";
// // import { Axios } from "../../Api/Axois";
// // import { cities, CraftsMen } from "../../Api/Api";
// // import { toast } from "react-toastify";

// // export default function EditProfile() {
// //   const { user, updateProfileData } = useContext(AuthContext);

// //   const [profile, setProfile] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     bio: "",
// //     phone: "",
// //     gender: true,
// //     craft: "",
// //     experienceYears: "",
// //     cityID: "",
// //     image: null,
// //     imagePreview: "",
// //   });

// //   const [citie, setCities] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [me, setMe] = useState(null);

// //   useEffect(() => {
// //     if (user && user.craftManID) {
// //       Axios.get(`/${CraftsMen}/${user.craftManID}`)
// //         .then((res) => {
// //           setMe(res.data);
// //         })
// //         .catch((error) => {
// //           console.error(error);
// //           toast.error("حدث خطأ في جلب بيانات الحرفي");
// //         });
// //     }
// //   }, [user]);

// //   useEffect(() => {
// //     Axios.get(`/${cities}`)
// //       .then((res) => {
// //         setCities(res.data);
// //       })
// //       .catch((error) => {
// //         console.error(error);
// //         toast.error("فشل في تحميل المحافظات");
// //       });
// //   }, []);

// //   useEffect(() => {
// //     if (user) {
// //       setProfile({
// //         firstName: user.account?.person?.firstName || "",
// //         lastName: user.account?.person?.lastName || "",
// //         email: user.account?.person?.email || "",
// //         bio: me?.bio || "",
// //         phone: user.account?.person?.phone || "",
// //         gender: user.account?.person?.gender ?? true,
// //         craft: user.craft?.craftName || "",
// //         experienceYears: me?.experienceYears || "",
// //         cityID: user.account?.person?.city?.cityID || "",
// //         image: null,
// //         imagePreview:
// //           user.account?.person?.imagePath || "https://via.placeholder.com/150",
// //       });
// //       setLoading(false);
// //     }
// //   }, [user, me]);

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setProfile({
// //         ...profile,
// //         image: file,
// //         imagePreview: file.name,
// //       });
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const profileData = {
// //         firstName: profile.firstName,
// //         lastName: profile.lastName,
// //         dateOfBirth:
// //           user?.account?.person?.dateOfBirth || new Date().toISOString(),
// //         gender: profile.gender,
// //         cityID: Number(profile.cityID),
// //         email: profile.email,
// //         address: user?.account?.person?.address || "string",
// //         phone: profile.phone,
// //         imagePath: profile.imagePreview,
// //       };

// //       const craftManprofile = {
// //         experienceYears: Number(profile.experienceYears),
// //         bio: profile.bio,
// //         idImagePath: profile.imagePreview,
// //       };

// //       await updateProfileData(
// //         profileData,
// //         user?.account?.userName,
// //         craftManprofile,
// //       );
// //     } catch (error) {
// //       console.error("Error updating profile:", error);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <Container className="text-center py-5 mt-5">
// //         <Spinner animation="border" variant="warning" />
// //         <p className="mt-2 text-muted">جاري تحميل البيانات...</p>
// //       </Container>
// //     );
// //   }

// //   return (
// //     <Container className="py-4">
// //       <Card className="border-0 shadow-sm p-4 bg-white rounded-3">
// //         <h2 className="fw-bold text-primary mb-4">تعديل الملف الشخصي:</h2>
// //         <Form onSubmit={handleSubmit}>
// //           <Row className="mb-4">
// //             <Col xs={12} className="text-center">
// //               <div className="position-relative d-inline-block">
// //                 <Image
// //                   src={profile.imagePreview}
// //                   roundedCircle
// //                   style={{
// //                     width: "120px",
// //                     height: "120px",
// //                     objectFit: "cover",
// //                   }}
// //                   className="shadow-sm border border-3 border-light"
// //                 />
// //                 <label
// //                   htmlFor="upload-image"
// //                   className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow"
// //                   style={{
// //                     width: "35px",
// //                     height: "35px",
// //                     cursor: "pointer",
// //                     border: "2px solid white",
// //                   }}
// //                 >
// //                   <FontAwesomeIcon icon={faPlus} size="sm" />
// //                 </label>
// //                 <input
// //                   id="upload-image"
// //                   type="file"
// //                   className="d-none"
// //                   accept="image/*"
// //                   onChange={handleImageChange}
// //                 />
// //               </div>
// //             </Col>
// //           </Row>

// //           <Row>
// //             <Col md={6}>
// //               <Form.Group className="mb-3">
// //                 <Form.Label>الاسم الأول</Form.Label>
// //                 <Form.Control
// //                   type="text"
// //                   value={profile.firstName}
// //                   onChange={(e) =>
// //                     setProfile({ ...profile, firstName: e.target.value })
// //                   }
// //                 />
// //               </Form.Group>
// //             </Col>
// //             <Col md={6}>
// //               <Form.Group className="mb-3">
// //                 <Form.Label>الاسم الأخير</Form.Label>
// //                 <Form.Control
// //                   type="text"
// //                   value={profile.lastName}
// //                   onChange={(e) =>
// //                     setProfile({ ...profile, lastName: e.target.value })
// //                   }
// //                 />
// //               </Form.Group>
// //             </Col>
// //           </Row>

// //           <Row>
// //             <Col md={6}>
// //               <Form.Group className="mb-3">
// //                 <Form.Label>البريد الإلكتروني</Form.Label>
// //                 <Form.Control
// //                   type="email"
// //                   value={profile.email}
// //                   onChange={(e) =>
// //                     setProfile({ ...profile, email: e.target.value })
// //                   }
// //                 />
// //               </Form.Group>
// //             </Col>
// //             <Col md={6}>
// //               <Form.Group className="mb-3">
// //                 <Form.Label>المدينة</Form.Label>
// //                 <Form.Select
// //                   value={profile.cityID}
// //                   onChange={(e) =>
// //                     setProfile({ ...profile, cityID: e.target.value })
// //                   }
// //                 >
// //                   <option value="">اختر المدينة</option>
// //                   {citie.map((city) => (
// //                     <option key={city.cityID} value={city.cityID}>
// //                       {city.cityName || city.name}
// //                     </option>
// //                   ))}
// //                 </Form.Select>
// //               </Form.Group>
// //             </Col>
// //           </Row>

// //           <Row>
// //             <Col md={6}>
// //               <Form.Group className="mb-3">
// //                 <Form.Label>رقم الهاتف</Form.Label>
// //                 <Form.Control
// //                   type="text"
// //                   value={profile.phone}
// //                   onChange={(e) =>
// //                     setProfile({ ...profile, phone: e.target.value })
// //                   }
// //                 />
// //               </Form.Group>
// //             </Col>
// //             <Col md={6}>
// //               <Form.Group className="mb-3">
// //                 <Form.Label>الجنس</Form.Label>
// //                 <Form.Control
// //                   type="text"
// //                   value={profile.gender === true ? "ذكر" : "أنثى"}
// //                   onChange={(e) =>
// //                     setProfile({ ...profile, gender: e.target.value === "ذكر" })
// //                   }
// //                 />
// //               </Form.Group>
// //             </Col>
// //           </Row>

// //           <Row>
// //             <Col md={6}>
// //               <Form.Group className="mb-3">
// //                 <Form.Label>المهنة</Form.Label>
// //                 <Form.Control
// //                   type="text"
// //                   value={profile.craft}
// //                   onChange={(e) =>
// //                     setProfile({ ...profile, craft: e.target.value })
// //                   }
// //                 />
// //               </Form.Group>
// //             </Col>
// //             <Col md={6}>
// //               <Form.Group className="mb-3">
// //                 <Form.Label>سنوات الخبرة</Form.Label>
// //                 <Form.Control
// //                   type="number"
// //                   value={profile.experienceYears}
// //                   onChange={(e) =>
// //                     setProfile({ ...profile, experienceYears: e.target.value })
// //                   }
// //                 />
// //               </Form.Group>
// //             </Col>
// //           </Row>

// //           <Row>
// //             <Col md={12}>
// //               <Form.Group className="mb-3">
// //                 <Form.Label>النبذة التعريفية (Bio)</Form.Label>
// //                 <Form.Control
// //                   as="textarea"
// //                   rows={3}
// //                   value={profile.bio}
// //                   onChange={(e) =>
// //                     setProfile({ ...profile, bio: e.target.value })
// //                   }
// //                 />
// //               </Form.Group>
// //             </Col>
// //           </Row>

// //           <div className="mt-4">
// //             <Button
// //               variant="success"
// //               type="submit"
// //               className="px-5 rounded-pill"
// //             >
// //               حفظ كافة التعديلات
// //             </Button>
// //           </div>
// //         </Form>
// //       </Card>
// //     </Container>
// //   );
// // }
// import React, { useState, useEffect, useContext } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Button,
//   Card,
//   Spinner,
//   Image,
// } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import { AuthContext } from "../../Context/AuthContext";
// import { Axios } from "../../Api/Axois";
// import { cities, CraftsMen } from "../../Api/Api";
// import { toast } from "react-toastify";
// import Transform from "../../Helpers/Transform";

// export default function EditProfile() {
//   const { user, updateProfileData } = useContext(AuthContext);

//   const [profile, setProfile] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     bio: "",
//     phone: "",
//     gender: true,
//     craft: "",
//     experienceYears: "",
//     cityID: "",
//     image: null,
//     imagePreview: "",
//   });

//   const [citie, setCities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [me, setMe] = useState(null);

//   useEffect(() => {
//     if (user && user.craftManID) {
//       Axios.get(`/${CraftsMen}/${user.craftManID}`)
//         .then((res) => {
//           setMe(res.data);
//         })
//         .catch((error) => {
//           console.error(error);
//           toast.error("حدث خطأ في جلب بيانات الحرفي");
//         });
//     }
//   }, [user]);

//   useEffect(() => {
//     Axios.get(`/${cities}`)
//       .then((res) => {
//         setCities(res.data);
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error("فشل في تحميل المحافظات");
//       });
//   }, []);

//   useEffect(() => {
//     if (user) {
//       setProfile({
//         firstName: user.account?.person?.firstName || "",
//         lastName: user.account?.person?.lastName || "",
//         email: user.account?.person?.email || "",
//         bio: me?.bio || "",
//         phone: user.account?.person?.phone || "",
//         gender: user.account?.person?.gender ?? true,
//         craft: user.craft?.craftName || "",
//         experienceYears: me?.experienceYears || "",
//         dateOfBirth: user?.account?.person?.dateOfBirth || "",
//         cityID: user.account?.person?.city?.cityID || "",
//         image: null,
//         imagePreview: user.account?.person?.imagePath || "",
//       });
//       setLoading(false);
//     }
//   }, [user, me]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfile({
//         ...profile,
//         image: file,

//         imagePreview: file.name,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const profileData = {
//         firstName: profile.firstName,
//         lastName: profile.lastName,
//         dateOfBirth: profile.dateOfBirth,
//         gender: profile.gender,
//         cityID: Number(profile.cityID),
//         email: profile.email,
//         address: user?.account?.person?.address || "string",
//         phone: profile.phone,
//         imagePath: profile.imagePreview,
//       };

//       const craftManprofile = {
//         experienceYears: Number(profile.experienceYears),
//         bio: profile.bio,
//         idImagePath: profile.imagePreview,
//       };

//       await updateProfileData(
//         profileData,
//         user?.account?.userName,
//         craftManprofile,
//       );
//       toast.success("تم تحديث الملف الشخصي بنجاح");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       toast.error("حدث خطأ أثناء التحديث");
//     }
//   };

//   if (loading) {
//     return (
//       <Container className="text-center py-5 mt-5">
//         <Spinner animation="border" variant="warning" />
//         <p className="mt-2 text-muted">جاري تحميل البيانات...</p>
//       </Container>
//     );
//   }

//   return (
//     <Container className="py-4">
//       <Card className="border-0 shadow-sm p-4 bg-white rounded-3">
//         <h2 className="fw-bold text-primary mb-4">تعديل الملف الشخصي:</h2>
//         <Form onSubmit={handleSubmit}>
//           <Row className="mb-4">
//             <Col xs={12} className="text-center">
//               <div className="position-relative d-inline-block">
//                 <Image
//                   src={
//                     profile.imagePreview === "string"
//                       ? "null"
//                       : require(`../../Assest/${profile.imagePreview}`)
//                   }
//                   roundedCircle
//                   style={{
//                     width: "120px",
//                     height: "120px",
//                     objectFit: "cover",
//                   }}
//                   className="shadow-sm border border-3 border-light"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = "https://via.placeholder.com/150";
//                   }}
//                 />
//                 <label
//                   htmlFor="upload-image"
//                   className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow"
//                   style={{
//                     width: "35px",
//                     height: "35px",
//                     cursor: "pointer",
//                     border: "2px solid white",
//                   }}
//                 >
//                   <FontAwesomeIcon icon={faPlus} size="sm" />
//                 </label>
//                 <input
//                   id="upload-image"
//                   type="file"
//                   className="d-none"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                 />
//               </div>
//             </Col>
//           </Row>

//           <Row>
//             <Col md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label>الاسم الأول</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={profile.firstName}
//                   onChange={(e) =>
//                     setProfile({ ...profile, firstName: e.target.value })
//                   }
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label>الاسم الأخير</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={profile.lastName}
//                   onChange={(e) =>
//                     setProfile({ ...profile, lastName: e.target.value })
//                   }
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row>
//             <Col md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label>البريد الإلكتروني</Form.Label>
//                 <Form.Control
//                   type="email"
//                   value={profile.email}
//                   onChange={(e) =>
//                     setProfile({ ...profile, email: e.target.value })
//                   }
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label>المدينة</Form.Label>
//                 <Form.Select
//                   value={profile.cityID}
//                   onChange={(e) =>
//                     setProfile({ ...profile, cityID: e.target.value })
//                   }
//                 >
//                   <option value="">اختر المدينة</option>
//                   {citie.map((city) => (
//                     <option key={city.cityID} value={city.cityID}>
//                       {city.cityName || city.name}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row>
//             <Col md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label>رقم الهاتف</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={profile.phone}
//                   onChange={(e) =>
//                     setProfile({ ...profile, phone: e.target.value })
//                   }
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label>الجنس</Form.Label>
//                 <Form.Select
//                   value={profile.gender ? "true" : "false"}
//                   onChange={(e) =>
//                     setProfile({
//                       ...profile,
//                       gender: e.target.value === "true",
//                     })
//                   }
//                 >
//                   <option value="true">ذكر</option>
//                   <option value="false">أنثى</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row>
//             <Col md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label>تاريخ الميلاد</Form.Label>
//                 <Form.Control
//                   type="date"
//                   value={Transform(profile.dateOfBirth)}
//                   onChange={(e) =>
//                     setProfile({ ...profile, dateOfBirth: e.target.value })
//                   }
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label>سنوات الخبرة</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={profile.experienceYears}
//                   onChange={(e) =>
//                     setProfile({ ...profile, experienceYears: e.target.value })
//                   }
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Row>
//             <Col md={12}>
//               <Form.Group className="mb-3">
//                 <Form.Label>النبذة التعريفية (Bio)</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   rows={3}
//                   value={profile.bio}
//                   onChange={(e) =>
//                     setProfile({ ...profile, bio: e.target.value })
//                   }
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <div className="mt-4">
//             <Button
//               variant="success"
//               type="submit"
//               className="px-5 rounded-pill"
//             >
//               حفظ كافة التعديلات
//             </Button>
//           </div>
//         </Form>
//       </Card>
//     </Container>
//   );
// }
import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
  Image,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../Context/AuthContext";
import { Axios } from "../../Api/Axois";
import { cities, CraftsMen } from "../../Api/Api";
import { toast } from "react-toastify";
import Transform from "../../Helpers/Transform";

export default function EditProfile() {
  const { user, updateProfileData } = useContext(AuthContext);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    bio: "",
    phone: "",
    gender: true,
    craft: "",
    experienceYears: "",
    dateOfBirth: "",
    cityID: "",
    image: null,
    imagePreview: "",
  });

  const [citie, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState(null);

  useEffect(() => {
    if (user && user.craftManID) {
      Axios.get(`/${CraftsMen}/${user.craftManID}`)
        .then((res) => {
          setMe(res.data);
        })
        .catch((error) => {
          console.error(error);
          toast.error("حدث خطأ في جلب بيانات الحرفي");
        });
    }
  }, [user]);

  useEffect(() => {
    Axios.get(`/${cities}`)
      .then((res) => {
        setCities(res.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("فشل في تحميل المحافظات");
      });
  }, []);

  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.account?.person?.firstName || "",
        lastName: user.account?.person?.lastName || "",
        userName: user.account?.userName || "",
        email: user.account?.person?.email || "",
        bio: me?.bio || "",
        phone: user.account?.person?.phone || "",
        gender: user.account?.person?.gender ?? true,
        craft: user.craft?.craftName || "",
        experienceYears: me?.experienceYears || "",
        dateOfBirth: user?.account?.person?.dateOfBirth || "",
        cityID: user.account?.person?.city?.cityID || "",
        image: null,
        imagePreview: user.account?.person?.imagePath || "",
      });
      setLoading(false);
    }
  }, [user, me]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({
        ...profile,
        image: file,
        imagePreview: file.name,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const profileData = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        dateOfBirth: profile.dateOfBirth,
        gender: profile.gender,
        cityID: Number(profile.cityID),
        email: profile.email,
        address: user?.account?.person?.address || "string",
        phone: profile.phone,
        imagePath: profile.imagePreview,
      };

      const craftManprofile = {
        experienceYears: Number(profile.experienceYears),
        bio: profile.bio,
        idImagePath: profile.imagePreview,
      };

      await updateProfileData(profileData, profile.userName, craftManprofile);
      toast.success("تم تحديث الملف الشخصي بنجاح");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("حدث خطأ أثناء التحديث");
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5 mt-5">
        <Spinner animation="border" variant="warning" />
        <p className="mt-2 text-muted">جاري تحميل البيانات...</p>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Card className="border-0 shadow-sm p-4 bg-white rounded-3">
        <h2 className="fw-bold text-primary mb-4">تعديل الملف الشخصي:</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-4">
            <Col xs={12} className="text-center">
              <div className="position-relative d-inline-block">
                <Image
                  src={
                    profile.imagePreview === "string" || !profile.imagePreview
                      ? "https://via.placeholder.com/150"
                      : require(`../../Assest/${profile.imagePreview}`)
                  }
                  roundedCircle
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                  className="shadow-sm border border-3 border-light"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
                <label
                  htmlFor="upload-image"
                  className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow"
                  style={{
                    width: "35px",
                    height: "35px",
                    cursor: "pointer",
                    border: "2px solid white",
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} size="sm" />
                </label>
                <input
                  id="upload-image"
                  type="file"
                  className="d-none"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>اسم المستخدم</Form.Label>
                <Form.Control
                  type="text"
                  value={profile.userName}
                  onChange={(e) =>
                    setProfile({ ...profile, userName: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>الاسم الأول</Form.Label>
                <Form.Control
                  type="text"
                  value={profile.firstName}
                  onChange={(e) =>
                    setProfile({ ...profile, firstName: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>الاسم الأخير</Form.Label>
                <Form.Control
                  type="text"
                  value={profile.lastName}
                  onChange={(e) =>
                    setProfile({ ...profile, lastName: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>البريد الإلكتروني</Form.Label>
                <Form.Control
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>المدينة</Form.Label>
                <Form.Select
                  value={profile.cityID}
                  onChange={(e) =>
                    setProfile({ ...profile, cityID: e.target.value })
                  }
                >
                  <option value="">اختر المدينة</option>
                  {citie.map((city) => (
                    <option key={city.cityID} value={city.cityID}>
                      {city.cityName || city.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>رقم الهاتف</Form.Label>
                <Form.Control
                  type="text"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>الجنس</Form.Label>
                <Form.Select
                  value={profile.gender ? "true" : "false"}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      gender: e.target.value === "true",
                    })
                  }
                >
                  <option value="true">ذكر</option>
                  <option value="false">أنثى</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>تاريخ الميلاد</Form.Label>
                <Form.Control
                  type="date"
                  value={Transform(profile.dateOfBirth)}
                  onChange={(e) =>
                    setProfile({ ...profile, dateOfBirth: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>سنوات الخبرة</Form.Label>
                <Form.Control
                  type="number"
                  value={profile.experienceYears}
                  onChange={(e) =>
                    setProfile({ ...profile, experienceYears: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>النبذة التعريفية (Bio)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-4">
            <Button
              variant="success"
              type="submit"
              className="px-5 rounded-pill"
            >
              حفظ كافة التعديلات
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
