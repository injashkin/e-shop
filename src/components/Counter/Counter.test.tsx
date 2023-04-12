import { render, screen, cleanup } from "@testing-library/react";
import Counter from "./Counter";
import "@testing-library/jest-dom";

describe("Компонент Counter", () => {
  beforeEach(() => {
    const quantity = 15;
    const changeInputValue = vi.fn();
    const minus = vi.fn();
    const plus = vi.fn();
    render(
      <Counter
        quantity={quantity}
        changeValue={changeInputValue}
        minus={minus}
        plus={plus}
      />
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("должно быть в поле показано 15", () => {
    expect(screen.getByDisplayValue("15")).toBeDefined();
  })

  it("должна отрендерена кнопка с надписью '+'", () => {
    expect(screen.getByRole("button", {name: "+"})).toBeInTheDocument();
  })

  it("должна отрендерена кнопка с надписью '-'", () => {
    expect(screen.getByRole("button", {name: "-"})).toBeInTheDocument();
  })
});
