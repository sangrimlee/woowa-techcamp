import { DAY_NAMES } from '../constants/data';

export function getYearAndMonthAndDate(dateObj) {
  return {
    year: dateObj.getFullYear(),
    month: dateObj.getMonth() + 1,
    date: dateObj.getDate(),
  };
}

export function getDayName(dateObj) {
  return DAY_NAMES[dateObj.getDay()];
}

export function convertDateString(dateObj) {
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString();
  const day = dateObj.getDate().toString();
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

export function getFirstDateOfMonth(dateObj) {
  const { year, month } = getYearAndMonthAndDate(dateObj);
  return new Date(year, month - 1, 1);
}

export function getLastDateOfMonth(dateObj) {
  const { year, month } = getYearAndMonthAndDate(dateObj);
  return new Date(year, month, 0);
}

export function splitByWeek(dateArr) {
  const totalLength = Math.ceil(dateArr.length / 7);
  const splitedDateArr = new Array(totalLength).fill(undefined).map(() => []);
  dateArr.forEach((value, index) => {
    const splitedIndex = Math.floor(index / 7);
    splitedDateArr[splitedIndex].push(value);
  });
  return splitedDateArr;
}

function getFirstDateOfCalendar(dateObj) {
  const firstDate = getFirstDateOfMonth(dateObj);
  firstDate.setDate(firstDate.getDate() - firstDate.getDay());
  return firstDate;
}

export function getAllDatesForCalendar(dateObj) {
  const calendarDates = [];
  const currentDate = getFirstDateOfCalendar(dateObj);
  while (
    currentDate <= getLastDateOfMonth(dateObj) ||
    calendarDates.length % 7 !== 0
  ) {
    calendarDates.push({
      date: new Date(currentDate.valueOf()),
      dateString: convertDateString(currentDate),
      isCurrentMonth: currentDate.getMonth() === dateObj.getMonth(),
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return calendarDates;
}
