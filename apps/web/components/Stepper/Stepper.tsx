import styles from "./Stepper.module.css";

import type { StepperProps } from "./types";

const Stepper = ({ steps, current }: StepperProps) => {
  return (
    <ul className={styles.steps}>
      {steps.map(({ text }, index) => (
        <li
          key={index}
          className={`${styles.step} ${index < current ? styles.done : ""} ${
            index == current ? styles.active : ""
          }`}
        >
          <span
            className={`${styles.number} ${
              index < current ? styles.done : ""
            } ${index == current ? styles.active : ""}`}
          >
            {index + 1}
          </span>
          {text}
        </li>
      ))}
    </ul>
  );
};

export default Stepper;
