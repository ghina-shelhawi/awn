import {
  faClipboardList,
  faCheckCircle,
  faHourglassHalf,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useMemo } from "react";
import {
  Container,
  Table,
  Card,
  Spinner,
  Row,
  Col,
  Form,
  InputGroup,
  Badge,
} from "react-bootstrap";
import { Trash, Search } from "react-bootstrap-icons";
import { Axios } from "../../../Api/Axois";
import { ServiceRequests } from "../../../Api/Api";
import { toast } from "react-toastify";
import OrderMapModal from "../../../Components/Dashboard/Admin/ModalMap";

export default function Manageorder() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [reload, setReload] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await Axios.get(ServiceRequests);
        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error("فشل جلب البيانات");
      }
    };
    fetchData();
  }, [reload]);
  const handleOpenMap = (lat, lng) => {
    setSelectedLocation({ lat, lng });
    setShowMapModal(true);
  };
  const deleteOrder = async (id) => {
    try {
      await Axios.delete(`${ServiceRequests}/${id}`);
      toast.success("تم الحذف بنجاح");
      setReload((prev) => prev + 1);
    } catch {
      toast.error("فشل الحذف");
    }
  };

  const stats = useMemo(() => {
    const total = orders.length;
    const assigned = orders.filter((c) => c.status === "Assigned").length;
    const unassigned = orders.filter((c) => c.status === "UnAssigned").length;
    const completed = orders.filter((c) => c.status === "completed").length;
    return { total, assigned, unassigned, completed };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((c) => {
      const clientName =
        `${c.account?.person?.firstName || ""} ${c.account?.person?.lastName || ""}`.toLowerCase();
      const craftManId = c.assignedCraftMan;
      const craftmanName = (
        craftManId !== null
          ? `${c.assignedCraftMan?.account?.person?.firstName || ""} ${c.assignedCraftMan?.account?.person?.lastName || ""}`
          : ""
      ).toLowerCase();

      const query = searchQuery.toLowerCase();
      const matchesSearch =
        clientName.includes(query) || craftmanName.includes(query);

      if (statusFilter !== "All" && c.status !== statusFilter) {
        return false;
      }

      return matchesSearch;
    });
  }, [orders, searchQuery, statusFilter]);

  return (
    <Container className="py-4 mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-2">
          <FontAwesomeIcon
            icon={faClipboardList}
            size="xl"
            className="text-warning mb-3"
          />
          <div>
            <h2 className="mb-1 fw-bold">إدارة الطلبات:</h2>
            <p className="text-muted m-0">
              متابعة ومراجعة كافة الطلبات في المنصة
            </p>
          </div>
        </div>
      </div>

      <Row className="mb-4">
        {[
          {
            title: "إجمالي الطلبات:",
            count: stats.total,
            color: "primary",
            icon: faClipboardList,
          },
          {
            title: "الطلبات المعينة:",
            count: stats.assigned,
            color: "info",
            icon: faCheckCircle,
          },
          {
            title: "الطلبات غير المعينة:",
            count: stats.unassigned,
            color: "danger",
            icon: faHourglassHalf,
          },
          {
            title: "الطلبات المكتملة :",
            count: stats.completed,
            color: "success",
            icon: faCheckCircle,
          },
        ].map((item, idx) => (
          <Col md={3} key={idx}>
            <Card className="border-0 shadow-sm p-3 border-end border-4 border-warning  ">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-dark fs-6 fw-bold">{item.title}</div>
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
        <div className="d-flex  align-items-center justify-content-between mb-3">
          <h5 className="fw-bold text-primary ">سجل الطلبات الكلي</h5>
          <div className="d-flex gap-2">
            <div className="">
              <InputGroup>
                <InputGroup.Text className="bg-white">
                  <Search className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  placeholder="بحث حسب اسم العميل أو الحرفي ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>
            </div>
            <div>
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">كل الحالات (عرض الكل)</option>
                <option value="Assigned">Assigned (معينة)</option>
                <option value="UnAssigned">UnAssigned (غير معينة)</option>
                <option value="completed">completed (مكتملة)</option>
              </Form.Select>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="warning" />
            <p className="mt-2 text-muted">جاري تحميل البيانات...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center my-5">
            <p className="text-muted fs-5">لاتتوفر اي طلبات مطابقة</p>
          </div>
        ) : (
          <Card className="border-0 shadow-sm">
            <Table
              hover
              border={2}
              responsive
              striped
              className="mb-0 align-middle"
            >
              <thead className="table-primary">
                <tr>
                  <th>الوصف</th>
                  <th>اسم العميل</th>
                  <th>الحرفي</th>
                  <th>حالة الطلب</th>
                  <th className="text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((c) => {
                  return (
                    <tr key={c.requestID || c.id}>
                      <td>{c.description}</td>
                      <td>
                        {c.account?.person?.firstName}{" "}
                        {c.account?.person?.lastName}
                      </td>
                      <td>
                        {c.assignedCraftMan !== null
                          ? `${c.assignedCraftMan.account.person.firstName} ${" "}${c.assignedCraftMan.account.person.lastName}`
                          : "لم يتم اختيار حرفي"}
                      </td>
                      <td>
                        <Badge
                          bg={
                            c.status === "Assigned"
                              ? "info"
                              : c.status === "UnAssigned"
                                ? "danger"
                                : c.status === "completed"
                                  ? "success"
                                  : "warning"
                          }
                        >
                          {c.status}
                        </Badge>
                      </td>
                      <td className="text-center">
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          className="text-secondary ms-3"
                          style={{ cursor: "pointer", fontSize: "18px" }}
                          title="عرض موقع المشكلة"
                          onClick={() =>
                            handleOpenMap(
                              c.locationLatitude,
                              c.locationLongitude,
                            )
                          }
                        ></FontAwesomeIcon>

                        <Trash
                          className="me-1 text-danger"
                          style={{ cursor: "pointer", fontSize: "20px" }}
                          title="حذف"
                          onClick={() => deleteOrder(c.requestID)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card>
        )}
      </div>
      <OrderMapModal
        show={showMapModal}
        handleClose={() => setShowMapModal(false)}
        location={selectedLocation}
      />
    </Container>
  );
}
