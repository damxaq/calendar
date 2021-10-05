import "./header.css";

interface PropTypes {
  title: string;
  date: string;
}

const Header = ({ title, date }: PropTypes) => {
  return (
    <header className="header-style">
      <h2>{title}</h2>
      <h3>{date}</h3>
    </header>
  );
};

export default Header;
