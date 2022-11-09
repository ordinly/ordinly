import { CloseButton } from "@components/CloseButton";

import styles from "./ListItem.module.css";

import type { ListItemProps } from "./types";

const ListItem = ({
  text,
  onRemove,
  index,
  hideActions = false,
}: ListItemProps) => {
  return (
    <li className={styles.item}>
      <span className={styles.text}>{text}</span>

      {!hideActions ? (
        <div>
          <CloseButton
            id={`remove-item-${index}-button`}
            icon="trash"
            onClick={() => onRemove(index)}
          />
        </div>
      ) : null}
    </li>
  );
};

export default ListItem;
