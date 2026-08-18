import {
  faThLarge,
  faList,
  faUser,
  faClock,
  faUsers,
  faTools,
  faTriangleExclamation,
  faChartLine,
  faHammer,
  faPaperPlane,
  faLocationDot,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
export const links = [
  {
    name: "لوحة التحكم ",
    to: "Craftdash",
    icon: faThLarge,
    role: "Craftsman",
  },
  {
    name: "لوحة التحكم",
    to: "/dashboard/admindash",
    icon: faThLarge,
    role: ["Admin"],
  },
  {
    name: " المستخدمين",
    to: "/dashboard/user",
    icon: faUser,
    role: ["Admin"],
  },
  {
    name: "الحرفيين",
    to: "/dashboard/Allcraftsman",
    icon: faUsers,
    role: ["Admin"],
  },
  {
    name: "كل الطلبات",
    to: "/dashboard/allorder",
    icon: faList,
    role: "Craftsman",
  },
  {
    name: "ملفي الشخصي",
    to: "/dashboard/profile",
    icon: faUser,
    role: ["Craftsman"],
  },
  {
    name: "طلبات المنصة",
    to: "/dashboard/Awnorder",
    icon: faList,
    role: ["Admin"],
  },

  {
    name: "خدماتي ",
    to: "/dashboard/myservices",
    icon: faHammer,
    role: ["Craftsman"],
  },
  {
    name: "مواعيدي",
    to: "/dashboard/availiblity",
    icon: faClock,
    role: ["Craftsman", "1995"],
  },

  {
    name: "المهن المتوفرة",
    to: "/dashboard/craft",
    icon: faTools,
    role: ["Admin"],
  },
  {
    name: "الشكاوي",
    to: "/dashboard/complaint",
    icon: faTriangleExclamation,
    role: ["Admin"],
  },
  {
    name: "التقارير المالية",
    to: "/dashboard/financial",
    icon: faChartLine,
    role: ["Admin"],
  },
  {
    name: "عروضي المقدمة",
    to: "/dashboard/myoffer",
    icon: faPaperPlane,
    role: ["Craftsman"],
  },
  {
    name: "المدن السورية",
    to: "/dashboard/city",
    icon: faLocationDot,
    role: ["Admin"],
  },

  {
    name: "تقييمات الطلبات",
    to: "/dashboard/orderreview",
    icon: faStar,
    role: ["Admin"],
  },
];
