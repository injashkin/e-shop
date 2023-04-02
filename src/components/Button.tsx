import "./Button.css";

interface ButtonProps {
  text?: string;
  icon?: string;
  name?: string;
  className?: string;
  //onClick: (name: string | undefined) => (event: any) => void;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button(props: ButtonProps) {
  const { text, icon, className="", name, onClick } = props;
  let classes = className;

  if (!text) classes = `${classes} btn-round`;
  if (text === "+" || text === "-") classes = `${classes} btn-sm`;

  return (
    <div className={classes && `${classes}-btn-wrap`}>
      <button
        type="button"
        className={`btn ${classes}`}
        name={name}
        onClick={(e) => onClick(e)}
      >
        {text}
        {icon && <img src={icon}></img>}
      </button>
    </div>
  );
}
