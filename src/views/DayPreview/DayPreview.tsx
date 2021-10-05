import { useState } from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import { createSelector } from "reselect";
import "./dayPreview.css";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import EventForm from "../../components/Form/EventForm";
import EventCard from "../../components/Event/EventCard";
import WeatherView from "../../components/Weather/WeatherView";
import Navigation from "../../components/Navigation/Navigation";
import { formatedDateFull, parseDate } from "../../utils/date.helpers";
import { Event } from "../../models/event";

interface ParamTypes {
  date: string;
}

const DayPreview = () => {
  const { date } = useParams<ParamTypes>();
  const [addEventModalVisible, setAddEventModalVisible] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<Event>();

  const dateObject = parseDate(date);
  const dateTitle = formatedDateFull(dateObject);

  const selectEventsByDate = createSelector(
    (state: RootStateOrAny) => state.event.events,
    (events) =>
      events
        .filter((event: Event) => event.date === date)
        .sort((first: Event, second: Event) =>
          first.time > second.time ? 1 : second.time > first.time ? -1 : 0
        )
  );

  const events = useSelector(selectEventsByDate);

  return (
    <div className="day-main">
      <Header title="Today Events" date={dateTitle} />
      <Navigation
        buttonLeft={() => {}}
        buttonRight={() => {}}
        date={dateObject}
      />
      <WeatherView date={date} />
      <button
        onClick={() => setAddEventModalVisible(!addEventModalVisible)}
        className="add-event-button"
      >
        {addEventModalVisible ? "Cancel" : "Add Event"}
      </button>
      {(addEventModalVisible ||
        (eventToEdit && Object.keys(eventToEdit).length > 0)) && (
        <EventForm
          setAddEventModalVisible={setAddEventModalVisible}
          date={date}
          event={eventToEdit}
          setEventToEdit={setEventToEdit}
        />
      )}
      <div className="event-list">
        {events.map((event: Event) => {
          return (
            <EventCard
              event={event}
              key={event.id}
              setEventToEdit={setEventToEdit}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DayPreview;
