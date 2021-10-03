import { Route, Switch } from "react-router-dom";

import Calendar from "./views/Calendar/Calendar";
import DayPreview from "./views/DayPreview/DayPreview";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Calendar} />
      <Route path="/day/:date" component={DayPreview} />
      {/* <Route path="/day/:date" render={(props) => <DayPreview {...props} />} /> */}
    </Switch>
  );
}

export default App;
