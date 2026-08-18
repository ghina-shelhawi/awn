import React, { useState, useMemo, useEffect } from "react";
import { Trash, ToggleOn, ToggleOff } from "react-bootstrap-icons";
import {
  Table,
  Button,
  Form,
  Badge,
  Container,
  Col,
  Row,
  Card,
} from "react-bootstrap";
import AddUserModal from "../../../Components/Dashboard/Admin/Adduser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faListAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Axios } from "../../../Api/Axois";
import { Accounts } from "../../../Api/Api";
import Transform from "../../../Helpers/Transform";
import { toast } from "react-toastify";

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("All");
  const [user, setuser] = useState([]);
  const [selectuser, setselectuser] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [prev, setprev] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await Axios.get(`${Accounts}`);
      setuser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [prev]);

  const handleToggleActive = async (userId, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await Axios.patch(`${Accounts}/${userId}/active`, {
        isActive: newStatus,
      });

      setuser((prevUsers) =>
        prevUsers.map((u) =>
          u.accountID === userId ? { ...u, isActive: newStatus } : u,
        ),
      );
      toast.success("تم تغيير حالة المستخدم بنجاح");
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403) {
        toast.error("عذراً، ليس لديك صلاحية لتنفيذ هذا الإجراء (403)");
      } else {
        toast.error("حدث خطأ أثناء تغيير الحالة");
      }
    }
  };

  const filteredUsers = useMemo(() => {
    return user.filter((userItem) => {
      const isRegularUser =
        userItem.role === "user" || userItem.role === "Customer";
      const userName = `${userItem.person?.firstName || ""} ${
        userItem.person?.lastName || ""
      }`;

      const matchesSearch = userName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesStatus =
        filter === "All"
          ? true
          : filter === "Active"
            ? userItem.isActive === true
            : userItem.isActive === false;

      return isRegularUser && matchesSearch && matchesStatus;
    });
  }, [filter, searchTerm, user]);

  const stats = useMemo(() => {
    const regularUsers = user.filter(
      (e) => e.role === "user" || e.role === "Customer",
    );
    const total = regularUsers.length;
    const active = regularUsers.filter((c) => c.isActive === true).length;
    const suspended = regularUsers.filter((c) => c.isActive === false).length;
    return { total, active, suspended };
  }, [user]);

  return (
    <Container className="py-4">
      <div className="d-flex align-items-center gap-3 my-4">
        <FontAwesomeIcon
          icon={faUsers}
          size="xl"
          className="text-warning mb-3"
        ></FontAwesomeIcon>
        <div>
          <h2 className="fw-bold m-0">ادارة المستخدمين:</h2>
          <p className="text-muted m-0">
            ادارة وتحكم في المستخدمين الموجودين على المنصة
          </p>
        </div>
      </div>

      <Row className="mb-4 g-3">
        {[
          {
            title: "عدد المستخدمين:",
            count: stats.total,
            color: "primary",
            icon: faUsers,
          },
          {
            title: "المستخدمين الفعاليين:",
            count: stats.active,
            color: "success",
            icon: faCheckDouble,
          },
          {
            title: "المستخدمين المعلقين:",
            count: stats.suspended,
            color: "danger",
            icon: faListAlt,
          },
        ].map((item, idx) => (
          <Col md={4} key={idx}>
            <Card className="border-0 shadow-sm p-3 border-end border-4 border-warning h-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="fs-6 fw-bold mb-1">{item.title}</div>
                  <div className={`fs-4 fw-bold text-${item.color}`}>
                    {item.count}
                  </div>
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

      <div className="card shadow-sm border-0 p-3 rounded-3">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
          <div className="d-flex gap-2 align-items-center flex-wrap">
            <Button
              variant={filter === "All" ? "primary" : "outline-primary"}
              onClick={() => setFilter("All")}
            >
              الكل
            </Button>
            <Button
              variant={filter === "Active" ? "primary" : "outline-primary"}
              onClick={() => setFilter("Active")}
            >
              الفعال
            </Button>
            <Button
              variant={filter === "Suspended" ? "primary" : "outline-primary"}
              onClick={() => setFilter("Suspended")}
            >
              المعلق
            </Button>
            <Form.Control
              type="text"
              placeholder="ابحث بالاسم..."
              style={{ width: "250px" }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            className="bg-warning border-0 text-white fw-bold"
            onClick={() => {
              setShowModal(true);
              setselectuser("");
            }}
          >
            + اضافة مستخدم جديد
          </Button>
        </div>

        <div className="bg-white border rounded shadow-sm mt-4 overflow-hidden">
          <Table hover responsive striped className="mb-0 align-middle">
            <thead className="table-primary">
              <tr>
                <th>اسم المستخدم</th>
                <th>الايميل</th>
                <th>تاريخ الانضمام</th>
                <th>الحالة</th>
                <th className="text-center">الاجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((userItem) => (
                  <tr key={userItem.accountID || userItem.id}>
                    <td>
                      {userItem.person?.firstName} {userItem.person?.lastName}
                    </td>
                    <td>{userItem.person?.email}</td>
                    <td>{Transform(userItem.lastLoginDate)}</td>
                    <td>
                      <Badge
                        bg={userItem.isActive === true ? "success" : "danger"}
                      >
                        {userItem.isActive === true ? "فعال" : "معلق"}
                      </Badge>
                    </td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center align-items-center gap-3">
                        {userItem.isActive ? (
                          <ToggleOn
                            className="text-success"
                            style={{ cursor: "pointer", fontSize: "24px" }}
                            title="تعليق المستخدم"
                            onClick={() =>
                              handleToggleActive(
                                userItem.accountID,
                                userItem.isActive,
                              )
                            }
                          />
                        ) : (
                          <ToggleOff
                            className="text-secondary"
                            style={{ cursor: "pointer", fontSize: "24px" }}
                            title="تفعيل المستخدم"
                            onClick={() =>
                              handleToggleActive(
                                userItem.accountID,
                                userItem.isActive,
                              )
                            }
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-center">
                  <td colSpan={5} className="py-4 text-muted fw-bold">
                    لايوجد بيانات لعرضها
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>

      <AddUserModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onSaveSuccess={fetchUsers}
        selectuser={selectuser}
      />
    </Container>
  );
};

export default Users;
