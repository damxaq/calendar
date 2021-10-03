import { AnyAction } from "redux";

interface EventsState {
  events: Array<any>;
}

const initState: EventsState = {
  events: [],
};

const rootReducer = (state = initState, action: AnyAction) => {
  return state;
};

export default rootReducer;
