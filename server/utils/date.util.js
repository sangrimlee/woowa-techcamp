export function getFirstDayOfMonth(year, month) {
  return new Date(year, month - 1);
}

export function getLastDayOfMonth(year, month) {
  return new Date(year, month, 0);
}

export function getAllDateInfo(date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    day: date.getDay(),
  };
}

export function convertDateString(dateObj) {
  const { year, month, date } = getAllDateInfo(dateObj);
  return `${year}-${month.toString().padStart(2, '0')}-${date
    .toString()
    .padStart(2, '0')}`;
}
