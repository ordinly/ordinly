import { Checkbox } from "@components/Checkbox";
import styles from "./Checklist.module.css";

import type { ChecklistProps } from "./types";

const Checklist = ({ value = [], onChange }: ChecklistProps) => {
  const onCheckItem = ({ complete, order }) => {
    onChange(
      value
        .map(({ order: current, name, ...rest }) =>
          current === order
            ? { name, order, complete }
            : { name, order, ...rest }
        )
        .sort(({ order: aOrder }, { order: bOrder }) =>
          aOrder > bOrder ? 1 : -1
        )
    );
  };

  return (
    <ul className={styles.container}>
      {value.map(({ name, complete, order }) => (
        <li key={order}>
          <Checkbox
            value={complete}
            onChange={(newValue) => {
              onCheckItem({ complete: newValue, order });
            }}
          />{" "}
          {name}
        </li>
      ))}
    </ul>
  );
};

export default Checklist;
