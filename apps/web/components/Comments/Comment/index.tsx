import formatDate from "@util/formatDate";

import styles from "./Comment.module.css";

import type { CommentProps } from "../types";

const Comment = ({
  _id,
  user,
  text,
  createdDate,
  updatedDate,
  deletedDate,
}: CommentProps) => {
  return (
    <li className={styles.container}>
      <h5 className={styles.user}>
        {user} <span className={styles.date}>{formatDate(createdDate)}</span>
      </h5>

      <p className={styles.text}>{text}</p>
    </li>
  );
};

export default Comment;
