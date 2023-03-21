import "./Search.css"

interface SearchProps {
  text: string;
  icon: string;
  id: string;
  className: string;
  name: string;
}

export default function Search(props: SearchProps) {
  const { id, text, icon, className, name } = props;

  return (
    <div className="search">
      <input type="text" id={id} className={className} name={name} placeholder={text} />
      <img src={icon}></img>
    </div>
  );
}
