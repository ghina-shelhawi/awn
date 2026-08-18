// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Spinner, Table } from 'react-bootstrap';
// import axios from 'axios';

// const TransactionModal = ({ show, onHide, transactionId }) => {
//   const [loading, setLoading] = useState(false);
//   const [details, setDetails] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (show && transactionId) {
//       setLoading(true);
//       setError(null);

//     //   axios.get(/api/admin/transactions/${transactionId})
//     //     .then((response) => {
//           setDetails(response.data);
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.error("Error fetching transaction details:", err);
//           setError("حدث خطأ أثناء جلب تفاصيل السجل المالي.");
//           setLoading(false);
//         });
//     }
//   }, [show, transactionId]);

//   return (
//     <Modal show={show} onHide={onHide} centered size="lg" dir="rtl">
//       <Modal.Header closeButton className="bg-light">
//         <Modal.Title className="fw-bold text-dark">تفاصيل سجل العملية (TransactionLog)</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         {loading && (
//           <div className="text-center my-4">
//             <Spinner animation="border" variant="warning" />
//             <p className="mt-2 text-muted">جاري تحميل سجل التدقيق من قاعدة البيانات...</p>
//           </div>
//         )}

//         {error && <div className="alert alert-danger text-center">{error}</div>}

//         {!loading && !error && details && (
//           <div>
//             <h5 className="mb-3 text-primary fw-bold">معلومات الحركة المالية (LedgerEntry):</h5>
//             <Table bordered hover responsive size="sm" className="mb-4 text-right">
//               <tbody>
//                 <tr>
//                   <th style={{ width: '30%' }}>رقم القيد (LedgerID)</th>
//                   <td>#{details.LedgerEntryID}</td>
//                 </tr>
//                 <tr>
//                   <th>الحساب المعني</th>
//                   <td>{details.account?.user_name || 'غير معروف'}</td>
//                 </tr>
//                 <tr>
//                   <th>المبلغ الإجمالي</th>
//                   <td className="text-success fw-bold">{parseFloat(details.Amount).toLocaleString()} ر.س / ل.س</td>
//                 </tr>
//                 <tr>
//                   <th>النوع</th>
//                   <td><span className="badge bg-secondary">{details.Type}</span></td>
//                 </tr>
//                 <tr>
//                   <th>الوصف المالي</th>
//                   <td>{details.Description || 'لا يوجد وصف'}</td>
//                 </tr>
//                 <tr>
//                   <th>تاريخ القيد</th>
//                   <td>{new Date(details.CreatedAt).toLocaleString('ar-SY')}</td>
//                 </tr>
//               </tbody>
//             </Table>

//             <h5 className="mb-3 text-warning fw-bold">سجل تدقيق النظام الإجرائي (TransactionLog):</h5>
//             {details.transaction_log ? (
//               <Table bordered hover responsive size="sm" className="text-right">
//                 <tbody>
//                   <tr>
//                     <th style={{ width: '30%' }}>رقم السجل (LogID)</th>
//                     <td>#{details.transaction_log.LogID}</td>
//                   </tr>
//                   <tr>
//                     <th>الإجراء المتخذ (Action)</th>
//                     <td className="fw-bold text-danger">{details.transaction_log.Action}</td>
//                   </tr>
//                   <tr>
//                     <th>الأدمن المسؤول</th>
//                     <td>{details.transaction_log.PerformedByAdminID ? أدمن`${details.transaction_log.PerformedByAdminID}` : 'نظام تلقائي'}</td>
//                   </tr>
//                   <tr>
//                     <th>ملخص التغيير (ChangeSummary)</th>
//                     <td>{details.transaction_log.ChangeSummary}</td>
//                     </tr>
//                   <tr>
//                     <th>توقيت التسجيل بدقة</th>
//                     <td>{new Date(details.transaction_log.Timestamp).toLocaleString('ar-SY')}</td>
//                   </tr>
//                 </tbody>
//               </Table>
//             ) : (
//               <div className="alert alert-info py-2 text-center">
//                 لا توجد قيود تدقيق (Logs) إضافية مسجلة لهذه العملية.
//               </div>
//             )}
//           </div>
//         )}
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onHide}>إغلاق</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default TransactionModal;
