import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import "./calendar.css";
import { useSelector, RootStateOrAny } from "react-redux";
import { createSelector } from "reselect";
import { Event } from "../../models/event";

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

  const selectEventsGroups = createSelector(
    (state: RootStateOrAny) => state.events.events,
    (events) =>
      events.reduce(
        (groups: any, item: Event) => ({
          ...groups,
          [item.date]: [...(groups[item.date] || []), item],
        }),
        {}
      )
  );

  const eventsGroups = useSelector(selectEventsGroups);

  useEffect(() => {
    if (dateToShow && eventsGroups) {
      const calendarData = initiateCalendar(dateToShow);
      calendarData?.map((day) => {
        day.eventsCount = eventsGroups[day.date]?.length;
      });
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
                    {day.eventsCount && (
                      <div className="events-count">({day.eventsCount})</div>
                    )}
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
