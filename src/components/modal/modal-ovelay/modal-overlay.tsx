import styles from './modal-overlay.module.css';
import React, { FC } from 'react';
import { TModal } from '../modal';

const ModalOverlay: FC<TModal> = ({ onClose, ...props }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      {props.children}
    </div>
  )
}
export default ModalOverlay;