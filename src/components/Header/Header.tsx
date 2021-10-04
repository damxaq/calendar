import "./header.css";

interface PropTypes {
  title: string;
  date: string;
}

const Header = ({ title, date }: PropTypes) => {
  return (
    <header className="header-style">
      <h1>{title}</h1>
      <h2>{date}</h2>
    </header>
  );
};

export default Header;
