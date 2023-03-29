import "./Checkbox.css";

interface ICheckbox {
  label: string;
  type?: "checkbox" | "radio";
  count?: string;
  value?: string;
}

export default function Checkbox(props: ICheckbox) {
  const { label, type = "checkbox", count, value = "" } = props;
  let mod = "checkbox";

  if (type === "radio") mod = "radio";

  return (
    <label className="checkbox__label">
      <span>
        {label} {count && <span className="checkbox-count">{count}</span>}
      </span>

      <input className="checkbox__input" name="radio" type={mod} value={value} />
      <span className={`checkbox__span checkbox__span--${mod}`}></span>
    </label>
  );
}
