import "./eventCard.css";
import { Event } from "../../models/event";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../../store/actions/eventActions";
import "font-awesome/css/font-awesome.min.css";

interface PropTypes {
  event: Event;
  setEventToEdit: (event: Event) => void;
}

const EventCard = ({ event, setEventToEdit }: PropTypes) => {
  const dispatch = useDispatch();

  const handleDeleteEvent = () => {
    dispatch(deleteEvent(event.id));
  };

  const handleEdit = () => {
    setEventToEdit(event);
  };

  return (
    <div className="event-element">
      <div className="top-card">
        <button
          className="edit-button"
          onClick={() => {
            handleEdit();
          }}
        >
          <i className="fa fa-edit" />
        </button>
        <p>{event.time}</p>
        <button
          className="delete-button"
          onClick={() => {
            handleDeleteEvent();
          }}
        >
          <i className="fa fa-trash" />
        </button>
      </div>
      <h4>{event.title}</h4>
      <p>{event.description}</p>
    </div>
  );
};

export default EventCard;
