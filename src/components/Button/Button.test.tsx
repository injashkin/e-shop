import { render, screen, cleanup } from "@testing-library/react";
import Button from "./Button";
import "@testing-library/jest-dom";

describe("Компонент Button", () => {
  beforeEach(() => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} text="Submit" />);
  });

  afterEach(() => {
    cleanup();
  });

  test("Button должен быть отрендерен", () => {
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("На кнопке должна быть надпись 'Submit'", () => {
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Submit");
  });
});
