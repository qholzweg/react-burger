import React, {FC} from 'react';
import ReactDOM from "react-dom";
import ModalOverlay from './modal-ovelay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css'

const modalRoot = document.getElementById("react-modals") as HTMLDivElement;

export type TModal =  {
  title?: string;
  onClose: () => void;
} & React.AllHTMLAttributes<HTMLDivElement>;

const ModalHeader: FC<TModal> = ({onClose, ...props}) => (
  <div className={styles.ModalHeader}>
    <h2 className='text text_type_main-large'>{props.children}</h2>
    <button className={styles.closeButton} onClick={onClose}>
      <CloseIcon type="primary" />
    </button>
  </div>
);

const Modal: FC<TModal> = ({ title, onClose, ...props }) => {

    React.useEffect(() => {
      const handleEsc = (e:KeyboardEvent) => {
        e.key === "Escape" && onClose();
      };

      document.addEventListener("keydown", handleEsc);
      return () => {
        document.removeEventListener("keydown", handleEsc);
      }
    }, [onClose]);
    
    return ReactDOM.createPortal(
      <>
        
        <div className={styles.Modal}>
          <ModalHeader onClose={onClose}>{title}</ModalHeader>
          {props.children}
        </div>
        <ModalOverlay onClose={onClose} />
      </>,
      modalRoot
    );
  }
export default Modal;