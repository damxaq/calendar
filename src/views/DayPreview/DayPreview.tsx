import { useState } from "react";
import { useSelector, RootStateOrAny } from "react-redux";

import "./dayPreview.css";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import EventForm from "../../components/Form/EventForm";
import EventCard from "../../components/Event/EventCard";
import { formatedDateFull, parseDate } from "../../utils/date.helpers";
import { Event } from "../../models/event";

interface ParamTypes {
  date: string;
}

const DayPreview = () => {
  const { date } = useParams<ParamTypes>();
  const [addEventModalVisible, setAddEventModalVisible] = useState(false);

  const dateObject = parseDate(date);
  const dateTitle = formatedDateFull(dateObject);
  const events = useSelector((state: RootStateOrAny) => state.events.events);

  return (
    <div>
      <Header title="Today Events" date={dateTitle} />
      <button onClick={() => setAddEventModalVisible(!addEventModalVisible)}>
        +
      </button>
      {addEventModalVisible && (
        <EventForm
          setAddEventModalVisible={setAddEventModalVisible}
          date={date}
        />
      )}
      <div className="event-list">
        {events.map((event: Event) => {
          return <EventCard event={event} key={event.id} />;
        })}
      </div>
    </div>
  );
};

export default DayPreview;
