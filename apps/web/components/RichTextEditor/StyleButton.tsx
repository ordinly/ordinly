import { Icon } from "@components/Icon";

import styles from "./RichTextEditor.module.css";

const StyleButton = ({ icon, onClick, active }) => {
  return (
    <span
      className={`${styles.action} ${active ? styles.active : ""}`}
      onMouseDown={onClick}
    >
      <Icon icon={icon} />
    </span>
  );
};

export default StyleButton;
