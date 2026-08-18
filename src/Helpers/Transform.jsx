export default function Transform(date) {
  const selectdate = new window.Date(date);
  const getfullyear = selectdate.getFullYear();
  const getmonth = (selectdate.getMonth() + 1).toString().padStart(2, "0");
  const getday = selectdate.getDate().toString().padStart(2, "0");
  return `${getfullyear}-${getmonth}-${getday}`;
}
