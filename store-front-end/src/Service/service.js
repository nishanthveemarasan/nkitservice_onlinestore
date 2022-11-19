export const getDate = (value) => {
  const date = new Date(value);
  const getYear = date.getFullYear();
  const getMonth = date.getMonth() + 1;
  const getDay = date.getDate();

  const constructDate = `${getYear}-${getMonth
    .toString()
    .padStart(2, "0")}-${getDay.toString().padStart(2, "0")}`;
  return constructDate;
};
