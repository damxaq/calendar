import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import "./calendar.css";

import {
  getNextMonth,
  getPreviousMonth,
  initiateCalendar,
  formatedDateMonth,
} from "../../utils/date.helpers";

const Calendar = () => {
  const [dateToShow, setDateToShow] = useState(new Date());
  const [calendar, setCalendar] = useState<Array<any>>([]);
  const today = new Date().toLocaleDateString();

  useEffect(() => {
    if (dateToShow) {
      const calendarData = initiateCalendar(dateToShow);
      setCalendar(calendarData!);
    }
  }, [dateToShow]);

  return (
    <div>
      <Header title="Calendar" date={formatedDateMonth(dateToShow)} />
      <Navigation
        buttonLeft={() => setDateToShow(getPreviousMonth(dateToShow))}
        buttonRight={() => setDateToShow(getNextMonth(dateToShow))}
      />
      <div className="calendar-container">
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
                <Link to={`/day/${day.date}`} key={index}>
                  <button
                    title={day.date}
                    className={`day-button ${
                      day.isCurrentMonth ? "current-month" : ""
                    } ${day.date === today ? "current-day" : ""}`}
                  >
                    {day.monthDayNumber}
                  </button>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
