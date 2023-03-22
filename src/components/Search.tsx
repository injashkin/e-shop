import "./Search.css";

interface SearchProps {
  text: string;
  icon: string;
  parentClass: string;
}

export default function Search(props: SearchProps) {
  const { text, icon, parentClass } = props;

  return (
    <div className={`search ${parentClass}__search`}>
      <input type="text" id={`${parentClass}-search`} placeholder={text} />
      <div>
        <img src={icon} />
      </div>
    </div>
  );
}
