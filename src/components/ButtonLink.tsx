import { Link } from "react-router-dom";
import "./Button.css";


interface ButtonProps {
  href: string;
  icon: string;
  className: string;
  text: string;
}

export default function Button(props: ButtonProps) {
  const { href, icon, className, text } = props;
  return (
    <div className="card-action">
      <Link to={href} className={`btn ${className}`}>
        {text}
        <img src={icon}></img>
      </Link>
    </div>
  );
}