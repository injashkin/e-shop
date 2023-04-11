import { useState } from "react";
import Button from "../Button/Button";
import "./counter.css";

interface ICounter {
  initValue: number;
  onChangeValue: (values: number) => void
}

export default function Counter({onChangeValue, initValue}: ICounter) {
  const [value, setValue] = useState(initValue);

  console.log("child", value)

  const minus = () => {
    if (value > 0) {
      setValue(value - 1);
    } else setValue(value);
    onChangeValue(value)
  };

  const plus = () => {
    setValue(value + 1);
    onChangeValue(value)
  };

  //const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
  //  setValue(+(e.target as HTMLInputElement).value);
  //};


  return (
    <div className="counter">
      <Button text="-" className="shop-card__minus" onClick={minus} />
      <input
        type="number"
        id="card-quantity"
        name="quantity"
        className="quantity"
        value={value}
        //onInput={(e) => handleInput(e)}
      ></input>
      <Button text="+" className="shop-card__plus" onClick={plus} />
    </div>
  );
}
