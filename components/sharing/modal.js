import styles from "./modal.module.scss";

function Modal({ modalHeader, schowModal, onClose, children }) {
  if (!schowModal) {
    return null;
  }

  return (
    <div className={`${styles.modal}`} onClick={onClose}>
      <div
        className={`${styles.modal__content}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${styles.modal__content__header}`}>
          <p className={`${styles.modal__content__header__title}`}>
            {modalHeader}
          </p>
          <button
            className={styles.modal__content__header__button}
            onClick={onClose}
          >
            <i
              className={
                "aicon-close" +
                " " +
                `${styles.modal__content__header__button__icon}`
              }
            ></i>
          </button>
        </div>
        <div className={`${styles.modal__content__body}`}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
