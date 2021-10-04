import "./navigation.css";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import { addDays } from "../../utils/date.helpers";

interface PropTypes {
  buttonLeft: () => void;
  buttonRight: () => void;
  date?: Date;
}

const Navigation = ({ buttonLeft, buttonRight, date }: PropTypes) => {
  let nextDay = "/";
  let previousDay = "/";
  if (date) {
    nextDay = `/day/${addDays(date, 1).toLocaleDateString()}`;
    previousDay = `/day/${addDays(date, -1).toLocaleDateString()}`;
  }

  return (
    <div className="navigation-container">
      {date && (
        <Link to="/" className="back-button">
          <i className="fa fa-fast-backward" />
        </Link>
      )}
      <Link to={previousDay}>
        <button onClick={buttonLeft}>
          <i className="fa fa-arrow-left" />
        </button>
      </Link>
      <Link to={nextDay}>
        <button onClick={buttonRight}>
          <i className="fa fa-arrow-right" />
        </button>
      </Link>
    </div>
  );
};

export default Navigation;
