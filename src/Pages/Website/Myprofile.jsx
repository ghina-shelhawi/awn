import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCakeCandles,
  faCamera,
  faLocationDot,
  faPhoneFlip,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { faIdCard } from "@fortawesome/free-regular-svg-icons/faIdCard";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { AuthContext } from "../../Context/AuthContext";
import Transform from "../../Helpers/Transform";

import { Axios } from "../../Api/Axois";
import { cities } from "../../Api/Api";

export default function Myprofile() {
  const fileinputref = useRef(null);
  const [canedit, setcanedit] = useState(false);
  const { user, updateProfileData, loading } = useContext(AuthContext);

  const [citie, setCities] = useState([]);

  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    cityID: "",
    gender: true,
    address: "",
    imagePath: "",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imagePath: file.name });
    }
  };
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await Axios.get(`${cities}`);
        setCities(response.data);
      } catch (error) {
        console.error("خطأ في جلب المدن", error);
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.account.userName || "",
        firstName: user.account.person?.firstName || "",
        lastName: user.account.person?.lastName || "",
        email: user.account.person?.email || "",
        phone: user.account.person?.phone || "",
        dateOfBirth: Transform(user.account.person?.dateOfBirth) || "",
        cityID: user.account.person?.city?.cityID || "",
        gender: user.account.person?.gender ?? true,
        address: user.account.person?.address || "",
        imagePath: user.account.person?.imagePath || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const { userName, ...profileData } = formData;

    profileData.cityID = Number(profileData.cityID);

    const success = await updateProfileData(profileData, userName);
    if (success) setcanedit(false);
  };
  if (loading || !user) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">جارِ التحميل...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-light">
      <div className="container py-5">
        <div className="text-center mb-3">
          <h2 className="fw-bold fs-2">الملف الشخصي</h2>
          <div className="mx-auto line"></div>
        </div>
        <div className="row g-4 mt-3">
          <div className="col-lg-4">
            <div
              className="card border-0 custom-shadow p-4 text-center"
              style={{ borderRadius: "20px" }}
            >
              <div className="position-relative d-inline-block mx-auto my-4">
                <img
                  src={
                    formData.imagePath.length !== 0
                      ? require(`../../Assest/${formData.imagePath}`)
                      : null
                  }
                  alt=""
                  className="rounded-circle shadow-sm"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                    border: "2px solid #14213d",
                  }}
                />
                <div
                  className="position-absolute bottom-0 end-0 rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                  style={{
                    width: "45px",
                    height: "45px",
                    zIndex: "300",
                    cursor: canedit ? "pointer" : "not-allowed",
                    background: canedit ? "orange" : "#14213d",
                  }}
                  onClick={() => canedit && fileinputref.current.click()}
                >
                  <FontAwesomeIcon
                    icon={faCamera}
                    style={{ fontSize: "16px", color: "white" }}
                  />
                </div>
                <input
                  type="file"
                  ref={fileinputref}
                  className="d-none"
                  onChange={handleFileChange}
                  disabled={!canedit}
                />
              </div>
              <div>
                {canedit ? (
                  <Form.Control
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    className="text-center fw-bold"
                  />
                ) : (
                  <h5 className="mt-4 fs-4 text-primary">
                    {user?.account?.userName}
                  </h5>
                )}
                <p className="text-muted small mt-3">مستخدم في منصة عون</p>
              </div>
            </div>
          </div>

          <div
            className="col-lg-8 card border-0 custom-shadow py-4"
            style={{ borderRadius: "20px" }}
          >
            <div className="row my-3 d-flex align-items-center justify-content-center gap-2">
              <div className="col-lg-5">
                <Form>
                  <InputField
                    label="الاسم الاول:"
                    icon={faUser}
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={!canedit}
                  />
                  <InputField
                    label="البريد الالكتروني:"
                    icon={faEnvelope}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!canedit}
                  />

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        value={user.account.person.city.cityName}
                        color="orange"
                        size="lg"
                        className="ms-2"
                      />
                      المحافظة:
                    </Form.Label>
                    <Form.Select
                      name="cityID"
                      value={formData.cityID}
                      onChange={handleChange}
                      disabled={!canedit}
                      className="rounded-pill"
                    >
                      {citie.map((city) => (
                        <option key={city.cityID} value={city.cityID}>
                          {city.cityName}{" "}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Form>
              </div>

              <div className="col-lg-5">
                <Form>
                  <InputField
                    label="الكنية:"
                    icon={faIdCard}
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={!canedit}
                  />
                  <InputField
                    label="الرقم:"
                    icon={faPhoneFlip}
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!canedit}
                  />
                  <InputField
                    label="تاريخ الميلاد:"
                    icon={faCakeCandles}
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    disabled={!canedit}
                  />
                </Form>
              </div>

              <div className="col-lg-12 d-flex align-items-center justify-content-center gap-4 mt-3">
                {canedit ? (
                  <>
                    <button
                      className="btn px-3 text-white rounded-pill"
                      style={{ background: "#3dbc34" }}
                      onClick={handleSave}
                    >
                      حفظ
                    </button>
                    <button
                      className="btn px-3 text-white rounded-pill"
                      style={{ background: "#f82222" }}
                      onClick={() => setcanedit(false)}
                    >
                      الغاء
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-primary rounded-pill"
                    onClick={() => setcanedit(true)}
                  >
                    تعديل الملف الشخصي
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  icon,
  type = "text",
  name,
  value,
  onChange,
  disabled,
}) {
  return (
    <Form.Group className="mb-3">
      <Form.Label className="fw-bold">
        <FontAwesomeIcon
          icon={icon}
          color="orange"
          size="lg"
          className="ms-2"
        />
        {label}
      </Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="rounded-pill"
      />
    </Form.Group>
  );
}
