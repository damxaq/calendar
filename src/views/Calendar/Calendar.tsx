import { useState, useEffect } from "react";

import {
  daysInMonth,
  getNextMonth,
  getPreviousMonth,
  getNameOfTheDay,
  getNameOfTheMonth,
  initiateCalendar,
} from "../../utils/date.helpers";

const Calendar = () => {
  const [dateToShow, setDateToShow] = useState(new Date());
  const [calendar, setCalendar] = useState<Array<any>>([]);

  useEffect(() => {
    if (dateToShow) {
      const calendarData = initiateCalendar(dateToShow);
      setCalendar(calendarData!);
    }
  }, [dateToShow]);

  console.log(calendar);

  return (
    <div>
      <p>{getPreviousMonth(dateToShow).toString()}</p>
      <p>
        {getNameOfTheDay(dateToShow)} {dateToShow.getDate()}{" "}
        {getNameOfTheMonth(dateToShow)} {dateToShow.getFullYear()}
      </p>
      <p>{daysInMonth(dateToShow.getMonth() + 1, dateToShow.getFullYear())}</p>
      <button onClick={() => setDateToShow(getPreviousMonth(dateToShow))}>
        {"<-"}
      </button>
      <button onClick={() => setDateToShow(getNextMonth(dateToShow))}>
        {"->"}
      </button>
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
};

export default Calendar;
