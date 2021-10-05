import { createReducer } from "@reduxjs/toolkit";
import { addEvent, deleteEvent, editEvent } from "../actions/eventActions";
import { Event } from "../../models/event";
import { initFakeEvents } from "../../utils/faker.helpers";

interface EventsState {
  events: Array<Event>;
}

const fakeEvents = initFakeEvents();

const initialEvents: Array<Event> = fakeEvents;

const initialState: EventsState = {
  events: initialEvents ? initialEvents : Array<Event>(),
};

const eventReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addEvent, (state, action) => {
      state.events.push(action.payload!);
    })
    .addCase(deleteEvent, (state, action) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
    })
    .addCase(editEvent, (state, action) => {
      if (action.payload) {
        state.events = state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        );
      }
    });
});

export default eventReducer;
