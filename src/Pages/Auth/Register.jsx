import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { baseuRL, cities, Crafts, register } from "../../Api/Api";
import { Axios } from "../../Api/Axois";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [role, setRole] = useState("Customer");
  const [citie, setCities] = useState([]);
  const [crafts, setCrafts] = useState([]);
  const [apiError, setApiError] = useState("");
  const nav = useNavigate();
  // جلب المحافظات والمهن من الـ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const citiesRes = await Axios.get(`${cities}`);
        setCities(citiesRes.data);

        const craftsRes = await Axios.get(`${Crafts}`);
        setCrafts(craftsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("الاسم الأول مطلوب"),
    lastName: Yup.string().required("اسم العائلة مطلوب"),
    userName: Yup.string().required("اسم المستخدم مطلوب"),
    email: Yup.string()
      .email("البريد الإلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    password: Yup.string()
      .min(8, "كلمة السر يجب أن تكون 8 أحرف على الأقل")
      .required("كلمة السر مطلوبة"),
    dateOfBirth: Yup.date()
      .required("تاريخ الميلاد مطلوب")
      .test("age", "يجب أن يكون عمرك 16 سنة على الأقل", function (value) {
        if (!value) return false;
        const cutoff = new Date();
        cutoff.setFullYear(cutoff.getFullYear() - 16);
        return new Date(value) <= cutoff;
      }),
    gender: Yup.string().required("الجنس مطلوب"),
    cityID: Yup.number().required("المحافظة مطلوبة"),
    phone: Yup.string().required("رقم الهاتف مطلوب"),
    address: Yup.string().required("العنوان مطلوب"),
    role: Yup.string().required("نوع الحساب مطلوب"),
    craftID: Yup.number().when("role", {
      is: "Craftman",
      then: (schema) => schema.required("المهنة مطلوبة للحرفي"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: null,
      cityID: null,
      userName: "",
      password: "",
      role: "Customer",
      email: "",
      address: "",
      phone: "",
      craftID: "",
      experienceYears: "",
      bio: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const formattedValues = {
        ...values,
        cityID: values.cityID ? Number(values.cityID) : 0,
        craftID: values.craftID ? Number(values.craftID) : 0,
        experienceYears: values.experienceYears
          ? Number(values.experienceYears)
          : 0,
        gender: values.gender ? true : false,
      };

      setApiError("");
      try {
        await axios.post(`${baseuRL}/${register}`, formattedValues);
        nav("/login");
      } catch (error) {
        if (error.response && error.response.data) {
          setApiError(
            error.response.data.message ||
              "اسم المستخدم محجوز مسبقاً أو حدث خطأ ما.",
          );
        } else {
          setApiError("حدث خطأ في الاتصال بالخادم.");
        }
      }
    },
  });

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center w-100">
        <div className="col-md-8">
          <div className="card shadow border-0 p-4">
            <h2 className="mb-4 text-center text-secondary fw-bold">
              انشاء حساب
            </h2>

            {apiError && (
              <div className="alert alert-danger text-center" role="alert">
                {apiError}
              </div>
            )}

            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">الاسم الأول</label>
                  <input
                    name="firstName"
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <div className="text-danger small">
                      {formik.errors.firstName}
                    </div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">اسم العائلة</label>
                  <input
                    name="lastName"
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <div className="text-danger small">
                      {formik.errors.lastName}
                    </div>
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">تاريخ الميلاد</label>
                  <input
                    name="dateOfBirth"
                    type="date"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dateOfBirth}
                  />
                  {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                    <div className="text-danger small">
                      {formik.errors.dateOfBirth}
                    </div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">الجنس</label>
                  <select
                    name="gender"
                    className="form-select"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option>اختر الجنس...</option>
                    <option value="true">ذكر</option>
                    <option value="false">أنثى</option>
                  </select>
                  {formik.touched.gender && formik.errors.gender && (
                    <div className="text-danger small">
                      {formik.errors.gender}
                    </div>
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">البريد الإلكتروني</label>
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-danger small">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">رقم الهاتف</label>
                  <input
                    name="phone"
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="text-danger small">
                      {formik.errors.phone}
                    </div>
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">اسم المستخدم</label>
                  <input
                    name="userName"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.userName}
                  />
                  {formik.touched.userName && formik.errors.userName && (
                    <div className="text-danger small">
                      {formik.errors.userName}
                    </div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">كلمة السر</label>
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-danger small">
                      {formik.errors.password}
                    </div>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">نوع الحساب</label>
                  <select
                    name="role"
                    className="form-select"
                    value={formik.values.role}
                    onChange={(e) => {
                      formik.handleChange(e);
                      setRole(e.target.value);
                    }}
                  >
                    <option value="Customer">عميل</option>
                    <option value="Craftsman">حرفي</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">المحافظة</label>
                  <select
                    name="cityID"
                    className="form-select"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option>اختر المحافظة...</option>
                    {citie.map((city) => (
                      <option key={city.cityID} value={city.cityID}>
                        {city.cityName}
                      </option>
                    ))}
                  </select>
                  {formik.touched.cityID && formik.errors.cityID && (
                    <div className="text-danger small">
                      {formik.errors.cityID}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">العنوان</label>
                <input
                  name="address"
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                />
                {formik.touched.address && formik.errors.address && (
                  <div className="text-danger small">
                    {formik.errors.address}
                  </div>
                )}
              </div>

              {role === "Craftsman" && (
                <div className="bg-light p-3 rounded mb-3 border">
                  <h6 className="text-primary fw-bold">
                    بيانات الحرفي الإضافية:
                  </h6>

                  <div className="mb-2">
                    <label className="form-label">المهنة</label>
                    <select
                      className="form-select"
                      name="craftID"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option>اختر المهنة...</option>
                      {crafts.map((craft) => (
                        <option key={craft.craftID} value={craft.craftID}>
                          {craft.craftName}
                        </option>
                      ))}
                    </select>
                    {formik.touched.craftID && formik.errors.craftID && (
                      <div className="text-danger small">
                        {formik.errors.craftID}
                      </div>
                    )}

                    <div className="mb-2">
                      <label className="form-label">
                        سنوات الخبرة (اختياري)
                      </label>
                      <input
                        name="experienceYears"
                        type="number"
                        className="form-control"
                        value={formik.values.experienceYears}
                        onChange={formik.handleChange}
                      />
                    </div>

                    <div>
                      <label className="form-label">نبذة عنك (اختياري)</label>
                      <textarea
                        name="bio"
                        className="form-control"
                        value={formik.values.bio}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-secondary text-white w-100 mt-3 py-2 fw-bold"
              >
                انشاء حساب
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
