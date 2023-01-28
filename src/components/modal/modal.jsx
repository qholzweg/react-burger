import React from 'react';
import ReactDOM from "react-dom";
import ModalOverlay from './modal-ovelay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css'

const modalRoot = document.getElementById("react-modals");

const ModalHeader = (props) => (
  <div className={styles.ModalHeader}>
    <h2 className='text text_type_main-large'>{props.children}</h2>
    <button className={styles.closeButton} onClick={props.onClose}>
      <CloseIcon type="primary" />
    </button>
  </div>
);

export default function Modal ({ children, title, onClose }) {

    React.useEffect(() => {
      const handleEsc = (e) => {
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
          {children}
        </div>
        <ModalOverlay onClose={onClose} />
      </>,
      modalRoot
    );
  }
