import "./Button.css";

interface ButtonProps {
  text: string;
  icon: string;
  parentClass: string;
  name: string;
}

export default function Button(props: ButtonProps) {
  const { text, icon, parentClass, name } = props;
  return (
    <div className="card-action">
      <button type="button" className={`btn ${parentClass}__btn`} name={name}>
        {text}
        <img src={icon}></img>
      </button>
    </div>
  );
}
