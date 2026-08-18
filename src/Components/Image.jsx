import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default function ImageUploadWithPreview() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="mt-3">
      <label className="fw-bold small mb-2 text-secondary">
        إرفاق صورة للمشكلة
      </label>

      <div
        className="p-2 border rounded-4 bg-light d-flex align-items-center justify-content-center"
        style={{
          borderStyle: "dashed",
          borderColor: "#ff6b00",
          minHeight: "80px",
        }}
      >
        {!image ? (
          <>
            <input
              type="file"
              id="fileInput"
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
                className="text-warning mb-1"
                size="lg"
              />
              <div className="small text-muted" style={{ fontSize: "10px" }}>
                اضغط لرفع صورة
              </div>
            </label>
          </>
        ) : (
          <div
            className="position-relative"
            style={{ width: "200px", height: "70px" }}
          >
            <img
              src={image}
              alt="preview"
              className="rounded-3 shadow-sm w-100 h-100 object-fit-cover"
            />

            {/* زر الإكس الأحمر */}
            <button
              onClick={() => setImage(null)}
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
        )}
      </div>
    </div>
  );
}
