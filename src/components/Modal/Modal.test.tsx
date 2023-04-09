import { fireEvent, getByText, render, screen } from "@testing-library/react";
import Modal from "./Modal";

describe("Модальное окно", () => {
  test("должен отобразить окно с текстом", () => {
    const component = render(
      <Modal
        title="Спасибо за заказ"
        text="Наш менеджер свяжется с вами в ближайшее время"
        show={true}
        onClose={(e) => e}
      ></Modal>
    );
    expect(component).toMatchSnapshot();
  });

  test("должен закрыть окно при нажатии на крестик", () => {
    const closeModal = vi.fn();

    const component = render(
      <Modal show={true} onClose={(e) => closeModal(e)}>
        <div>test</div>
      </Modal>
    );
    expect(screen.getByText("test")).toBeTruthy();

    fireEvent.click(screen.getByAltText(/close/i));
    expect(closeModal).toHaveBeenCalledTimes(1);
  });

  test("должен закрыть окно при нажатии на крестик", () => {});
});
