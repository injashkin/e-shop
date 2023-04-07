import "./modal.css";
import close from "../../assets/close.svg";

interface IModal {
  closeModal: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  title: string;
  text: string;
  children: HTMLElement | JSX.Element;
}

const Modal = ({ title, text, closeModal, children }: IModal) => {
  return (
    <div className="modal" onClick={(e) => closeModal(e)}>
      <div className="modal__content" onClick={(e) => e.stopPropagation}>
        <img className="modal__img-close" src={close} />
        <>{children}</>
        <div className="modal__title">{title}</div>
        <p className="modal__text">{text}</p>
      </div>
    </div>
  );
};

export default Modal;
