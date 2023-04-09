import "./modal.css";
import close from "../../assets/close.svg";
import { ReactNode } from "react";

interface IModal {
  show?: boolean;
  className?: string;
  onClose: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  title?: string;
  text?: string;
  children?: ReactNode;
}

const Modal = ({
  show = true,
  title,
  text,
  onClose,
  className,
  children,
}: IModal) => {
  let classes = "";

  if (show) {
    classes = className
      ? `modal modal--show ${className}`
      : "modal modal--show";
  } else classes = className ? `modal ${className}` : "modal";
  //className={`modal${className && `" "${className}`}`}

  return (
    <div className={classes} onClick={(e) => onClose(e)}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <img
          className="modal__img-close"
          src={close}
          alt="Close"
          onClick={(e) => onClose(e)}
        />
        <>{children}</>
        <div className="modal__title">{title}</div>
        <p className="modal__text">{text}</p>
      </div>
    </div>
  );
};

export default Modal;
