import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import "./eventForm.css";
import { addEvent, editEvent } from "../../store/actions/eventActions";
import { Event } from "../../models/event";

interface PropTypes {
  setAddEventModalVisible: (_: boolean) => void;
  date: string;
  event?: Event;
  setEventToEdit: (event: Event) => void;
}

const EventForm = ({
  setAddEventModalVisible,
  date,
  event,
  setEventToEdit,
}: PropTypes) => {
  const dispatch = useDispatch();
  const isEditing = event && Object.keys(event).length > 0;
  const [title, setTitle] = useState(isEditing ? event.title : "");
  const [description, setDescription] = useState(
    isEditing ? event.description : ""
  );
  const [time, setTime] = useState(isEditing ? event.time : "");

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setTime("");
    setAddEventModalVisible(false);
  };

  const handleAddEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditing) {
      const newEvent = {
        title,
        description,
        time,
        date: event.date,
        id: event.id,
      };
      dispatch(editEvent(newEvent));
      setEventToEdit({} as Event);
    } else {
      const newEvent = {
        title,
        description,
        time,
        date,
        id: nanoid(),
      };
      dispatch(addEvent(newEvent));
    }

    clearForm();
  };

  return (
    <div>
      <h2>Add Event</h2>
      <form onSubmit={handleAddEvent}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            autoComplete="off"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="description-input"
          />
        </div>
        <div>
          <label htmlFor="time">Time</label>
          <input
            type="time"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="time-input"
          />
        </div>
        {isEditing ? (
          <button type="submit" className="add-button">
            Save
          </button>
        ) : (
          <button type="submit" className="add-button">
            Add
          </button>
        )}
      </form>
    </div>
  );
};

export default EventForm;
