import "./dayPreview.css";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { formatedDateFull, parseDate } from "../../utils/date.helpers";

interface ParamTypes {
  date: string;
}

const DayPreview = () => {
  const { date } = useParams<ParamTypes>();

  const dateObject = parseDate(date);
  const dateTitle = formatedDateFull(dateObject);

  const events = [
    " oqwhdfdfgdoqw oqw oqw d",
    "kqwjnd oqwhdeergoqw oqw oqw d",
    "kqwjnd oqwhdoqw oqw oererqw d",
    "kqwjnd  oqw oqw d",
  ];

  return (
    <div>
      <Header title="Today Events" date={dateTitle} />
      <div className="event-list">
        {events.map((event, index) => {
          return (
            <div className="event-element" key={index}>
              {event}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayPreview;
