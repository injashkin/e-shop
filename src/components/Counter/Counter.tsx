import Button from "../Button/Button";
import "./counter.css";

interface ICounter {
  quantity: number;
  minus: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  plus: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  changeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Counter({
  changeValue,
  quantity,
  minus,
  plus,
}: ICounter) {

  return (
    <div className="counter">
      <Button text="-" className="shop-card__minus" onClick={minus} />
      <input
        type="number"
        id="card-quantity"
        name="quantity"
        className="quantity"
        value={quantity}
        onChange={changeValue}
      ></input>
      <Button text="+" className="shop-card__plus" onClick={plus} />
    </div>
  );
}
