import "./Checkbox.css"

export default function Checkbox(props) {
  const {id, name, count} = props
  return (
    <label className="checkbox__label">
      <span>
        {name} <span className="checkbox-count">{count}</span>
      </span>
      <input className="checkbox__input" type="checkbox" value="apple" />
      <span className="checkbox__span"></span>
    </label>
  );
}
