import { useEffect, useRef, useContext } from "react";

import ChatContext from "@contexts/ChatContext";

import formatDate from "@util/formatDate";

import styles from "./Message.module.css";

const Message = ({ createdAt, message, name, sent, last }) => {
  const { chat } = useContext(ChatContext);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref && last) {
      ref.current.scrollIntoView();
    }
  }, []);

  useEffect(() => {
    if (ref && last) {
      if (ref.current.getBoundingClientRect().bottom <= window.innerHeight) {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [last, chat]);

  return (
    <div className={`${styles.container} ${sent ? styles.sent : ""}`} ref={ref}>
      <div
        className={`${styles.message} ${sent ? styles.sent : styles.recieved}`}
      >
        <h4 className={styles.name}>
          {name} - {formatDate(createdAt)}
        </h4>
        <p className={styles.text}>{message}</p>
      </div>
    </div>
  );
};

export default Message;
