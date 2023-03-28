import "./Checkbox.css";

interface ICheckbox {
  name: string;
  type: "checkbox" | "radio";
  count?: string;
}

export default function Checkbox(props: ICheckbox) {
  const { name, type = "checkbox", count } = props;
  let mod = "checkbox";

  if (type === "radio") mod = "radio";

  return (
    <label className="checkbox__label">
      <span>
        {name} {count && <span className="checkbox-count">{count}</span>}
      </span>

      <input className="checkbox__input" name="radio" type={mod} value="" />
      <span className={`checkbox__span checkbox__span--${mod}`}></span>
    </label>
  );
}
