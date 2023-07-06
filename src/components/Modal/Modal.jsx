import styles from './Modal.module.css';
import React from 'react';
const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  width = 500,
  height = 500,
}) => {
  const modalRef = React.useRef(null);

  const handleClose = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  return (
    <div
      className={`${styles.modal} ${isOpen ? styles.isOpen : ''}`}
      ref={modalRef}
      onClick={handleClose}
    >
      <div
        className={`${styles.contentContainer}`}
        style={{ width: width, height: height }}
      >
        <div className={`${styles.header}`}>
          <h1 className={`${styles.title}`}>{title}</h1>
          <p className={`${styles.closeBtn}`} onClick={onClose}>
            &times;
          </p>
        </div>
        <div className={`${styles.content}`}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
