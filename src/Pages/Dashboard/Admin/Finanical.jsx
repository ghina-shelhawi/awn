import React, { useState, useEffect } from "react";
import {
  Table,
  Card,
  Button,
  Container,
  Form,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";

import { LedgerEntries } from "../../../Api/Api";
import { Axios } from "../../../Api/Axois";
import Transform from "../../../Helpers/Transform";

// import TransactionModal from "./TransactionModal";
export default function Finanical() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("الكل");

  const [showModal, setShowModal] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);

  useEffect(() => {
    Axios.get(`${LedgerEntries}`)
      .then((data) => {
        setTransactions(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching financial dashboard:", err);
        setError("فشل تحميل البيانات المالية. يرجى التحقق من اتصالك بالسيرفر.");
        setLoading(false);
      });
  }, []);

  const filteredTransactions = transactions.filter((t) => {
    const type = t.type || "";
    const userName = `${t.account.person.firstName}${` `}${t.account.person.lastName}`;
    const matchesSearch =
      userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterType === "الكل" || t.type === filterType;

    return matchesSearch && matchesFilter;
  });

  const totalRevenue = filteredTransactions.reduce(
    (acc, t) => acc + parseFloat(t.amount || 0),
    0,
  );
  const commissionCount = filteredTransactions.filter(
    (t) => t.type === "Commission" || t.type === "دفع",
  ).length;

  const handleOpenDetails = (id) => {
    setSelectedTransactionId(id);
    setShowModal(true);
  };

  return (
    <Container className="my-5" dir="rtl">
      <div className="d-flex justify-content-between align-items-center mb-3 pb-3">
        <div>
          <h2 className="text-dark fw-bold">الرقابة والتقارير المالية</h2>
          <p className="text-muted mb-0">
            مراقبة حركات الخزينة وسجلات التدقيق لمنصة عون للخدمات
          </p>
        </div>
      </div>

      <Row className="mb-1">
        <Col md={4} sm={12} className="mb-3">
          <Card className="text-white bg-primary shadow-sm border-0 h-100">
            <Card.Body className="d-flex flex-column align-items-center justify-content-center py-4">
              <Card.Title className="fs-6 opacity-75">
                إجمالي المبالغ المتداولة
              </Card.Title>
              <Card.Text className="fs-3 fw-bold mt-2">
                {totalRevenue.toLocaleString()} ل.س
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={12} className="mb-3">
          <Card className="text-white bg-success shadow-sm border-0 h-100">
            <Card.Body className="d-flex flex-column align-items-center justify-content-center py-4">
              <Card.Title className="fs-6 opacity-75">
                العمليات الحالية المعروضة
              </Card.Title>
              <Card.Text className="fs-3 fw-bold mt-2">
                {filteredTransactions.length} عملية
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={12} className="mb-3">
          <Card className="text-white bg-warning shadow-sm border-0 h-100">
            <Card.Body className="d-flex flex-column align-items-center justify-content-center py-4">
              <Card.Title className="fs-6 opacity-75">
                إجمالي عمليات الاقتطاع (العمولة)
              </Card.Title>
              <Card.Text className="fs-3 fw-bold mt-2">
                {commissionCount} عمولة
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm  border-0 bg-light">
        <Card.Body>
          <Row className="align-items-end">
            <Col md={8} className=" ">
              <Form.Group controlId="search">
                <Form.Label className="fw-semibold text-secondary">
                  البحث السريع
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ابحث باسم المستخدم، رقم السجل..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="filter">
                <Form.Label className="fw-semibold text-secondary">
                  تصنيف العمليات
                </Form.Label>
                <Form.Select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="الكل">كل الحركات</option>
                  <option value="commission">عمولة المنصة </option>
                  <option value="Payment">عمليات الدفع الإلكتروني</option>
                  <option value="Deposit">إيداع رصيد </option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="shadow-sm border-0">
        <Card.Body className="p-0">
          {loading ? (
            <div className="text-center mt-5">
              <Spinner animation="border" variant="warning" />
              <p className="mt-2 text-muted">
                جاري تحميل سجلات الخزينة من قاعدة البيانات...
              </p>
            </div>
          ) : error ? (
            <div className="alert alert-danger m-3 text-center">{error}</div>
          ) : filteredTransactions.length === 0 ? (
            <div className="text-center my-5">
              <p className="text-muted fs-5">
                لا تتوفر أي سجلات مالية مطابقة لخيارات البحث الحالية.
              </p>
            </div>
          ) : (
            <Table
              striped
              hover
              border={2}
              responsive
              className="mb-0 text-center align-middle"
            >
              <thead className="table-primary">
                <tr>
                  <th>رقم القيد</th>
                  <th>تاريخ العملية</th>
                  <th>صاحب العملية</th>
                  <th>نوع العملية</th>
                  <th>القيمة المالية</th>
                  <th>الرقابة والتدقيق</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((t) => (
                  <tr key={t.ledgerEntryID}>
                    <td className="fw-bold">#{t.ledgerEntryID}</td>
                    <td>{Transform(t.createdAt)}</td>
                    <td className="fw-semibold text-primary">
                      {t.account?.person.firstName}
                      {` `}
                      {t.account?.person.lastName}
                    </td>
                    <td>
                      <span
                        className={`badge px-3 py-2 ${
                          t.Type === "Commission"
                            ? "bg-warning text-dark"
                            : t.type === "Payment"
                              ? "bg-success"
                              : t.type === "Deposit"
                                ? "bg-secondary"
                                : "bg-info"
                        }`}
                      >
                        {t.type}
                      </span>
                    </td>
                    <td className="text-dark fw-bold">
                      {parseFloat(t.amount).toLocaleString()} ل.س
                    </td>
                    <td>
                      <Button
                        size="sm"
                        className="fw-bold bg-danger border-0"
                        onClick={() => handleOpenDetails(t.LedgerEntryID)}
                      >
                        تفاصيل
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* استدعاء المودال وتمرير ID المعاملة المحددة حالياً */}
      {/* <TransactionModal
        show={showModal}
        onHide={() => setShowModal(false)}
        transactionId={selectedTransactionId}
      /> */}
    </Container>
  );
}
