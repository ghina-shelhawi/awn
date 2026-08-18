// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import React, { useEffect, useState } from "react";
// // import { Col, Container, Row } from "react-bootstrap";
// // import {
// //   faCheck,
// //   faLocationDot,
// //   faTimes,
// // } from "@fortawesome/free-solid-svg-icons";

// // import { faBriefcaseClock } from "@fortawesome/free-solid-svg-icons/faBriefcaseClock";
// // import { useParams } from "react-router-dom";
// // import {
// //   byCraftmen,
// //   CraftsMen,
// //   ReputationControls,
// //   Services,
// // } from "../../Api/Api";
// // import { Axios } from "../../Api/Axois";
// // import { renderStars } from "../../Helpers/Renderstart";
// // import Transform from "../../Helpers/Transform";

// // export default function Details() {
// //   const [ReputationControlss, setReputationControls] = useState([]);
// //   const [services, setservices] = useState([]);

// //   const [man, setman] = useState([]);

// //   const id = useParams();
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const [manRes, servicesRes, controlRes] = await Promise.all([
// //           Axios.get(`${CraftsMen}/ ${id.id}`),
// //           Axios.get(`${Services}/${byCraftmen}/${id.id}`),
// //           Axios.get(`${ReputationControls}/${byCraftmen}/${id.id}`),
// //         ]);
// //         setman(manRes.data);
// //         setservices(servicesRes.data);
// //         setReputationControls(controlRes.data);
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //       }
// //     };
// //     fetchData();
// //   }, []);

// //   return (
// //     <>
// //       {man.length === 0 ? (
// //         ""
// //       ) : (
// //         <div className="bg-light">
// //           <Container className="py-5 ">
// //             <div className="row  ">
// //               <div className="col-lg-6">
// //                 <div className="d-flex align-items-start justify-content-start gap-3 ">
// //                   <img
// //                     className="rounded "
// //                     src={man.account?.person?.imagePath}
// //                     alt=" "
// //                     width={"200px"}
// //                   />
// //                   <div className="mt-3 text-primary fw-bold">
// //                     <h2 className="fw-bold">
// //                       {man.account.person.firstName}
// //                       {"  "}
// //                       {man.account.person.lastName}
// //                     </h2>

// //                     <div className="mt-3 me-1 d-flex gap-1">
// //                       <h5>{renderStars(5)}</h5>
// //                     </div>
// //                     <div className="text-muted mt-2">
// //                       <FontAwesomeIcon
// //                         icon={faLocationDot}
// //                         size="lg"
// //                         color="orange"
// //                       />
// //                       {man.account.person.city.cityName}
// //                       {` `},{man.account.person.address}
// //                     </div>

// //                     <div className="d-flex gap-2 ">
// //                       <div
// //                         className="mt-3  bg-white border py-1 px-2 rounded-4 "
// //                         style={{ width: "fit-content" }}
// //                       >
// //                         {man.craft.craftName}
// //                         <img
// //                           src={require(`../../Assest/${man.craft.imageUrl}`)}
// //                           width={"30px"}
// //                           alt=""
// //                         />
// //                       </div>
// //                       <div
// //                         className="mt-3  bg-white border py-1 px-2 rounded-4 "
// //                         style={{ width: "fit-content" }}
// //                       >
// //                         {man.isVerified ? (
// //                           <div>
// //                             موثوق
// //                             <FontAwesomeIcon
// //                               icon={faCheck}
// //                               size="lg"
// //                               color="green"
// //                             />
// //                           </div>
// //                         ) : (
// //                           <div>
// //                             {" "}
// //                             لم يتم التوثيق بعد
// //                             <FontAwesomeIcon
// //                               icon={faTimes}
// //                               size="lg"
// //                               color="red"
// //                             />
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="card mt-5 mx-1 p-3 shadow">
// //                   <h3
// //                     style={{ borderRight: "5px solid orange", color: "#333" }}
// //                     className="p-2 "
// //                   >
// //                     نبذة عن الحرفي:
// //                   </h3>
// //                   <p className=" mt-2 " style={{ lineHeight: "25px" }}>
// //                     {man.bio}
// //                   </p>
// //                   <p style={{ color: "#333" }}>
// //                     <FontAwesomeIcon
// //                       className="ms-1"
// //                       icon={faBriefcaseClock}
// //                       size="lg"
// //                       color="orange"
// //                     />
// //                     من السبت للخميس الساعة 1الى 8
// //                   </p>
// //                   <div className="d-flex align-items-center justify-content-center flex-wrap gap-4 mx-1">
// //                     <div
// //                       className="text-primary rounded-3 p-1 m-0 fw-bold shadow text-center mt-2   "
// //                       style={{
// //                         borderRight: "4px solid orange",
// //                         background: "#eeeeeee0",
// //                       }}
// //                     >
// //                       <h5 className="fw-bold text-sm-xs mt-1">
// //                         سنوات الخبرة :
// //                       </h5>
// //                       <p
// //                         className="m-0 fw-bold text-secondary"
// //                         style={{ fontSize: "20px" }}
// //                       >
// //                         {man.experienceYears}+
// //                       </p>
// //                     </div>
// //                     <div
// //                       className="text-primary rounded-3 p-1 m-0 fw-bold shadow text-center mt-2   "
// //                       style={{
// //                         borderRight: "4px solid orange",
// //                         background: "#eeeeeee0",
// //                       }}
// //                     >
// //                       <h5 className="fw-bold mt-1">رقم الهاتف:</h5>
// //                       <p
// //                         className="m-0 fw-bold  text-secondary"
// //                         style={{ fontSize: "20px" }}
// //                       >
// //                         {man.account.person.phone}
// //                       </p>
// //                     </div>

// //                     <div
// //                       className="text-primary rounded-3 p-1 m-0 fw-bold shadow text-center mt-2   "
// //                       style={{
// //                         borderRight: "4px solid orange",
// //                         background: "#eeeeeee0",
// //                       }}
// //                     >
// //                       <h5 className="fw-bold mt-1">تاريخ الانضمام </h5>
// //                       <small
// //                         className="m-0 fw-bold small text-secondary"
// //                         style={{ fontSize: "18px" }}
// //                       >
// //                         {Transform(man.registrationDate)}
// //                       </small>
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div className="mt-4 me-2 card p-3 shadow">
// //                   <h3
// //                     style={{ borderRight: "5px solid orange", color: "#333" }}
// //                     className="p-2 "
// //                   >
// //                     أبرز الخدمات:
// //                   </h3>
// //                   <Row className="g-3 mb-4">
// //                     {services.map((service) => (
// //                       <Col md={6} key={service.id}>
// //                         <div
// //                           className=" h-100  rounded-3 mt-2  shadow  p-3 "
// //                           style={{
// //                             background: "#eeeeeee0",
// //                             borderRight: "4px solid orange",
// //                           }}
// //                         >
// //                           <div className="d-flex justify-content-between">
// //                             <h6 className="ms-1 fw-bold text-primary">
// //                               {service?.title}
// //                             </h6>
// //                             <span className="text-danger small ">
// //                               يبدأ من {service?.startingPrice} ليرة سورية
// //                             </span>
// //                           </div>
// //                           <p className="text-muted small mb-0">
// //                             {service?.description}
// //                           </p>
// //                         </div>
// //                       </Col>
// //                     ))}
// //                   </Row>
// //                 </div>
// //               </div>
// //               <div className="col-lg-6 mt-3">
// //                 <h3
// //                   style={{ borderRight: "5px solid orange", color: "#333" }}
// //                   className="p-2 "
// //                 >
// //                   معرض الاعمال:
// //                 </h3>

// //                 <Row className="g-3 mb-3 mt-3 ">
// //                   <Col md={4}>
// //                     <img
// //                       src={require("../../Assest/a_macro_shot_of_intricate_hand_carved_floral_patterns_on_a_piece.png")}
// //                       className="img-fluid rounded"
// //                       alt=""
// //                       style={{
// //                         height: "200px",
// //                         objectFit: "cover",
// //                         width: "100%",
// //                       }}
// //                     />
// //                   </Col>
// //                   <Col md={4}>
// //                     <img
// //                       src={require("../../Assest/a_modern_minimalist_custom_built_in_wooden_bookshelf_with_integrated.png")}
// //                       className="img-fluid rounded"
// //                       alt=""
// //                       style={{
// //                         height: "200px",
// //                         objectFit: "cover",
// //                         width: "100%",
// //                       }}
// //                     />
// //                   </Col>
// //                   <Col md={4}>
// //                     <img
// //                       src={require("../../Assest/a_high_end_detailed_close_up_of_a_luxury_dark_oak_wooden_table_surface.png")}
// //                       className="img-fluid rounded"
// //                       alt=""
// //                       style={{
// //                         height: "200px",
// //                         objectFit: "cover",
// //                         width: "100%",
// //                       }}
// //                     />
// //                   </Col>
// //                 </Row>

// //                 <Row className="g-3">
// //                   <Col md={8}>
// //                     {" "}
// //                     <img
// //                       src={require("../../Assest/a_luxurious_modern_dark_wood_kitchen_island_with_a_white_marble.png")}
// //                       className="img-fluid rounded"
// //                       alt=""
// //                       style={{
// //                         height: "300px",
// //                         objectFit: "cover",
// //                         width: "100%",
// //                       }}
// //                     />
// //                   </Col>
// //                   <Col md={4}>
// //                     {" "}
// //                     <img
// //                       src={require("../../Assest/a_beautifully_restored_vintage_wooden_classic_chair_standing_alone.png")}
// //                       className="img-fluid rounded"
// //                       alt=""
// //                       style={{
// //                         height: "300px",
// //                         objectFit: "cover",
// //                         width: "100%",
// //                       }}
// //                     />
// //                   </Col>
// //                 </Row>
// //               </div>
// //             </div>
// //           </Container>
// //         </div>
// //       )}
// //     </>
// //   );
// // }
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useEffect, useState } from "react";
// import { Col, Container, Row } from "react-bootstrap";
// import {
//   faCheck,
//   faLocationDot,
//   faTimes,
// } from "@fortawesome/free-solid-svg-icons";

// import { faBriefcaseClock } from "@fortawesome/free-solid-svg-icons/faBriefcaseClock";
// import { useParams } from "react-router-dom";
// import {
//   byCraftmen,
//   CraftsMen,
//   ReputationControls,
//   Services,
// } from "../../Api/Api";
// import { Axios } from "../../Api/Axois";
// import { renderStars } from "../../Helpers/Renderstart";
// import Transform from "../../Helpers/Transform";

// export default function Details() {
//   const [ReputationControlss, setReputationControls] = useState([]);
//   const [services, setservices] = useState([]);
//   const [man, setman] = useState(null); // جعلناها null لسهولة فحص التحميل

//   const id = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [manRes, servicesRes, controlRes] = await Promise.all([
//           Axios.get(`${CraftsMen}/${id.id}`),
//           Axios.get(`${Services}/${byCraftmen}/${id.id}`),
//           Axios.get(`${ReputationControls}/${byCraftmen}/${id.id}`),
//         ]);
//         setman(manRes.data);
//         setservices(servicesRes.data);
//         setReputationControls(controlRes.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, [id.id]);

//   if (!man) {
//     return ""; // أو عنصر Loading مناسب
//   }

//   return (
//     <div className="bg-light">
//       <Container className="py-5">
//         <div className="row">
//           <div className="col-lg-6">
//             <div className="d-flex align-items-start justify-content-start gap-3">
//               <img
//                 className="rounded"
//                 src={require(`../../Assest/${man.account?.person?.imagePath}`)}
//                 alt="Profile"
//                 width={"200px"}
//               />
//               <div className="mt-3 text-primary fw-bold">
//                 <h2 className="fw-bold">
//                   {man.account?.person?.firstName}{" "}
//                   {man.account?.person?.lastName}
//                 </h2>

//                 <div className="mt-3 me-1 d-flex gap-1">
//                   <h5>{renderStars(5)}</h5>
//                 </div>
//                 <div className="text-muted mt-2">
//                   <FontAwesomeIcon
//                     icon={faLocationDot}
//                     size="lg"
//                     color="orange"
//                   />
//                   {man.account?.person?.city?.cityName},{" "}
//                   {man.account?.person?.address}
//                 </div>

//                 <div className="d-flex gap-2">
//                   <div
//                     className="mt-3 bg-white border py-1 px-2 rounded-4"
//                     style={{ width: "fit-content" }}
//                   >
//                     {man.craft?.craftName}
//                   </div>
//                   <div
//                     className="mt-3 bg-white border py-1 px-2 rounded-4"
//                     style={{ width: "fit-content" }}
//                   >
//                     {man.isVerified ? (
//                       <div>
//                         موثوق
//                         <FontAwesomeIcon
//                           icon={faCheck}
//                           size="lg"
//                           color="green"
//                         />
//                       </div>
//                     ) : (
//                       <div>
//                         لم يتم التوثيق بعد
//                         <FontAwesomeIcon icon={faTimes} size="lg" color="red" />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="card mt-5 mx-1 p-3 shadow">
//               <h3
//                 style={{ borderRight: "5px solid orange", color: "#333" }}
//                 className="p-2"
//               >
//                 نبذة عن الحرفي:
//               </h3>
//               <p className="mt-2" style={{ lineHeight: "25px" }}>
//                 {man.bio}
//               </p>
//               <p style={{ color: "#333" }}>
//                 <FontAwesomeIcon
//                   className="ms-1"
//                   icon={faBriefcaseClock}
//                   size="lg"
//                   color="orange"
//                 />
//                 من السبت للخميس الساعة 1 إلى 8
//               </p>
//               <div className="d-flex align-items-center justify-content-center flex-wrap gap-4 mx-1">
//                 <div
//                   className="text-primary rounded-3 p-1 m-0 fw-bold shadow text-center mt-2"
//                   style={{
//                     borderRight: "4px solid orange",
//                     background: "#eeeeeee0",
//                   }}
//                 >
//                   <h5 className="fw-bold text-sm-xs mt-1">سنوات الخبرة :</h5>
//                   <p
//                     className="m-0 fw-bold text-secondary"
//                     style={{ fontSize: "20px" }}
//                   >
//                     {man.experienceYears}+
//                   </p>
//                 </div>
//                 <div
//                   className="text-primary rounded-3 p-1 m-0 fw-bold shadow text-center mt-2"
//                   style={{
//                     borderRight: "4px solid orange",
//                     background: "#eeeeeee0",
//                   }}
//                 >
//                   <h5 className="fw-bold mt-1">رقم الهاتف:</h5>
//                   <p
//                     className="m-0 fw-bold text-secondary"
//                     style={{ fontSize: "20px" }}
//                   >
//                     {man.account?.person?.phone}
//                   </p>
//                 </div>

//                 <div
//                   className="text-primary rounded-3 p-1 m-0 fw-bold shadow text-center mt-2"
//                   style={{
//                     borderRight: "4px solid orange",
//                     background: "#eeeeeee0",
//                   }}
//                 >
//                   <h5 className="fw-bold mt-1">تاريخ الانضمام</h5>
//                   <small
//                     className="m-0 fw-bold small text-secondary"
//                     style={{ fontSize: "18px" }}
//                   >
//                     {Transform(man.registrationDate)}
//                   </small>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-4 me-2 card p-3 shadow">
//               <h3
//                 style={{ borderRight: "5px solid orange", color: "#333" }}
//                 className="p-2"
//               >
//                 أبرز الخدمات:
//               </h3>
//               <Row className="g-3 mb-4">
//                 {services.map((service) => (
//                   <Col md={6} key={service.id}>
//                     <div
//                       className="h-100 rounded-3 mt-2 shadow p-3"
//                       style={{
//                         background: "#eeeeeee0",
//                         borderRight: "4px solid orange",
//                       }}
//                     >
//                       <div className="d-flex justify-content-between">
//                         <h6 className="ms-1 fw-bold text-primary">
//                           {service?.title}
//                         </h6>
//                         <span className="text-danger small">
//                           يبدأ من {service?.startingPrice} ليرة سورية
//                         </span>
//                       </div>
//                       <p className="text-muted small mb-0">
//                         {service?.description}
//                       </p>
//                     </div>
//                   </Col>
//                 ))}
//               </Row>
//             </div>
//           </div>
//           <div className="col-lg-6 mt-3">
//             <h3
//               style={{ borderRight: "5px solid orange", color: "#333" }}
//               className="p-2"
//             >
//               معرض الاعمال:
//             </h3>

//             <Row className="g-3 mb-3 mt-3">
//               <Col md={4}>
//                 <img
//                   src={require("../../Assest/a_macro_shot_of_intricate_hand_carved_floral_patterns_on_a_piece.png")}
//                   className="img-fluid rounded"
//                   alt=""
//                   style={{ height: "200px", objectFit: "cover", width: "100%" }}
//                 />
//               </Col>
//               <Col md={4}>
//                 <img
//                   src={require("../../Assest/a_modern_minimalist_custom_built_in_wooden_bookshelf_with_integrated.png")}
//                   className="img-fluid rounded"
//                   alt=""
//                   style={{ height: "200px", objectFit: "cover", width: "100%" }}
//                 />
//               </Col>
//               <Col md={4}>
//                 <img
//                   src={require("../../Assest/a_high_end_detailed_close_up_of_a_luxury_dark_oak_wooden_table_surface.png")}
//                   className="img-fluid rounded"
//                   alt=""
//                   style={{ height: "200px", objectFit: "cover", width: "100%" }}
//                 />
//               </Col>
//             </Row>

//             <Row className="g-3">
//               <Col md={8}>
//                 <img
//                   src={require("../../Assest/a_luxurious_modern_dark_wood_kitchen_island_with_a_white_marble.png")}
//                   className="img-fluid rounded"
//                   alt=""
//                   style={{ height: "300px", objectFit: "cover", width: "100%" }}
//                 />
//               </Col>
//               <Col md={4}>
//                 <img
//                   src={require("../../Assest/a_beautifully_restored_vintage_wooden_classic_chair_standing_alone.png")}
//                   className="img-fluid rounded"
//                   alt=""
//                   style={{ height: "300px", objectFit: "cover", width: "100%" }}
//                 />
//               </Col>
//             </Row>
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// }

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  faCheck,
  faLocationDot,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faBriefcaseClock } from "@fortawesome/free-solid-svg-icons/faBriefcaseClock";
import { useParams } from "react-router-dom";
import {
  byCraftmen,
  CraftsmanAvailabilities,
  CraftsMen,
  ReputationControls,
  Services,
} from "../../Api/Api";
import { Axios } from "../../Api/Axois";
import { renderStars } from "../../Helpers/Renderstart";
import Transform from "../../Helpers/Transform";
import { Days } from "../../Helpers/Days";
import { number } from "yup";

export default function Details() {
  const [reputationControls, setReputationControls] = useState([]);
  const [services, setServices] = useState([]);
  const [man, setMan] = useState(null);
  const [schedules, setSchedules] = useState([]);

  const id = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [manRes, servicesRes, controlRes, schedulesRes] =
          await Promise.all([
            Axios.get(`${CraftsMen}/${id.id}`),
            Axios.get(`${Services}/${byCraftmen}/${id.id}`),
            Axios.get(`${ReputationControls}/${byCraftmen}/${id.id}`),
            Axios.get(`${CraftsmanAvailabilities}/${byCraftmen}/${id.id}`),
          ]);
        setMan(manRes.data);
        setServices(servicesRes.data);
        setReputationControls(controlRes.data);
        setSchedules(schedulesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    console.log(schedules);
    fetchData();
  }, [id.id]);

  if (!man) {
    return <div className="text-center py-5">جاري التحميل...</div>;
  }

  return (
    <div className="bg-light" style={{ direction: "rtl" }}>
      <Container className="py-5">
        <Row>
          <Col lg={6}>
            <div className="d-flex align-items-start justify-content-start gap-3 flex-wrap flex-sm-nowrap">
              <img
                className="rounded shadow-sm"
                src={
                  man.account?.person?.imagePath
                    ? require(`../../Assest/${man.account?.person?.imagePath}`)
                    : null
                }
                alt="Profile"
                style={{ width: "180px", height: "180px", objectFit: "cover" }}
              />
              <div className="mt-2 text-primary fw-bold w-100">
                <h2 className="fw-bold text-dark">
                  {man.account?.person?.firstName}{" "}
                  {man.account?.person?.lastName}
                </h2>

                <div className="mt-2 d-flex gap-1">
                  <h5>{renderStars(5)}</h5>
                </div>

                <div className="text-muted mt-2 small">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    size="lg"
                    color="orange"
                    className="ms-1"
                  />
                  {man.account?.person?.city?.cityName}،{" "}
                  {man.account?.person?.address}
                </div>

                <div className="d-flex gap-2 flex-wrap">
                  <div className="mt-2 bg-white border py-1 px-3 rounded-pill shadow-sm small text-dark">
                    {man.craft?.craftName}
                  </div>
                  <div className="mt-2 bg-white border py-1 px-3 rounded-pill shadow-sm small">
                    {man.isVerified ? (
                      <span className="text-success fw-bold">
                        موثوق <FontAwesomeIcon icon={faCheck} color="green" />
                      </span>
                    ) : (
                      <span className="text-danger fw-bold">
                        لم يتم التوثيق{" "}
                        <FontAwesomeIcon icon={faTimes} color="red" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="card mt-4 p-4 shadow-sm border-0">
              <h4
                style={{ borderRight: "4px solid orange", color: "#333" }}
                className="pe-2 fs-5 fw-bold mb-3"
              >
                نبذة عن الحرفي:
              </h4>
              <p className="text-muted" style={{ lineHeight: "28px" }}>
                {man.bio}
              </p>

              <div className="mt-3 mb-3">
                <div className="d-flex align-items-center text-dark mb-2">
                  <FontAwesomeIcon
                    className="ms-2"
                    icon={faBriefcaseClock}
                    size="lg"
                    color="orange"
                  />
                  <span className="fw-bold ">أوقات وساعات الدوام:</span>
                </div>

                {schedules.length === 0 ? (
                  <p className="text-muted small ps-4">
                    لم يتم تحديد مواعيد دوام بعد.
                  </p>
                ) : (
                  schedules.map((schedule) => (
                    <div className="ps-4">
                      <div className="d-flex justify-content-between align-items-center py-1 border-bottom  text-muted">
                        <span className="fw-bold text-dark">
                          {Days[schedule.dayOfWeek || schedule.day]}
                        </span>
                        <span>
                          من الساعة {schedule.startTime} إلى {schedule.endTime}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <Row className="g-2 text-center mt-3">
                <Col xs={4}>
                  <div className="p-2 rounded-3 shadow-sm bg-white border-start border-4 border-warning">
                    <span className="text-muted d-block ">سنوات الخبرة</span>
                    <span className="fw-bold text-primary fs-5">
                      {man.experienceYears}+
                    </span>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="p-2 rounded-3 shadow-sm bg-white border-start border-4 border-warning">
                    <span className="text-muted d-block ">رقم الهاتف</span>
                    <span className="fw-bold text-secondary fs-5">
                      {man.account?.person?.phone}
                    </span>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="p-2 rounded-3 shadow-sm bg-white border-start border-4 border-warning">
                    <span className="text-muted d-block ">انضم منذ</span>
                    <span className="fw-bold text-secondary fs-5">
                      {Transform(man.registrationDate)}
                    </span>
                  </div>
                </Col>
              </Row>
            </div>

            <div className="mt-4 card p-4 shadow-sm border-0">
              <h4
                style={{ borderRight: "4px solid orange", color: "#333" }}
                className="pe-2 fs-5 fw-bold mb-3"
              >
                أبرز الخدمات:
              </h4>
              <Row className="g-3">
                {services.map((service) => (
                  <Col md={6} key={service.id}>
                    <div className="h-100 rounded-3 p-3 shadow-sm bg-white border-start border-4 border-warning">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="fw-bold text-primary mb-0">
                          {service?.title}
                        </h6>
                        <span className="text-danger small fw-bold text-nowrap">
                          {service?.startingPrice} ل.س
                        </span>
                      </div>
                      <p
                        className="text-muted small mb-0"
                        style={{ fontSize: "13px" }}
                      >
                        {service?.description}
                      </p>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>

          <Col lg={6} className="mt-3 mt-lg-0">
            <div className="card p-4 shadow-sm border-0 h-100">
              <h4
                style={{ borderRight: "4px solid orange", color: "#333" }}
                className="pe-2 fs-5 fw-bold mb-3"
              >
                معرض الأعمال:
              </h4>

              {services.length === 0 ? (
                <p className="text-muted text-center py-5">
                  لا توجد أعمال معروضة حالياً.
                </p>
              ) : (
                <Row className="g-3">
                  {services.map((service, index) => {
                    if (!service?.imagePath && !service?.imageUrl) return null;

                    return (
                      <Col md={6} key={index}>
                        <div className="position-relative overflow-hidden rounded shadow-sm border">
                          <img
                            src={require(
                              `../../Assest/${service.imagePath || service.imageUrl}`,
                            )}
                            className="img-fluid w-100"
                            alt={service.title || "عمل سابق"}
                            style={{
                              height: "220px",
                              objectFit: "cover",
                              transition: "transform 0.3s ease",
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.transform = "scale(1.05)")
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.transform = "scale(1)")
                            }
                          />
                          <div
                            className="w-100 p-2 text-white small text-center"
                            style={{
                              background: "rgba(0, 0, 0, 0.6)",
                              position: "absolute",
                              bottom: 0,
                            }}
                          >
                            {service.title}
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
