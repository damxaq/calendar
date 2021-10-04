import "./eventCard.css";
import { Event } from "../../models/event";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../../store/actions/eventActions";

interface PropTypes {
  event: Event;
}

const EventCard = ({ event }: PropTypes) => {
  const dispatch = useDispatch();

  const handleDeleteEvent = () => {
    dispatch(deleteEvent(event.id));
  };

  return (
    <div className="event-element">
      <button
        onClick={() => {
          handleDeleteEvent();
        }}
      >
        X
      </button>
      <p>{event.title}</p>
      <p>{event.date}</p>
      <p>{event.time}</p>
      <p>{event.description}</p>
    </div>
  );
};

export default EventCard;
