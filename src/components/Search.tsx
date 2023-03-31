import "./Search.css";
import search from "../assets/search.svg";

interface SearchProps {
  text?: string;
  icon?: string;
  className?: string;
}

export default function Search(props: SearchProps) {
  const { text="Поиск...", icon=search, className="" } = props;

  return (
    <div className={`search ${className}`}>
      <input type="text" placeholder={text} />
      <div>
        <img src={icon} />
      </div>
    </div>
  );
}
