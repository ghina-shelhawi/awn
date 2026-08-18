import { Form } from "react-bootstrap";
import Map from "../../Components/Map";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faImages,
  faLocationDot,
  faPaperPlane,
  faPencilAlt,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faTools } from "@fortawesome/free-solid-svg-icons/faTools";
import { Axios } from "../../Api/Axois";
import { cities, Crafts, ServiceRequests } from "../../Api/Api";
import { citiesData } from "../../Helpers/citydata";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";

export default function Orderservice() {
  const [citiesdata, setcitydata] = useState([]);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);

  const [coords, setcoords] = useState(
    citiesData.find((c) => c.cityName === "حلب") || citiesData[0],
  );
  const now = new Date();
  const { user } = useContext(AuthContext);
  const [form, setform] = useState({
    accountID: user?.accountID,
    craftID: "",
    cityID: "",
    status: "UnAssigned",
    description: "",
    locationLatitude: 0,
    locationLongitude: 0,
    expiryDate: new Date().toISOString(),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, citiesRes] = await Promise.all([
          Axios.get(`${Crafts}`),
          Axios.get(`${cities}`),
        ]);
        setCategories(categoriesRes.data);
        setcitydata(citiesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const citywithcoord =
    citiesdata.length > 0
      ? citiesdata.map((item) => {
          const coords = citiesData.find((c) => c.cityName === item.cityName);
          return {
            ...item,
            lat: coords ? coords.lat : 0,
            lng: coords ? coords.lng : 0,
          };
        })
      : [];

  function handleImageChange(e) {
    e.preventDefault();
    setImages((prev) => [...prev, ...e.target.files]);
  }

  function handledelet(key) {
    setImages((prev) => prev.filter((img, i) => i !== key));
  }

  const showimage = images.map((item, key) => (
    <div
      key={key}
      className="position-relative"
      style={{ width: "70px", height: "70px" }}
    >
      <img
        src={URL.createObjectURL(item)}
        alt="preview"
        className="rounded-3 shadow-sm w-100 h-100 object-fit-cover"
      />
      <button
        onClick={() => handledelet(key)}
        type="button"
        className="btn p-0 position-absolute"
        style={{
          top: "-8px",
          right: "-8px",
          color: "#dc3545",
          backgroundColor: "white",
          borderRadius: "50%",
        }}
      >
        <FontAwesomeIcon icon={faTimesCircle} size="lg" />
      </button>
    </div>
  ));

  function handlechange(e) {
    setform({ ...form, [e.target.name]: e.target.value });
  }

  const handleCityChange = (e) => {
    const selectedId = e.target.value;
    setform((prev) => ({ ...prev, cityID: selectedId }));

    const foundCity = citywithcoord.find(
      (c) => String(c.cityID) === String(selectedId),
    );
    if (foundCity) {
      setcoords({ lat: foundCity.lat, lng: foundCity.lng });
      setform((prev) => ({ ...prev, cityID: selectedId }));
    }
  };

  const handleLocationselect = (newCoords) => {
    setcoords(newCoords);
    setform((prev) => ({
      ...prev,
      locationLatitude: newCoords.lat,
      locationLongitude: newCoords.lng,
    }));
  };
  async function handlesubmit(e) {
    e.preventDefault();
    const peload = {
      ...form,
      craftID: Number(form.craftID),
      cityID: Number(form.cityID),
    };
    console.log(peload);
    try {
      const res = await Axios.post(`${ServiceRequests}`, peload);
      toast.success("تم تقديم طلبك بنجاح");
    } catch (err) {
      console.log(err.response);
    }
  }

  return (
    <div className="bg-light">
      <div className="container py-5">
        <div className="mb-4">
          <h2 className="text-center fw-bold fs-2 ">طلب الخدمة</h2>
          <div className="line mx-auto"></div>
        </div>
        <div className="card custom-shadow rounded border-0 ">
          <div className="row gap-4 align-items-start justify-content-center my-4 mx-2 ">
            <div className="col-lg-5">
              <Form>
                <Form.Group style={{ direction: "rtl" }}>
                  <Form.Label className="text-primary fw-bold fs-4">
                    <FontAwesomeIcon icon={faTools} color="orange" /> الخدمة:
                  </Form.Label>
                  <Form.Select
                    className="rounded-pill mb-3 py-2 shadow"
                    onChange={handlechange}
                    name="craftID"
                  >
                    <option value="">اختر الخدمة</option>
                    {categories.map((item) => (
                      <option value={parseInt(item.craftID)} key={item.craftID}>
                        {item.category}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group style={{ direction: "rtl" }}>
                  <Form.Label className="text-primary fw-bold fs-4">
                    <FontAwesomeIcon icon={faLocationDot} color="orange" />{" "}
                    المحافظة:
                  </Form.Label>
                  <Form.Select
                    value={form.cityID}
                    required
                    name="cityID"
                    onChange={handleCityChange}
                    className="rounded-pill mb-2 py-2 shadow"
                  >
                    <option value="">اختر المحافظة</option>
                    {citywithcoord.map((item) => (
                      <option key={item.cityID} value={item.cityID}>
                        {item.cityName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <p
                  style={{ fontSize: "12px" }}
                  className="text-muted small fw-bold mb-0 me-2 "
                >
                  يرجى تحديد المحافظة ومن ثم تحديد موقعك على الخريطة
                </p>
                <Form.Label className="text-primary mt-3 fw-bold fs-4">
                  <FontAwesomeIcon icon={faPencilAlt} color="orange" /> تفاصيل
                  المشكلة:
                </Form.Label>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    as={"textarea"}
                    onChange={handlechange}
                    name="description"
                    placeholder="مثلا مشكلة في الكهرباء"
                    className="text-small rounded-4 shadow py-2"
                  />
                </Form.Group>
                <label className="fw-bold fs-4  mt-2 mb-2 text-primary">
                  <FontAwesomeIcon icon={faImages} color="orange" /> إرفاق صور
                  للمشكلة:{" "}
                </label>
                <div
                  className="p-2 shadow mb-3   rounded-4 bg-light d-flex align-items-center justify-content-center gap-2 flex-wrap"
                  style={{
                    borderWidth: "3px",
                    borderStyle: "dashed",
                    borderColor: "orange",
                    minHeight: "90px",
                  }}
                >
                  <input
                    type="file"
                    id="fileInput"
                    multiple
                    hidden
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                  <label
                    htmlFor="fileInput"
                    className="text-center m-0"
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon
                      icon={faCamera}
                      className="text-secondary mb-1"
                      size="lg"
                    />
                    <div
                      className="small text-primary"
                      style={{ fontSize: "10px" }}
                    >
                      اضغط لرفع صور
                    </div>
                  </label>

                  {images ? showimage : "jjj"}
                </div>
              </Form>
            </div>
            <div className="col-lg-6 mt-1 ">
              <Map
                onlocationselect={handleLocationselect}
                coords={coords}
                selectcity={form.cityID}
              />
              <div className="mt-1 text-center p-2 bg-light rounded">
                <strong>الإحداثيات الحالية:</strong> {coords?.lat?.toFixed(4)},{" "}
                {coords?.lng?.toFixed(4)}
              </div>
            </div>
            <button
              className="btn col-4 col-md-3 rounded-pill py-3 fw-bold text-white shadow"
              style={{ border: "none", background: "#2780ca" }}
              onClick={handlesubmit}
            >
              إرسال الطلب{" "}
              <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
