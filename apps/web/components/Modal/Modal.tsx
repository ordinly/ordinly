import styles from "./Modal.module.css";

import { Button } from "@components/Button";
import { CloseButton } from "@components/CloseButton";
import { Portal } from "@components/Portal";

import type { ModalProps } from "./types";

const Modal = ({
  title,
  onClose,
  open,
  children,
  actions = [],
  id,
  closeOnBackdropClick = true,
  closeText = "Cancel",
}: ModalProps) => {
  return (
    <>
      {open ? (
        <Portal>
          <div
            className={`${styles.background} ${open ? styles.open : ""}`}
            onClick={() => {
              if (closeOnBackdropClick) {
                onClose();
              }
            }}
          >
            <dialog
              id={id}
              className={`${styles.modal} ${open ? styles.open : ""}`}
              open={open}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>

                <CloseButton onClick={onClose} id={`${id}-close-button`} />
              </div>

              {children}

              <div className={styles.actionsContainer}>
                <Button text={closeText} variant="outline" onClick={onClose} />

                {actions?.map((action, index) => (
                  <Button key={`${action.id}-${index}`} {...action} />
                ))}
              </div>
            </dialog>
          </div>
        </Portal>
      ) : null}
    </>
  );
};

export default Modal;
