import { render } from "@testing-library/react";
import Modal from "./Modal";

describe("Модальное окно", () => {
  test("должен отображать окно с текстом", () => {
    const component = render(
      <Modal
        title="Спасибо за заказ"
        text="Наш менеджер свяжется с вами в ближайшее время"
        show={true}
        closeModal={(e) => e}
      ></Modal>
    );
    expect(component).toMatchSnapshot();
  });
});
