import { Icon } from "@components/Icon";

import styles from "./CloseButton.module.css";

import type { CloseButtonProps } from "./types";

const CloseButton = ({
  id,
  onClick,
  icon = "close",
  htmlTitle = "Close",
}: CloseButtonProps) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className={styles.button}
      title={htmlTitle}
    >
      <Icon icon={icon} />
    </button>
  );
};

export default CloseButton;
