import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faBook,
  faClock,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Axios } from "../../Api/Axois";
import { accept, byrequest, RequestOffers } from "../../Api/Api";
import { useParams, useNavigate } from "react-router-dom";
import Transform from "../../Helpers/Transform";
import { toast } from "react-toastify";

export default function Offerservice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offer, setoffer] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(`/${RequestOffers}/${byrequest}/${id}`);
        setoffer(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleBooking = async (offerId) => {
    try {
      const res = await Axios.post(`/${RequestOffers}/${offerId}/${accept}`);
      toast.success("تم الحجز بنجاح!");
      nav("/myorder");
    } catch (error) {
      console.error(
        "Error during booking:",
        error.response?.data || error.message,
      );
      toast.error("حدث خطأ أثناء عملية الحجز، يرجى المحاولة مرة أخرى.");
    }
  };

  return (
    <div className="bg-light">
      <Container>
        <div className="text-center pt-5 mb-5">
          <h2 className="fw-bold fs-2">العروض الحالية</h2>
          <div className="mx-auto line"></div>
        </div>
        <div className="d-flex align-items-center trans flex-wrap mx-auto justify-content-around">
          {loading ? (
            <div className="text-center py-5 w-100">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">جاري التحميل...</span>
              </div>
            </div>
          ) : offer.length > 0 ? (
            offer.map((item) => (
              <div
                key={item.offerID}
                className="card transf rounded-4 shadow mb-5 bg-white border-0"
                style={{ width: "400px", height: "420px" }}
              >
                <div className="d-flex me-3 mt-3 gap-3">
                  <img
                    src={
                      item.craftsMan?.account?.person?.imagePath !== ""
                        ? require(
                            `../../Assest/${item.craftsMan?.account?.person?.imagePath}`,
                          )
                        : require("../../Assest/pngtree-blue-user-icon-profile-and-account-vector-design-vector-sign-vector-png-image_46129432.jpg")
                    }
                    className="rounded-4"
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                    }}
                    alt=""
                  />
                  <div>
                    <p className="fw-bold my-1">
                      {item.craftsMan?.account?.person?.firstName}{" "}
                      {item.craftsMan?.account?.person?.lastName}
                    </p>
                    <small
                      style={{ background: "#eee" }}
                      className="rounded-3 px-2 fw-bold"
                    >
                      4.9⭐️
                    </small>
                  </div>
                </div>
                <div className="d-flex m-3 align-items-center justify-content-between">
                  <div
                    style={{
                      background: "#eee",
                      borderRight: "4px solid orange",
                    }}
                    className="rounded-3"
                  >
                    <div className="p-3">
                      <div className="d-flex align-items-center gap-1">
                        <FontAwesomeIcon
                          color="orange"
                          icon={faMoneyCheckDollar}
                        ></FontAwesomeIcon>
                        <p className="m-0 text-primary fw-bold">
                          السعر المقترح:
                        </p>
                      </div>
                      <p className="mt-2 text-center mb-0 fw-bold text-danger">
                        {item.proposedPrice} ل.س
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      background: "#eee",
                      borderRight: "4px solid orange",
                    }}
                    className="rounded-3"
                  >
                    <div className="p-3">
                      <div className="d-flex align-items-center gap-1">
                        <FontAwesomeIcon
                          color="orange"
                          icon={faClock}
                        ></FontAwesomeIcon>
                        <p className="m-0 text-primary fw-bold">
                          الوقت المقترح:
                        </p>
                      </div>

                      <p className="mt-2 mb-0 fw-bold text-center text-danger">
                        {Transform(item.proposedTime)}{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    background: "#eee",
                    borderRight: "4px solid orange",
                  }}
                  className="rounded-3 p-3 mx-3 mt-2 align-items-center"
                >
                  <div className="fw-bold">ملاحظة:</div>
                  <small className="text-muted fw-bold">
                    {item.offerNote || "لا توجد ملاحظات"}
                  </small>
                </div>
                <div className="d-flex mx-3 mt-4 text-white align-items-center justify-content-evenly">
                  <div className="px-4  hover rounded bg-primary d-flex align-items-center">
                    <button
                      className="btn mb-1 text-white border-0 bg-transparent px-1 py-2 "
                      onClick={() => {
                        nav(`/details/${item.craftsMan?.craftManID}`);
                      }}
                    >
                      قراءة المزيد
                    </button>
                    <FontAwesomeIcon
                      icon={faAngleLeft}
                      size="lg"
                      color="orange"
                      className="mt-1 ms-2"
                    ></FontAwesomeIcon>
                  </div>
                  <div className="px-4 hover rounded bg-secondary text-white d-flex align-items-center">
                    <button
                      className="btn text-white mb-1 border-0 bg-transparent px-1 py-2 "
                      onClick={() => handleBooking(item.offerID)}
                    >
                      احجز الان
                    </button>
                    <FontAwesomeIcon
                      icon={faBook}
                      size="lg"
                      className="mt-1 ms-2"
                      color="#14213d"
                    ></FontAwesomeIcon>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="muted fs-4 text-center py-5"> لا يوجد عروض بعد</p>
          )}
        </div>
      </Container>
    </div>
  );
}
