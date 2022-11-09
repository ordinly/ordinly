import { useState } from "react";

import Star from "./Star";

import styles from "./RatingStars.module.css";

import type { RatingStarsProps } from "./types";

const unitValue = 100;

const RatingStars = ({
  numberOfReviews,
  value,
  onChange,
  disabled = false,
  size = 20,
}: RatingStarsProps) => {
  const [hoverValue, setHoverValue] = useState(0);

  const handleStarMouseMove = (offsetX: number, index: number) => {
    setHoverValue(index + offsetX / size);
  };

  const handleMouseOut = () => {
    setHoverValue(0);
  };

  const handleStarClick = (e: any, index: number) => {
    const newValue = e.nativeEvent.offsetX / size + index;

    if (onChange) {
      onChange(Math.ceil(newValue));
    }
  };

  const getHoverOffsetPercent = (starIndex: number) => {
    const roundedValue = Math.floor(hoverValue);

    if (starIndex < roundedValue) {
      return 100;
    } else if (starIndex > roundedValue) {
      return 0;
    } else {
      const currentStarOffsetPercentage = (hoverValue % 1) * 100;
      return Math.ceil(currentStarOffsetPercentage / unitValue) * unitValue;
    }
  };

  const getSelectedOffsetPercent = (starIndex: number) => {
    const roundedSelectedValue = Math.floor(value);
    if (starIndex < roundedSelectedValue) {
      return 100;
    } else if (starIndex > roundedSelectedValue) {
      return 0;
    } else {
      const currentStarOffsetPercentage = (value % 1) * 100;
      return Math.ceil(currentStarOffsetPercentage / 10) * 10;
    }
  };

  return (
    <div className={styles.rating}>
      {![undefined, null].includes(value) ? (
        <>
          <p className={styles.value}>{value}</p>

          <div>
            {Array.from({ length: 5 }, (v, i) => {
              const isHover = getHoverOffsetPercent(i) > 0;

              const offset =
                !disabled && isHover
                  ? getHoverOffsetPercent(i)
                  : getSelectedOffsetPercent(i);

              const filledColor = !disabled && isHover ? "#ffebb7" : "#ffd055";

              return (
                <Star
                  key={i}
                  index={i}
                  size={size}
                  filledColor={filledColor}
                  handleStarMouseMove={handleStarMouseMove}
                  handleMouseOut={handleMouseOut}
                  handleStarClick={(e) => handleStarClick(e, i)}
                  offset={offset}
                  disabled={disabled}
                />
              );
            })}
          </div>

          {numberOfReviews ? (
            <p className={styles.reviews}>({numberOfReviews} reviews)</p>
          ) : null}
        </>
      ) : (
        <p className={styles.noReviews}>No reviews yet</p>
      )}
    </div>
  );
};

export default RatingStars;
