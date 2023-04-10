import React, { useState } from "react";
import {render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PriceRange from "./PriceRange";

describe("Диапазон цен", () => {
  beforeEach(() => {
    const DummyParent = () => {
      const [valueMin, setValueMin] = useState("5");
      const [valueMax, setValueMax] = useState("100");
      const handleMin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueMin(event.target.value);
      };
      const handleMax = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueMax(event.target.value);
      };

      return (
        <PriceRange
          defaultMin={valueMin}
          defaultMax={valueMax}
          getMin={handleMin}
          getMax={handleMax}
        />
      );
    };

    const range = render(<DummyParent />)
  });

  test("должно существовать два поля с введенными значениями 5 и 100", () => {
    expect(screen.getByDisplayValue("5")).toBeDefined();
    expect(screen.getByDisplayValue("100")).toBeDefined();
  });

  test("должны быть очищены поля и введены значения 14 и 98", async () => {
    const input1 = document.querySelector("input[name='filter-min']") as HTMLInputElement;
    const input2 = screen.getByDisplayValue("100") as HTMLInputElement;
    await userEvent.clear(input1);
    await userEvent.type(input1, "14");
    await userEvent.clear(input2);
    await userEvent.type(input2, "98");
    
    expect(input1.value).toBe("14");
    expect(input2.value).toBe("98");
  });
});
