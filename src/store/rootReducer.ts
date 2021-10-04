import { AnyAction } from "redux";
import { addEvent } from "./actions/eventActions";

interface EventsState {
  events: Array<any>;
}

const initState: EventsState = {
  events: [],
};

const rootReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default rootReducer;
