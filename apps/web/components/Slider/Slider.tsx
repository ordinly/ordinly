import { useState, useEffect, useRef, useCallback } from "react";

import styles from "./Slider.module.css";

import { SliderProps } from "./types";

const Slider = ({
  id,
  value,
  onChange,
  min,
  max,
  variant = "single",
}: SliderProps) => {
  const [tempValue, setTempValue] = useState(
    value ? value : variant === "range" ? [min, max] : [min]
  );

  const [moved, setMoved] = useState(false);

  const [current, setCurrent] = useState(undefined);

  const ref = useRef(undefined);

  const getPositionFromValue = (current) => {
    return ((current - min) / (max - min)) * 100;
  };

  const getValueFromPosition = (position) => {
    return (position / 100) * (max - min) + min;
  };

  const setActiveHandleIndex = (index) => {
    setCurrent(index);
  };

  const clickEndHandler = useCallback(() => {
    setCurrent(undefined);
  }, []);

  const moveHandler = useCallback(({ pageX }) => drag(pageX), [current]);

  const drag = useCallback(
    (xPosition) => {
      if (![undefined, null].includes(current)) {
        const sliderCoordinates = ref?.current?.getBoundingClientRect();

        const cursorPosition =
          ((xPosition - sliderCoordinates.left) /
            (sliderCoordinates.right - sliderCoordinates.left)) *
          100;

        let cursorValue;

        if (cursorPosition < 0) {
          cursorValue = min;
        } else if (cursorPosition > 100) {
          cursorValue = max;
        } else {
          cursorValue = getValueFromPosition(cursorPosition);
        }

        let newValues = [...tempValue];

        newValues[current] = Math.trunc(cursorValue);

        if (!newValues.every((value, index) => value === tempValue[index])) {
          setMoved(true);
          setTempValue(newValues);
        }
      }
    },
    [current]
  );

  useEffect(() => {
    document.addEventListener("mouseup", clickEndHandler);
    document.addEventListener("touchend", clickEndHandler);
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("touchmove", moveHandler);

    return () => {
      document.removeEventListener("mouseup", clickEndHandler);
      document.removeEventListener("touchend", clickEndHandler);
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("touchmove ", moveHandler);
    };
  });

  useEffect(() => {
    if (moved) {
      onChange(tempValue);
    }
  }, [tempValue]);

  return (
    <div id={id} className={styles.container}>
      <div className={styles.rail} ref={ref}>
        <div className={styles.value}>{min}</div>
        <div className={styles.value}>{max}</div>

        {tempValue.map((currentValue, index) => (
          <div
            title={value[index]?.toString()}
            className={`${styles.handle} ${
              current === index ? styles.active : ""
            }`}
            style={{ left: `${getPositionFromValue(currentValue)}%` }}
            onMouseDown={() => setActiveHandleIndex(index)}
            onTouchStart={() => setActiveHandleIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
