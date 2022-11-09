import { Icon } from "@components/Icon";

import styles from "./AccordionItem.module.css";

const AccordionItem = ({
  id,
  open,
  title,
  children,
  onOpen,
  onClose,
  disabled,
  noContent,
}) => {
  return (
    <li id={id}>
      <button
        id={`${id}-header`}
        className={styles.header}
        onClick={() => (!open ? onOpen({ id }) : onClose({ id }))}
        disabled={disabled}
      >
        {title}

        {noContent ? null : (
          <div className={`${styles.iconContainer} ${open ? styles.open : ""}`}>
            <Icon icon="caret-down" />
          </div>
        )}
      </button>

      {!noContent && open ? (
        <div className={styles.contentContainer}>
          <div className={styles.spacer} />
          <div id={`${id}-content`} className={styles.content}>
            {children}
          </div>
        </div>
      ) : null}
    </li>
  );
};

export default AccordionItem;
