import "./Search.css";
import search from "../assets/search.svg";

interface SearchProps {
  text?: string;
  icon?: string;
  className?: string;
}

export default function Search(props: SearchProps) {
  const { text="Поиск...", icon, className } = props;

  return (
    <div className={`search ${className}`}>
      <input type="text" id={`${className}-search`} placeholder={text} />
      <div>
        <img src={icon} />
      </div>
    </div>
  );
}
