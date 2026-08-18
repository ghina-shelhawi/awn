import { Axios } from "../../Api/Axois";
import { RequestOffers } from "../../Api/Api";
import { useEffect, useState } from "react";

function OfferModal({
  isOpen,
  requestId,
  onClose,

  craftManID,
  refreshreload,
  initialData,
}) {
  const [offerData, setOfferData] = useState({
    proposedPrice: "",
    proposedTime: "",
    offerNote: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // حالة التعديل: جلب البيانات من السيرفر بناءً على الـ ID
        const fetchOffer = async () => {
          setFetchLoading(true);
          try {
            const res = await Axios.get(`${RequestOffers}/${initialData}`);
            const data = res.data;
            setOfferData({
              proposedPrice: data.proposedPrice || "",
              // التأكد من تنسيق الوقت لـ datetime-local
              proposedTime: data.proposedTime
                ? data.proposedTime.slice(0, 16)
                : "",
              offerNote: data.offerNote || "",
            });
          } catch (error) {
            console.error("Error fetching offer:", error);
            alert("حدث خطأ أثناء جلب بيانات العرض");
          } finally {
            setFetchLoading(false);
          }
        };
        fetchOffer();
      } else {
        // حالة الإضافة: تفريغ الحقول
        setOfferData({
          proposedPrice: "",
          proposedTime: "",
          offerNote: "",
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!craftManID || !requestId) {
      alert("بيانات الحرفي أو الطلب مفقودة");
      return;
    }

    setLoading(true);
    const isEditing = !!initialData;
    const url = isEditing ? `${RequestOffers}/${initialData}` : RequestOffers;
    const method = isEditing ? "put" : "post";

    try {
      await Axios[method](url, {
        ...offerData,
        proposedPrice: Number(offerData.proposedPrice),
        craftManID: craftManID,
        requestId: requestId,

        status: isEditing ? "pending" : "pending",
      });

      onClose();
      if (refreshreload) refreshreload();
    } catch (error) {
      console.error("Error submitting offer:", error);
      alert("حدث خطأ أثناء إرسال العرض");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal show d-block"
      style={{
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(2px)",
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div
          className="modal-content border-0 shadow-lg"
          style={{ borderRadius: "15px" }}
        >
          <div className="modal-header border-0 pb-0 pt-3 px-4">
            <h4 className="modal-title fw-bold text-primary">
              {initialData ? "تعديل العرض" : "تقديم عرض جديد"}
            </h4>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body px-4">
            {fetchLoading ? (
              <div className="text-center py-5">جاري تحميل البيانات...</div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    السعر المقترح (ل.س)
                  </label>
                  <input
                    type="number"
                    className="form-control form-control-lg bg-light border-0"
                    placeholder="مثال: 5000"
                    value={offerData.proposedPrice}
                    required
                    onChange={(e) =>
                      setOfferData({
                        ...offerData,
                        proposedPrice: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    تاريخ ووقت التنفيذ
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control form-control-lg bg-light border-0"
                    value={offerData.proposedTime}
                    required
                    onChange={(e) =>
                      setOfferData({
                        ...offerData,
                        proposedTime: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    رسالة تفصيلية
                  </label>
                  <textarea
                    className="form-control bg-light border-0"
                    rows="3"
                    placeholder="اكتب تفاصيل عرضك هنا..."
                    value={offerData.offerNote}
                    onChange={(e) =>
                      setOfferData({ ...offerData, offerNote: e.target.value })
                    }
                  ></textarea>
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-50 py-2"
                    onClick={onClose}
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary w-50 py-2"
                    disabled={loading}
                  >
                    {loading
                      ? "جاري المعالجة..."
                      : initialData
                        ? "تحديث العرض"
                        : "إرسال العرض"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferModal;
