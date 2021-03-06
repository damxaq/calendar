import { createAction } from "@reduxjs/toolkit";
import { Event } from "../../models/event";

export const addEvent = createAction<Event>("addEvent");
export const deleteEvent = createAction<string>("deleteEvent");
export const editEvent = createAction<Event>("editEvent");
