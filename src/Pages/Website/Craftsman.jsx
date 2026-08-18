import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import Card from "../../Components/Card";
import { useNavigate } from "react-router-dom";

import { Axios } from "../../Api/Axois";
import { cities, Crafts, CraftsMen } from "../../Api/Api";

export default function Craftman() {
  const [carftman, setCraftman] = useState([]);
  const [city, setCity] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCatId, setSelectedCatId] = useState(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [craftsRes, categoriesRes, citiesRes] = await Promise.all([
          Axios.get(`${CraftsMen}`),
          Axios.get(`${Crafts}`),
          Axios.get(`${cities}`),
        ]);
        setCraftman(craftsRes.data);
        setCategories(categoriesRes.data);
        setCity(citiesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function filterCat(craftId) {
    setSelectedCatId(craftId);
  }

  return (
    <SkeletonTheme highlightColor="#d8dde5">
      <div>
        <div className="mb-2 bg-light positon-relative">
          <div className="mx-5 positon-absolute ">
            <div className=" text-center pt-5  mb-3">
              <h2 className="fw-bold fs-2 ">الحرفيين</h2>
              <div className="mx-auto line"></div>
            </div>
            <div className="row ">
              <div className="col-12 col-md-3 col-lg-3 mt-4 ">
                <div className="d-flex  flex-column gap-2">
                  {loading
                    ? Array(6)
                        .fill(0)
                        .map((_, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-4"
                            style={{ background: "#d8dde5" }}
                          >
                            <Skeleton height={40} />
                          </div>
                        ))
                    : categories.map((cat) => {
                        const isActive = selectedCatId === cat.craftID;
                        return (
                          <div
                            key={cat.craftID}
                            onClick={() => filterCat(cat.craftID)}
                            className="d-flex align-items-center justify-content-between w-100 mb-2 p-3 rounded-4"
                            style={{
                              cursor: "pointer",
                              backgroundColor: isActive
                                ? "rgba(210, 104, 23, 0.15)"
                                : "#d8dde5",
                              color: isActive ? "orange" : "#14213d",
                              borderBottom: isActive
                                ? "2px solid orange"
                                : "2px solid #14213d",
                              transition: "all 0.3s ease",
                            }}
                          >
                            <span className="ms-2">{cat.category}</span>
                            <img
                              src={
                                cat.imageUrl
                                  ? require(`../../Assest/${cat.imageUrl}`)
                                  : null
                              }
                              width={"40px"}
                              className="rounded-circle"
                              alt=""
                            />
                          </div>
                        );
                      })}
                </div>
              </div>

              <div className="col-12 col-md-9 col-lg-9 mt-md-0">
                <div className="d-flex align-items-center justify-content-between gap-3 mt-4">
                  <div className="form-floating">
                    <select
                      value={selectedCity}
                      className="border-2 py-2 px-4 mb-1 rounded-4"
                      onChange={(e) => setSelectedCity(e.target.value)}
                    >
                      <option value="">كل المحافظات</option>
                      {city.map((c, index) => (
                        <option key={index} value={c.cityName}>
                          {c.cityName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    className="bg-secondary p-2 rounded-3 border-0 text-white"
                    onClick={() => nav("/order")}
                  >
                    طلب خدمة
                  </button>
                </div>

                {loading ? (
                  <div className="row mt-4 ">
                    {[1, 2, 3].map((_, i) => (
                      <div
                        key={i}
                        className="col-md-4 mb-4 d-flex justify-content-between flex-wrap"
                      >
                        <div
                          className="rounded-4"
                          style={{
                            height: "350px",
                            width: "300px",
                          }}
                        >
                          <Skeleton
                            height={"100%"}
                            width={"100%"}
                            borderRadius={"30px"}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Card
                    services={carftman.filter((item) => {
                      return (
                        (selectedCatId
                          ? item.craft.craftID === selectedCatId
                          : true) &&
                        (selectedCity
                          ? item.account.person.city.cityName === selectedCity
                          : true)
                      );
                    })}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}
