// // // Map.js
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   useMap,
//   useMapEvents,
//   Popup,
// } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";

// // إعدادات الأيقونات الافتراضية
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// function ChangeView({ center }) {
//   const map = useMap();
//   useEffect(() => {
//     if (center.lat && center.lng) {
//       map.setView([center.lat, center.lng], 14); // استخدام flyTo بدلاً من setView لحركة أنعم
//     }
//   }, [center, map]);
//   return null;
// }

// export default function Map({ onlocationselect, coords, currenttitle }) {
//   const handleGetCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const lat = pos.coords.latitude;
//           const lng = pos.coords.longitude;

//           onlocationselect({ lat: lat, lng: lng });
//           alert("تم تحديد موقعك الحالي بنجاح!");

//           console.log(lat + "    " + lng);
//         },
//         (err) => {
//           alert(
//             "فشل الوصول للموقع. تأكد من تفعيل الـ GPS وإعطاء الصلاحية للمتصفح.",
//           );
//         },
//       );
//     } else {
//       alert("متصفحك لا يدعم خاصية تحديد الموقع.");
//     }
//   };

//   function LocationMarker() {
//     useMapEvents({
//       click(e) {
//         onlocationselect(e.latlng);
//       },
//     });

//     if (!coords.lat || !coords.lng) return null;

//     return (
//       <Marker
//         position={[coords.lat, coords.lng]}
//         key={`${coords.lat}-${coords.lng}`}
//       >
//         <Popup
//           permanent
//           autoClose={false}
//           closeOnClick={false}
//           direction="top"
//           offset={[0, -32]}
//         >
//           <h5 style={{ margin: 0 }}>تم تحديد الموقع</h5>
//         </Popup>
//       </Marker>
//     );
//   }

//   return (
//     <>
//       <div
//         style={{
//           height: "450px",
//           position: "relative",
//           width: "100%",
//           borderRadius: "10px",
//           overflow: "hidden",
//           border: "1px solid #ddd",
//         }}
//       >
//         <button
//           style={{
//             position: "absolute",
//             top: "10px",
//             left: "40px",
//             zIndex: 1000,
//             background: "white",
//             border: "2px solid rgba(0,0,0,0.4)",
//           }}
//           className="mb-2 mx-2 rounded p-1 px-2  text-white"
//           onClick={handleGetCurrentLocation}
//         >
//           <FontAwesomeIcon icon={faLocationCrosshairs} size="lg" color="red" />
//         </button>
//         <MapContainer
//           center={[coords.lat || 33.5138, coords.lng || 36.2877]} // دمشق كقيمة افتراضية أولية
//           zoom={14}
//           style={{ height: "100%", width: "100%" }}
//         >
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <ChangeView center={coords} />
//           <LocationMarker />
//         </MapContainer>
//       </div>
//     </>
//   );
// }
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

// إعدادات الأيقونة
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center?.lat && center?.lng) {
      map.flyTo([center.lat, center.lng], 14);
    }
  }, [center, map]);
  return null;
}

// أضفنا readOnly كخاصية جديدة
export default function Map({
  onlocationselect,
  coords,
  selectcity,
  isReadOnly = false,
}) {
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          onlocationselect({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        () => alert("فشل الوصول للموقع"),
      );
    }
  };

  function LocationMarker() {
    useMapEvents({
      click(e) {
        if (!selectcity) {
          toast.error("يجب تحديد المحافظة اولا ", {
            style: { fontSize: "20px", fontWeight: "bold" },
          });
        } else if (!isReadOnly && onlocationselect) {
          onlocationselect(e.latlng);
        }
      },
    });

    if (!coords?.lat || !coords?.lng) return null;

    return (
      <Marker position={[coords.lat, coords.lng]}>
        {/* البوب اب يظهر دائماً في وضع العرض */}
        <Popup permanent={isReadOnly} autoClose={false} closeOnClick={false}>
          {isReadOnly ? "موقع العمل" : "تم تحديد الموقع"}
        </Popup>
      </Marker>
    );
  }

  return (
    <div
      style={{
        height: "450px",
        position: "relative",
        width: "100%",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      {/* زر تحديد الموقع يظهر فقط في حالة الطلب (ليس عرض فقط) */}
      {!isReadOnly && (
        <button
          style={{
            position: "absolute",
            top: "10px",
            left: "50px",
            border: "2px solid #b1b1b1",
            zIndex: 1000,
            background: "white",
          }}
          onClick={handleGetCurrentLocation}
        >
          <FontAwesomeIcon icon={faLocationCrosshairs} color="red" />
        </button>
      )}

      <MapContainer
        center={[coords?.lat || 33.5138, coords?.lng || 36.2877]}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ChangeView center={coords} />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}
