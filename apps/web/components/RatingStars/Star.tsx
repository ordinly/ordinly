import React, { useEffect, useState, MouseEvent } from "react";
import { uniqueId } from "lodash";

interface StarProps {
  index: number;
  size: number;
  filledColor: string;
  handleStarMouseMove: (e: number, index: number) => void;
  handleMouseOut: () => void;
  handleStarClick: (e: MouseEvent, index: number) => void;
  disabled: boolean;
  offset: number;
}

const NUM_POINT = 5;
const Star: React.FC<StarProps> = ({
  index,
  size,
  filledColor,
  handleStarMouseMove,
  handleMouseOut,
  handleStarClick,
  offset,
  disabled,
}) => {
  const [id, setId] = useState<string>("");

  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    setId(uniqueId());
  }, []);

  const center = Math.max(25, 50);
  const angle = Math.PI / NUM_POINT;
  const points = [];

  for (let i = 0; i < NUM_POINT * 2; i++) {
    let radius = i % 2 === 0 ? 50 : 25;
    points.push(center + radius * Math.sin(i * angle));
    points.push(center - radius * Math.cos(i * angle));
  }

  const onMouseMove = (e: MouseEvent, index: number) => {
    handleStarMouseMove(e.nativeEvent.offsetX, index);
    setIsHover(true);
  };

  const onMouseOut = () => {
    {
      handleMouseOut();
      setIsHover(false);
    }
  };

  const getStarStyle = () => {
    if (disabled) {
      return {
        cursor: "default",
      };
    }

    if (isHover) {
      return {
        transform: "scale(1.15)",
      };
    }
  };

  return (
    <svg
      style={{
        transition: "transform 0.1s ease-out",
        cursor: "pointer",
        ...getStarStyle(),
      }}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 100 100`}
      onMouseMove={(e) => onMouseMove(e, index)}
      onMouseOut={onMouseOut}
      onClick={(e) => handleStarClick(e, index)}
    >
      <defs>
        <linearGradient id={id} x1="0" x2="100%" y1="0" y2="0">
          <stop offset={`0%`} stopColor={filledColor} />
          <stop offset={`${offset}%`} stopColor={filledColor} />
          <stop
            offset={`${offset}%`}
            stopColor={"var(--subtitle-text-color)"}
          />
        </linearGradient>
      </defs>

      <path
        d={`M${points.toString()}Z`}
        fill={`url(#${id})`}
        strokeLinejoin={"round"}
        strokeLinecap={"round"}
      />
    </svg>
  );
};

export default Star;
