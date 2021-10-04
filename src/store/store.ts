import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./reducers/eventReducer";

export default configureStore({
  reducer: { events: eventReducer },
});
