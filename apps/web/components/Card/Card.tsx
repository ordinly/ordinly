import { Button } from "@components/Button";

import styles from "./Card.module.css";

import type { CardProps } from "./types";

const Card = ({ title, children, onEditClick, actions }: CardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {title || actions || onEditClick ? (
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>

            {actions}

            {onEditClick ? (
              <div>
                <Button text="Edit" icon="edit" onClick={onEditClick} />
              </div>
            ) : null}
          </div>
        ) : null}

        {children}
      </div>
    </div>
  );
};

export default Card;
