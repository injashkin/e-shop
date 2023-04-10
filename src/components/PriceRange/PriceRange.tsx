import "./price-range.css";

interface IPriceRange {
  defaultMin: string;
  defaultMax: string;
  getMin: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getMax: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PriceRange({
  defaultMin,
  defaultMax,
  getMin,
  getMax,
}: IPriceRange) {
  return (
    <div className="price-range">
      <div>
        <input
          onChange={(e) => getMin(e)}
          //defaultValue={defaultMin}
          value={defaultMin}
          name="filter-min"
          type="number"
        />
      </div>
      -
      <div>
        <input
          onChange={getMax}
          //defaultValue={defaultMax}
          value={defaultMax}
          name="filter-max"
          type="number"
        />
      </div>
    </div>
  );
}
