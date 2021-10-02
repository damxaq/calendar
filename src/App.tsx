import React, { useState, useEffect } from "react";

function App() {
  const [date, setDate] = useState(new Date());
  const [calendar, setCalendar] = useState<Array<any>>([]);

  type Day = {
    date: Date;
    dayOfWeekName: string;
    dayOfWeekNumber: string;
    isCurrentMonth: boolean;
  };

  type Calendar = {
    days: Array<Day>;
    firstDayOfMonth: Day;
  };

  const initiateCalendar = () => {
    let newCalendar = [];
    const daysCount = daysInMonth(date.getMonth() + 1, date.getFullYear());
    let tempDate = new Date(date.getFullYear(), date.getMonth());

    for (let i = 0; i < daysCount; i++) {
      newCalendar.push({
        date: tempDate.toLocaleDateString(),
        monthDayNumber: i + 1,
        weekDay: getNameOfTheDay(tempDate),
        weekDayNumber: tempDate.getDay(),
        isCurrentMonth: true,
      });
      tempDate = addDays(tempDate, 1);
    }

    if (newCalendar.length) {
      const daysInPreviousMonth = getDaysInPreviousMonth();
      const firstWeekDayNumber = newCalendar[0].weekDayNumber;

      const previousCalendar: any = [];
      for (let i = 0; i < firstWeekDayNumber; i++) {
        const monthDayNumber = daysInPreviousMonth - firstWeekDayNumber + i + 1;
        tempDate = new Date();
        previousCalendar.push({
          date: tempDate.toLocaleDateString(),
          monthDayNumber: monthDayNumber,
          weekDay: getNameOfTheDay(tempDate),
          weekDayNumber: tempDate.getDay(),
          isCurrentMonth: false,
        });
      }

      newCalendar = previousCalendar.concat(newCalendar);

      const nextCalendar: any = [];
      let daysInNextMonth = 7 - (newCalendar.length % 7);
      if (daysInNextMonth === 0) daysInNextMonth = 7;
      if (newCalendar.length < 35) daysInNextMonth += 7;

      for (let i = 0; i < daysInNextMonth; i++) {
        tempDate = new Date();
        nextCalendar.push({
          date: tempDate.toLocaleDateString(),
          monthDayNumber: i + 1,
          weekDay: getNameOfTheDay(tempDate),
          weekDayNumber: tempDate.getDay(),
          isCurrentMonth: false,
        });
      }

      setCalendar([...newCalendar, ...nextCalendar]);
    }
  };

  function daysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }

  function addDays(date: string | number | Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const getNextMonth = () => {
    const tempDate = new Date(date.valueOf());
    tempDate.setMonth(tempDate.getMonth() + 1);
    tempDate.setDate(1);
    return tempDate;
  };

  const getPreviousMonth = () => {
    const tempDate = new Date(date.valueOf());
    tempDate.setMonth(tempDate.getMonth() - 1);
    tempDate.setDate(1);
    return tempDate;
  };

  const getDaysInPreviousMonth = () => {
    const previousMonth = getPreviousMonth();
    return daysInMonth(
      previousMonth.getMonth() + 1,
      previousMonth.getFullYear()
    );
  };

  const getNameOfTheDay = (date: Date) => {
    return date.toLocaleDateString("default", { weekday: "long" });
  };

  const getNameOfTheMonth = (date: Date) => {
    return date.toLocaleString("default", { month: "long" });
  };

  useEffect(() => {
    if (date) {
      initiateCalendar();
    }
  }, [date]);

  console.log(calendar);

  return (
    <div>
      <p>{getPreviousMonth().toString()}</p>
      <p>
        {getNameOfTheDay(date)} {date.getDate()} {getNameOfTheMonth(date)}{" "}
        {date.getFullYear()}
      </p>
      <p>{daysInMonth(date.getMonth() + 1, date.getFullYear())}</p>
      <button onClick={() => setDate(getPreviousMonth())}>{"<-"}</button>
      <button onClick={() => setDate(getNextMonth())}>{"->"}</button>
      <div className="day-of-week">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>

      <div className="day-of-week">
        {calendar &&
          calendar.map((day, index) => {
            return (
              <button
                key={index}
                title={day.date}
                className={day.isCurrentMonth ? "current-month" : ""}
              >
                {day.monthDayNumber}
              </button>
            );
          })}
      </div>
    </div>
  );
}

export default App;
