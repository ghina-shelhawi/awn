import { useContext, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Table,
  Card,
  Row,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 
  faPencil,
  faTrash,
  faPaperPlane,
  faFile,
  faCheckCircle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { Axios } from "../../Api/Axois";
import { byCraftmen, RequestOffers, ServiceRequests } from "../../Api/Api";
import OfferModal from "../../Components/Dashboard/OfferModal";

import { formatDate, formatTimeOnly } from "../../Helpers/Data";

import { AuthContext } from "../../Context/AuthContext";

export default function MyOffers() {
  const [offers, setOffers] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedId, setselectedId] = useState("");
  const [selectoffer, setselectoffer] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [craft, setcraft] = useState("");
  const [reload, setreload] = useState(0);
  
  const { user } = useContext(AuthContext);
  const Craftname = user.craftManID;
  console.log(Craftname);
  useEffect(() => {
    async function fetchCombinedData() {
      try {
        const [offersRes, requestsRes] = await Promise.all([
          Axios.get(`${RequestOffers}/${byCraftmen}/${Craftname}`),
          Axios.get(`${ServiceRequests}`),
        ]);

        const merged = offersRes.data.map((offer) => {
          const request = requestsRes.data.find(
            (req) => req.requestID === offer.requestID,
          );
          return {
            ...offer,
            serviceDetails: request || { description: "طلب غير موجود" },
          };
        });

        setOffers(merged);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchCombinedData();
  }, [reload]);
  async function handledelete(id) {
    await Axios.delete(`${RequestOffers}/${id}`);
    setreload((prev) => prev + 1);
  }
  
  const filteredOffers = offers.filter((o) =>
    filter === "All" ? true : o.status === filter,
  );

  return (
    <Container className="my-5">
      <div className="d-flex align-items-center mb-4 gap-2">
        <FontAwesomeIcon
          icon={faPaperPlane}
          size="xl"
          className="mb-3"
          color="orange"
        />
        <div>
          <h2 className="fw-bold text-dark">عروضي المقدمة:</h2>
          <p className="small text-muted m-0">
            كل العروض التي تمت تقدمتها للعملاء
          </p>
        </div>
      </div>

      <Row className="mb-2">
        {[
          {
            label: "إجمالي العروض:",
            value: offers.length,
            icon: faFile,
            color: "primary",
          },
          {
            label: "قيد الانتظار:",
            value: offers.filter((o) => o.status === "pending").length,
            icon: faSpinner,
            color: "warning",
          },
          {
            label: "عروض مقبولة:",
            value: offers.filter((o) => o.status === "Accepted").length,
            icon: faCheckCircle,
            color: "success",
          },
        ].map((item, index) => (
          <Col md={4} key={index}>
            <Card className="border-0 shadow-sm p-3 mb-3 border-0 border-end border-4 border-warning">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-dark   fw-bold">{item.label}</div>
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
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold text-primary">إدارة العروض</h5>
          <div className="d-flex gap-2">
            <Button
              variant={filter === "All" ? "primary" : "light"}
              className="border"
              onClick={() => setFilter("All")}
            >
              الكل
            </Button>
            <Button
              variant={filter === "pendind" ? "primary" : "light"}
              className="border"
              onClick={() => setFilter("pendind")}
            >
              قيد الانتظار
            </Button>
            <Button
              variant={filter === "Accepted" ? "primary" : "light"}
              className="border"
              onClick={() => setFilter("Accepted")}
            >
              مقبولة
            </Button>
          </div>
        </div>

        <Table
          hover
          striped
          border={2}
          responsive
          className="mt-2 align-middle"
        >
          <thead className="table-primary">
            <tr>
              <th>تفاصيل الطلب</th>
              <th>السعر المقترح</th>
              <th>التاريخ المقترح</th>
              <th>الوقت المقترح</th>
              <th>الحالة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredOffers.map((offer) => (
              <tr key={offer.offerID}>
                <td>{offer.serviceDetails?.description}</td>

                <td>{offer.proposedPrice} ل.س</td>
                <td>{formatDate(offer.proposedTime)}</td>
                <td>{formatTimeOnly(offer.proposedTime)}</td>
                <td>
                  <Badge
                    bg={offer.status === "Accepted" ? "success" : "warning"}
                  >
                    {offer.status}
                  </Badge>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <FontAwesomeIcon
                      size="lg"
                      icon={faPencil}
                      color="orange"
                      onClick={() => {
                        setIsModalOpen(true);
                        setcraft(offer.craftManID);
                        setselectedId(offer.requestID);
                        setselectoffer(offer.offerID);
                      }}
                    />
                    <FontAwesomeIcon
                      size="lg"
                      icon={faTrash}
                      onClick={() => handledelete(offer.offerID)}
                      className="text-danger"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <OfferModal
        isOpen={isModalOpen}
        requestId={selectedId}
        craftManID={craft}
        onClose={() => setIsModalOpen(false)}
        refreshreload={() => setreload((prev) => prev + 1)}
        initialData={selectoffer}
      />
    </Container>
  );
}
