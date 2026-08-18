import React, { useEffect, useState } from "react";
import {
  Table,
  Badge,
  Button,
  Form,
  Col,
  Row,
  InputGroup,
  Container,
  Card,
} from "react-bootstrap";
import {
  PersonPlus,
  Search,
  ToggleOff,
  ToggleOn,
  Eye,
} from "react-bootstrap-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faUserGear,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import AddOrEditCraftsmanModal from "../../../Components/Dashboard/Admin/Addoreditcraftman";
import CraftsmanDetailsModal from "../../../Components/Dashboard/Admin/CraftsmanDetailsModal";
import { Axios } from "../../../Api/Axois";
import {
  Accounts,
  active,
  Crafts,
  CraftsMen,
  verification,
} from "../../../Api/Api";
import { toast } from "react-toastify";

export default function CraftsmanManagement() {
  const [craftsmen, setCraftsmen] = useState([]);
  const [craft, setcrafts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCraftsman, setSelectedCraftsman] = useState(null);
  const [reload, setreload] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfession, setSelectedProfession] = useState("الكل");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [craftsRes, categoriesRes] = await Promise.all([
          Axios.get(`${CraftsMen}`),
          Axios.get(`${Crafts}`),
        ]);
        setCraftsmen(craftsRes.data);
        setcrafts(categoriesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [reload]);

  async function toggleVerification(id, currentStatus) {
    try {
      await Axios.patch(`${CraftsMen}/${id}/${verification}`, {
        isVerified: !currentStatus,
      });
      toast.success("تم تحديث حالة التوثيق بنجاح");
      setreload((prev) => prev + 1);
    } catch (error) {
      toast.error("فشل تحديث حالة التوثيق");
    }
  }

  async function toggleActiveStatus(accountId, currentStatus) {
    try {
      await Axios.patch(`${Accounts}/${accountId}/${active}`, {
        isActive: !currentStatus,
      });
      toast.success("تم تحديث حالة تفعيل الحساب بنجاح");
      setreload((prev) => prev + 1);
    } catch (error) {
      toast.error("فشل تحديث حالة تفعيل الحساب");
    }
  }

  const filteredCraftsmen = craftsmen.filter((c) => {
    const userName = `${c.account.person.firstName} ${c.account.person.lastName}`;
    const matchesSearch = userName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesProfession =
      selectedProfession === "الكل" || c.craft.craftName === selectedProfession;
    return matchesSearch && matchesProfession;
  });

  return (
    <>
      <Container fluid className="my-5">
        <div className="d-flex align-items-center gap-2 mb-4">
          <FontAwesomeIcon
            icon={faUserGear}
            color="orange"
            size="xl"
            className="fw-bold mb-3"
          />
          <div>
            <h2 className="fw-bold mb-1">إدارة الحرفيين:</h2>
            <p className="small text-muted m-0">
              تحكم في بيانات الحرفيين المعتمدين في منصة عون
            </p>
          </div>
        </div>

        <Row className="mb-2">
          {[
            {
              label: "عدد الحرفيين :",
              value: craftsmen.length,
              icon: faUserGear,
              color: "primary",
            },

            {
              label: "الحرفيين الموثقيين :",
              value: craftsmen.filter((o) => o.isVerified === true).length,
              icon: faCheckDouble,
              color: "success",
            },
            {
              label: "الحرفيين الغير موثقيين:",
              value: craftsmen.filter((o) => o.isVerified === false).length,
              icon: faTimes,
              color: "danger",
            },
          ].map((item, index) => (
            <Col md={4} key={index}>
              <Card className="border-0 shadow-sm p-3 mb-3 border-end border-4 border-warning">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="text-dark medium fw-bold">{item.label}</div>
                    <div className={`fs-4 fw-bold text-${item.color}`}>
                      {item.value}
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
          <Row className="mb-3">
            <div className="d-flex align-items-center  justify-content-between gap-3">
              <div className="d-flex gap-3">
                <Form.Select
                  size="md"
                  className="bg-light"
                  style={{ width: "150px" }}
                  onChange={(e) => setSelectedProfession(e.target.value)}
                >
                  <option value="الكل">كل المهن</option>
                  {craft.map((e, idx) => (
                    <option key={idx} value={e.craftName}>
                      {e.category}
                    </option>
                  ))}
                </Form.Select>

                <InputGroup size="md" style={{ width: "300px" }}>
                  <InputGroup.Text className="bg-light rounded-pill">
                    <Search size={14} />
                  </InputGroup.Text>
                  <Form.Control
                    className="bg-light rounded"
                    placeholder="بحث حسب الاسم ..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </div>
              <Button
                size="md"
                variant="warning"
                className="text-white px-3"
                onClick={() => {
                  setSelectedUserId(null);
                  setShowModal(true);
                }}
              >
                <PersonPlus className="me-1" /> إضافة
              </Button>
            </div>
          </Row>

          <div className="border bg-white rounded shadow-sm">
            <Table hover striped responsive className="align-middle mb-0">
              <thead className="table-primary">
                <tr>
                  <th>اسم الحرفي</th>
                  <th>المهنة</th>
                  <th>المحافظة</th>
                  <th>الحالة (توثيق)</th>
                  <th>سنوات الخبرة</th>
                  <th>رصيد المحفظة</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredCraftsmen.length > 0 ? (
                  filteredCraftsmen.map((c) => (
                    <tr key={c.id || c.craftManID}>
                      <td className="fw-bold">
                        {c.account.person.firstName} {c.account.person.lastName}
                      </td>
                      <td>{c.craft.craftName}</td>
                      <td>{c.account.person.city.cityName}</td>
                      <td>
                        <Badge bg={c.isVerified ? "success" : "danger"}>
                          {c.isVerified ? "موثق" : "غير موثق"}
                        </Badge>
                      </td>
                      <td>{c.experienceYears}+</td>
                      <td>{c.balance} ل.س</td>
                      <td>
                        <div className="d-flex fs-5 align-items-center gap-2 ms-2 ">
                          {c.isVerified ? (
                            <ToggleOn
                              onClick={() =>
                                toggleVerification(c.craftManID, c.isVerified)
                              }
                              className="text-success"
                              style={{ cursor: "pointer", fontSize: "24px" }}
                            />
                          ) : (
                            <ToggleOff
                              onClick={() =>
                                toggleVerification(c.craftManID, c.isVerified)
                              }
                              className="text-secondary"
                              style={{ cursor: "pointer", fontSize: "24px" }}
                            />
                          )}

                          <Button
                            size="sm"
                            variant={
                              c.account.isActive
                                ? "outline-success"
                                : "outline-danger"
                            }
                            onClick={() =>
                              toggleActiveStatus(
                                c.account.accountID,
                                c.account.isActive,
                              )
                            }
                          >
                            {c.account.isActive ? "نشط" : "غير نشط"}
                          </Button>

                          <Eye
                            onClick={() => {
                              setSelectedCraftsman(c);
                              setShowDetailsModal(true);
                            }}
                            className="text-primary"
                            style={{ cursor: "pointer" }}
                            title="عرض التفاصيل"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="text-center">
                    <td colSpan={7} className="fw-bold text-primary">
                      لا يوجد بيانات لعرضها
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>

        <AddOrEditCraftsmanModal
          show={showModal}
          userId={selectedUserId}
          handleClose={() => setShowModal(false)}
          onSaveSuccess={() => {
            setShowModal(false);
            setreload((prev) => prev + 1);
          }}
        />

        <CraftsmanDetailsModal
          show={showDetailsModal}
          craftsman={selectedCraftsman}
          handleClose={() => setShowDetailsModal(false)}
        />
      </Container>
    </>
  );
}
