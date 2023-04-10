import { fireEvent, render, screen } from "@testing-library/react";
import Modal from "./Modal";

describe("Модальное окно", () => {
  it("должен отобразить окно с текстом", () => {
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

  it("должен закрыть окно при нажатии на крестик", () => {
    const closeModal = vi.fn();

    const component = render(
      <Modal show={true} onClose={(e) => closeModal(e)}>
        <div>test</div>
      </Modal>
    );
    expect(component.getByText("test")).toBeTruthy();

    fireEvent.click(screen.getByAltText(/close/i));
    expect(closeModal).toHaveBeenCalledTimes(1);
  });

  it("должен закрыть окно при нажатии на крестик", () => {});
});
