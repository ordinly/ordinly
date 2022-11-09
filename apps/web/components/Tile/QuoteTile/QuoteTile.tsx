import { useRouter } from "next/router";

import { Tile } from "@components/Tile";

import styles from "./QuoteTile.module.css";

import type { QuoteTileProps } from "./types";

const QuoteTile = ({ _id, quoteDate, number, total }: QuoteTileProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        "update-quote": true,
        "quote-id": _id,
      },
    });
  };

  return (
    <Tile id={_id} onClick={onClick}>
      <div className={styles.container}>
        <div className={styles.text}>
          <div>
            <h4 className={styles.title}>Quote #{number}</h4>
            <p className={styles.description}>
              <span className={styles.bold}>Quote date:</span>{" "}
              {quoteDate.toString()}
            </p>
            <p className={styles.description}>
              <span className={styles.bold}>Total</span> ${total}
            </p>
          </div>
        </div>
      </div>
    </Tile>
  );
};

export default QuoteTile;
