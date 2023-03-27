import "./Button.css";

interface ButtonProps {
  text?: string;
  icon?: string;
  name?: string;
  className?: string;
  onClick?: () => void;
  onMouseUp?: () => void;
}

export default function Button(props: ButtonProps) {
  const { text, icon, className, name, onClick, onMouseUp } = props;
  let classes = className;

  if (!text) classes = `${classes} btn-round`;
  if (text === "+" || text === "-") classes = `${classes} btn-sm`;

  return (
    <div className="card-action">
      <button
        type="button"
        className={`btn ${classes}`}
        name={name}
        onClick={onClick}
        onMouseUp={onMouseUp}
      >
        {text}
        {icon && <img src={icon}></img>}
      </button>
    </div>
  );
}
