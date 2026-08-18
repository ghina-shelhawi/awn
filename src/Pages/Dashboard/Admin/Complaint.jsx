import {
  faClipboardList,
  faEnvelope,
  faSpinner,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Row,
  Table,
  Card,
  Spinner,
} from "react-bootstrap";
import { Eye, Trash } from "react-bootstrap-icons";
import { Axios } from "../../../Api/Axois";
import { Accounts, COmplaints } from "../../../Api/Api";
import { toast } from "react-toastify";

export default function Complaint() {
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [complaints, setcomplaint] = useState([]);
  const [error, setError] = useState(null);
  const [reload, setreload] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await Axios.get(`${COmplaints}`);
        const allComplaints = response.data;

        const complaintsWithCraftsman = await Promise.all(
          allComplaints.map(async (complaint) => {
            const craftManID =
              complaint.serviceRequest?.assignedCraftMan?.accountID;

            if (craftManID) {
              try {
                const craftResponse = await Axios.get(
                  `${Accounts}/${craftManID}`,
                );

                return { ...complaint, craftsmanDetails: craftResponse.data };
              } catch (err) {
                return { ...complaint, craftsmanDetails: null };
              }
            }
            return { ...complaint, craftsmanDetails: null };
          }),
        );

        setcomplaint(complaintsWithCraftsman);
        setLoading(false);
      } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
        setError(error);
      }
    };

    fetchData();
  }, [reload]);
  async function deletecomplaint(id) {
    try {
      await Axios.delete(`${COmplaints}/${id}`);
      toast.success("تم الحذف بنجاح");
      setreload((prev) => prev + 1);
    } catch (error) {
      toast.error(error);
    }
  }
  const stats = useMemo(
    () => ({
      total: complaints.length,
      pending: complaints.filter((c) => c.status === "pending").length,
      investigation: complaints.filter((c) => c.status === "Investigation")
        .length,
    }),
    [complaints],
  );

  const filteredComplaints = useMemo(() => {
    if (filter === "All") return complaints;
    return complaints.filter((c) => c.status === filter);
  }, [filter, complaints]);

  const getStatusBadge = (status) => {
    if (status === "pending")
      return (
        <Badge bg="warning" text="dark">
          جديدة
        </Badge>
      );
    if (status === "Investigation")
      return <Badge bg="primary">قيد المراجعة</Badge>;
    return <Badge bg="success">محلولة</Badge>;
  };

  return (
    <Container className="py-4 mt-4">
      <div className="mb-4">
        <div className="d-flex align-items-center gap-2 mb-2">
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            size="xl"
            className="mb-3 text-danger"
          />
          <div>
            <h2 className="mb-1 fw-bold">ادارة الشكاوي المستخدمين:</h2>

            <p className="text-muted m-0 ">
              متابعة ومراجعة بلاغات المستخدمين لضمان جودة الخدمة
            </p>
          </div>
        </div>
      </div>

      <Row className="mb-2">
        {[
          {
            title: "إجمالي الشكاوى:",
            count: stats.total,
            icon: faClipboardList,
            color: "primary",
          },
          {
            title: "الشكاوى الجديدة:",
            count: stats.pending,
            icon: faEnvelope,
            color: "warning",
          },
          {
            title: "قيد المراجعة:",
            count: stats.investigation,
            icon: faSpinner,
            color: "info",
          },
        ].map((item, idx) => (
          <Col md={4} key={idx}>
            <Card className="border-0 shadow-sm p-3 mb-3 border-0 border-end border-4 border-warning">
              <div className="d-flex justify-content-between align-items-center ">
                <div>
                  <div className="text-dark  fw-bold ">{item.title}</div>
                  <div className="fs-4 fw-bold text-danger">{item.count}</div>
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
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold text-primary">إدارة الشكاوي:</h5>
          <div className="d-flex gap-2">
            {["All", "pending", "investigation"].map((status) => (
              <Button
                key={status}
                variant={filter === status ? "primary" : "light"}
                onClick={() => setFilter(status)}
                className="border "
              >
                {status === "All"
                  ? "الكل"
                  : status === "pending"
                    ? "الجديدة"
                    : "قيد المراجعة"}
              </Button>
            ))}
          </div>
        </div>
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="warning" />
            <p className="mt-2 text-muted">
              جاري تحميل سجلات الشكاوي من قاعدة البيانات...
            </p>
          </div>
        ) : error ? (
          <div className="alert alert-danger m-3 text-center">{error}</div>
        ) : filteredComplaints.length === 0 ? (
          <div className="text-center my-5">
            <p className="text-muted fs-5">لاتتوفر اي شكاوي</p>
          </div>
        ) : (
          <Card Card className="border-0 shadow-sm">
            <Table
              hover
              border={2}
              responsive
              striped
              className="mb-0 align-middle "
            >
              <thead className="table-primary ">
                <tr>
                  <th>رقم الشكوى</th>
                  <th>المشتكي</th>
                  <th>الحرفي</th>
                  <th>الوصف</th>
                  <th>الحالة</th>
                  <th className="text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((c) => (
                  <tr key={c.complaintID}>
                    <td className="px-4 fw-bold text-primary">
                      #{c.complaintID}
                    </td>
                    <td>
                      {c.serviceRequest.account.person.firstName}
                      {` `}
                      {c.serviceRequest.account.person.lastName}
                    </td>
                    <td>
                      {c.craftsmanDetails.person.firstName}
                      {` `}
                      {c.craftsmanDetails.person.lastName}
                    </td>
                    <td className="text-truncate" style={{ maxWidth: "200px" }}>
                      {c.description}
                    </td>
                    <td>{getStatusBadge(c.status)}</td>
                    <td className="text-center ">
                      {c.status === "pending" && (
                        <Eye
                          className="ms-2"
                          color="green"
                          fontWeight={"bold"}
                          fontSize={"20px"}
                        />
                      )}

                      <Trash
                        className="me-1"
                        color="red"
                        fontWeight={"bold"}
                        fontSize={"20px"}
                        onClick={() => deletecomplaint(c.complaintID)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        )}
      </div>
    </Container>
  );
}
