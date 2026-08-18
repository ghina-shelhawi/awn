import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Spinner,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faWrench,
  faClipboardList,
  faCheckCircle,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../../Api/Axois";
import { Accounts, ServiceRequests } from "../../../Api/Api";

export default function DashboardHome() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [usersRes, ordersRes] = await Promise.all([
          Axios.get(`${Accounts}`),
          Axios.get(`${ServiceRequests}`),
        ]);

        setUsers(usersRes.data);
        setOrders(ordersRes.data);
      } catch (err) {
        console.error("فشل جلب بيانات لوحة التحكم:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const regularUsersCount = users.filter(
    (e) => e.role === "user" || e.role === "Customer",
  ).length;
  const craftmenCount = users.filter(
    (e) => e.role === "Craftsman" || e.role === "craftmen",
  ).length;
  const totalOrders = orders.length;
  const completedOrders = orders.filter((c) => c.status === "completed").length;

  const recentOrders = orders.slice(0, 5);

  if (loading) {
    return (
      <Container className="text-center py-5 mt-5">
        <Spinner animation="border" variant="warning" />
        <p className="mt-2 text-muted">جاري تحميل لوحة التحكم...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <div className="py-4">
        <h2 className="fw-bold ">لوحة التحكم الرئيسية:</h2>
        <p className="text-muted ">
          مرحباً بكِ مجدداً، نظرة عامة على نشاط منصة عون
        </p>
      </div>

      <Row className=" g-3">
        {[
          {
            title: "إجمالي المستخدمين:",
            count: regularUsersCount,
            color: "primary",
            icon: faUsers,
            path: "/dashboard/user",
          },
          {
            title: "الحرفيين النشطين:",
            count: craftmenCount,
            color: "success",
            icon: faWrench,
            path: "/dashboard/Allcraftsman",
          },
          {
            title: "إجمالي الطلبات:",
            count: totalOrders,
            color: "warning",
            icon: faClipboardList,
            path: "/dashboard/Awnorder",
          },
          {
            title: "الطلبات المكتملة:",
            count: completedOrders,
            color: "info",
            icon: faCheckCircle,
            path: "/dashboard/Awnorder",
          },
        ].map((item, idx) => (
          <Col md={3} key={idx}>
            <Card
              className="border-0 shadow-sm p-3 border-end border-4 border-warning   h-100"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(item.path)}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className=" fs-6 fw-bold mb-1">{item.title}</div>
                <div className={`fs-4 fw-bold text-${item.color}`}>
                  {item.count}
                </div>
                <div
                  className={`p-3 rounded-circle bg-${item.color}-subtle text-${item.color}`}
                >
                  <FontAwesomeIcon icon={item.icon} size="lg" />
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="g-4">
        <Col lg={12}>
          <div className="card shadow-sm border-0 p-3 rounded-3 mt-4 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold text-primary m-0">أحدث الطلبات الواردة</h5>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => navigate("/dashboard/Awnorder")}
              >
                عرض الكل <FontAwesomeIcon icon={faArrowLeft} className="ms-1" />
              </Button>
            </div>

            <Table hover responsive striped className="mb-0 align-middle ">
              <thead className="table-primary">
                <tr>
                  <th>رقم الطلب</th>
                  <th>اسم العميل</th>
                  <th>الوصف</th>
                  <th>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <tr key={order.requestID || order.id}>
                      <td>#{order.requestID || order.id}</td>
                      <td>
                        {order.account?.person?.firstName}{" "}
                        {order.account?.person?.lastName}
                      </td>
                      <td>{order.description}</td>
                      <td>
                        <span
                          className={`badge bg-${
                            order.status === "Assigned"
                              ? "info"
                              : order.status === "completed"
                                ? "success"
                                : "danger"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-3 text-muted">
                      لا توجد طلبات حديثة
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
