import {
  faClipboardList,
  faStar,
  faTriangleExclamation,
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
} from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { Axios } from "../../../Api/Axois";
import { Accounts, Reviews } from "../../../Api/Api";
import { toast } from "react-toastify";

export default function Orderreview() {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  const [ratingFilter, setRatingFilter] = useState("All");
  const [craftmenNames, setCraftmenNames] = useState({});
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await Axios.get(`${Reviews}`);
        setReviews(res.data);
        setLoading(false);

        res.data.forEach(async (c) => {
          const accId = c.serviceRequest?.assignedCraftMan?.accountID;
          if (accId && !craftmenNames[accId]) {
            try {
              const userRes = await Axios.get(`${Accounts}/${accId}`);
              const p = userRes.data.person;
              if (p) {
                setCraftmenNames((prev) => ({
                  ...prev,
                  [accId]: `${p.firstName} ${p.lastName}`,
                }));
              }
            } catch (err) {
              console.error(err);
            }
          }
        });
      } catch (err) {
        setLoading(false);
        toast.error("فشل جلب البيانات");
      }
    };
    fetchData();
  }, [reload]);
  const deletereview = async (id) => {
    try {
      await Axios.delete(`${Reviews}/${id}`);
      toast.success("تم الحذف بنجاح");
      setReload((prev) => prev + 1);
    } catch {
      toast.error("فشل الحذف");
    }
  };
  const stats = useMemo(
    () => ({
      total: reviews.length,
      good: reviews.filter((c) => c.rating >= 3).length,
      bad: reviews.filter((c) => c.rating < 3).length,
    }),
    [reviews],
  );
  const filteredReviews = useMemo(() => {
    return reviews.filter((c) => {
      if (ratingFilter === "good") return reviews && c.rating >= 3;
      if (ratingFilter === "bad") return reviews && c.rating < 3;
      return reviews;
    });
  }, [reviews, ratingFilter]);
  return (
    <Container className="py-4 mt-4">
      <div className="d-flex align-items-center gap-2 mb-4">
        <FontAwesomeIcon
          icon={faStar}
          size="xl"
          className="text-warning mb-3"
        />
        <div>
          <h2 className="mb-1 fw-bold">تقييمات الطلبات</h2>
          <p className="text-muted m-0">
            متابعة ومراجعة تقييمات المستخدمين لضمان جودة الخدمة
          </p>
        </div>
      </div>
      <Row className="mb-4">
        {[
          {
            title: "إجمالي التقييمات:",
            count: stats.total,
            color: "primary",
            icon: faClipboardList,
          },
          {
            title: "التقييمات الجيدة:",
            count: stats.good,
            color: "success",
            icon: faStar,
          },
          {
            title: "التقييمات السيئة:",
            count: stats.bad,
            color: "danger",
            icon: faTriangleExclamation,
          },
        ].map((item, idx) => (
          <Col md={4} key={idx}>
            <Card className="border-0 shadow-sm p-3 border-end border-4 border-warning text-center bg-white">
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
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h5 className="fw-bold text-primary mb-3">سجل التقييمات</h5>

          <div className="col-md-3">
            <Form.Select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
            >
              <option value="All">كل التقييمات</option>
              <option value="good">التقييمات الجيدة (3+)</option>
              <option value="bad">التقييمات السيئة (&lt;3)</option>
            </Form.Select>
          </div>
        </div>
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="warning" />
            <p className="mt-2 text-muted">جاري تحميل البيانات...</p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="text-center my-5">
            <p className="text-muted fs-5">لاتتوفر اي تقييمات مطابقة</p>
          </div>
        ) : (
          <Card className="border-0 shadow-sm">
            <Table
              hover
              responsive
              border={2}
              striped
              className="mb-0 align-middle"
            >
              <thead className="table-primary">
                <tr>
                  <th>الطلب</th>
                  <th>المستخدم الذي قيم</th>
                  <th>الحرفي</th>
                  <th>الوصف</th>
                  <th>التقييم</th>
                  <th className="text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredReviews.map((c) => {
                  const craftManId =
                    c.serviceRequest?.assignedCraftMan?.accountID;
                  return (
                    <tr key={c.reviewID}>
                      <td>{c.serviceRequest?.description}</td>
                      <td>
                        {c.serviceRequest?.account?.person?.firstName}{" "}
                        {c.serviceRequest?.account?.person?.lastName}
                      </td>
                      <td>
                        {craftManId && craftmenNames[craftManId]
                          ? craftmenNames[craftManId]
                          : "جاري التحميل..."}
                      </td>
                      <td
                        className="text-truncate"
                        style={{ maxWidth: "200px" }}
                      >
                        {c.comment}
                      </td>
                      <td className="text-center ">{c.rating}</td>
                      <td className="text-center">
                        <Trash
                          className="me-1 text-danger"
                          style={{ cursor: "pointer", fontSize: "20px" }}
                          onClick={() => deletereview(c.reviewID)}
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
    </Container>
  );
}
