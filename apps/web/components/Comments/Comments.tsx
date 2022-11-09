import Comment from "./Comment";

import styles from "./Comments.module.css";

import type { CommentsProps } from "./types";

const Comments = ({ comments }: CommentsProps) => {
  return (
    <div>
      {comments?.length ? (
        <ul className={styles.list}>
          {comments.map((comment) => (
            <Comment {...comment} />
          ))}
        </ul>
      ) : (
        <p className={styles.noItems}>No comments to display</p>
      )}
      {}
    </div>
  );
};

export default Comments;
