import { Day } from "../models/calendar";

export const daysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

export const addDays = (date: string | number | Date, days: number) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const getNextMonth = (date: Date) => {
  const tempDate = new Date(date.valueOf());
  tempDate.setMonth(tempDate.getMonth() + 1);
  tempDate.setDate(1);
  return tempDate;
};

export const getPreviousMonth = (date: Date) => {
  const tempDate = new Date(date.valueOf());
  tempDate.setMonth(tempDate.getMonth() - 1);
  tempDate.setDate(1);
  return tempDate;
};

export const getDaysInPreviousMonth = (date: Date) => {
  const previousMonth = getPreviousMonth(date);
  return daysInMonth(previousMonth.getMonth() + 1, previousMonth.getFullYear());
};

export const getNameOfTheDay = (date: Date) => {
  return date.toLocaleDateString("default", { weekday: "long" });
};

export const getNameOfTheMonth = (date: Date) => {
  return date.toLocaleString("default", { month: "long" });
};

export const initiateCalendar = (date: Date) => {
  let newCalendar: Array<Day> = [];
  const daysCount = daysInMonth(date.getMonth() + 1, date.getFullYear());
  let tempDate = new Date(date.getFullYear(), date.getMonth());

  for (let i = 0; i < daysCount; i++) {
    newCalendar.push({
      date: tempDate.toLocaleDateString(),
      monthDayNumber: i + 1,
      dayOfWeekName: getNameOfTheDay(tempDate),
      dayOfWeekNumber: tempDate.getDay(),
      isCurrentMonth: true,
    });
    tempDate = addDays(tempDate, 1);
  }

  if (newCalendar.length) {
    const daysInPreviousMonth = getDaysInPreviousMonth(date);
    const firstWeekDayNumber = newCalendar[0].dayOfWeekNumber;

    const previousCalendar: Array<Day> = [];
    for (let i = 0; i < firstWeekDayNumber; i++) {
      const monthDayNumber = daysInPreviousMonth - firstWeekDayNumber + i + 1;
      let tempDate = new Date(
        date.getFullYear(),
        date.getMonth() - 1,
        monthDayNumber
      );
      previousCalendar.push({
        date: tempDate.toLocaleDateString(),
        monthDayNumber: monthDayNumber,
        dayOfWeekName: getNameOfTheDay(tempDate),
        dayOfWeekNumber: tempDate.getDay(),
        isCurrentMonth: false,
      });
    }

    newCalendar = previousCalendar.concat(newCalendar);

    const nextCalendar: Array<Day> = [];
    let daysInNextMonth = 7 - (newCalendar.length % 7);
    if (daysInNextMonth === 0) daysInNextMonth = 7;
    if (newCalendar.length < 35) daysInNextMonth += 7;

    for (let i = 0; i < daysInNextMonth; i++) {
      let tempDate = new Date(date.getFullYear(), date.getMonth() + 1, i + 1);
      nextCalendar.push({
        date: tempDate.toLocaleDateString(),
        monthDayNumber: i + 1,
        dayOfWeekName: getNameOfTheDay(tempDate),
        dayOfWeekNumber: tempDate.getDay(),
        isCurrentMonth: false,
      });
    }
    newCalendar = newCalendar.concat(nextCalendar);
    return newCalendar;
  }
};
