import "./Button.css";

interface ButtonProps {
  text: string;
  icon: string;
  id: string;
  className: string;
  name: string;
}

export default function Button(props: ButtonProps) {
  const { id, text, icon, className, name } = props;
  return (
    <div className="card-action">
      <button type="button" id={id} className={className} name={name}>
        <span>{text}</span>
        <img src={icon}></img>
      </button>
    </div>
  );
}
