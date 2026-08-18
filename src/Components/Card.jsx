import {
  faLocationDot,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons/faAnglesRight";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

export default function Card(props) {
  const nav = useNavigate();
  return (
    <div className="row row-cols-1 row-cols-sm-2  row-cols-lg-3 row-cols-md-2 g-2 ">
      {props.services.map((item) => (
        <div
          className="col d-flex justify-content-center"
          key={item.craftManID}
        >
          <div
            className="card shadow   "
            style={{
              borderRadius: "15px",
              overflow: "hidden ",
              width: "300px",
              background: "#fdfefe",
              maxWidth: "300px",
            }}
          >
            <img
              alt={item.title}
              src={
                item.account.person.imagePath !== ""
                  ? require(`../Assest/${item.account.person.imagePath}`)
                  : require("../Assest/pngtree-blue-user-icon-profile-and-account-vector-design-vector-sign-vector-png-image_46129432.jpg")
              }
              style={{
                objectFit: "cover",
                height: "270px",
              }}
            />
            <div className=" p-2 text-right">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex gap-2">
                  <p
                    className="text-muted fw-bold p-0 m-0"
                    style={{ fontSize: "13px" }}
                  >
                    <FontAwesomeIcon color=" orange" icon={faLocationDot} />
                    {`  `}
                    {item.account.person.city.cityName}
                  </p>
                  <p
                    className="text-muted fw-bold p-0 m-0"
                    style={{ fontSize: "13px" }}
                  >
                    <FontAwesomeIcon icon={faPhoneVolume} color="orange" />
                    {`  `}
                    {item.account.person.phone}
                  </p>
                </div>
                <Badge
                  bg="secondary"
                  className="px-2 py-1 fw-bold text-medium "
                >
                  {item.craft.craftName}
                </Badge>
              </div>

              <p
                className=" fw-bold mb-2 mt-1 me-1"
                style={{ color: "black", fontSize: "20px" }}
              >
                {item.account.person.firstName}
                {`  `}
                {item.account.person.lastName}
              </p>

              <button
                onClick={() => nav(`/details/${item.craftManID}`)}
                className="btn w-100 fw-bold  mt-2 py-2 bg-primary    "
                style={{
                  borderRadius: "8px",
                  color: "white",

                  fontSize: "14px",
                }}
              >
                <FontAwesomeIcon
                  icon={faAnglesRight}
                  size="lg"
                  className="ms-2 text-secondary "
                />
                التعرف على المزيد
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
