import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import "./eventForm.css";
import { addEvent } from "../../store/actions/eventActions";

interface PropTypes {
  setAddEventModalVisible: (_: boolean) => void;
  date: string;
}

const EventForm = ({ setAddEventModalVisible, date }: PropTypes) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setTime("");
    setAddEventModalVisible(false);
  };

  const handleAddEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newEvent = {
      title,
      description,
      time,
      date,
      id: nanoid(),
    };
    dispatch(addEvent(newEvent));
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
        <button type="submit" className="add-button">
          {" "}
          Add{" "}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
