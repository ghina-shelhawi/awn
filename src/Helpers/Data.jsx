export const formatDate = (dateString) => {
  if (!dateString) return "تاريخ غير متاح";

  return new Date(dateString).toISOString().split("T")[0];
};

export const isToday = (dateString) => {
  const today = new Date().toISOString().split("T")[0];
  const compareDate = new Date(dateString).toISOString().split("T")[0];
  return today === compareDate;
};
export const formatTimeOnly = (dateString) => {
  if (!dateString) return "---";
  const date = new Date(dateString);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
