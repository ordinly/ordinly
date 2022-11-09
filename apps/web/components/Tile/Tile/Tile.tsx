import React, { useRef } from "react";

import styles from "./Tile.module.css";

import type { IconType } from "@components/Icon";

type TileProps = {
  id: string;
  children: any;
  onClick?: () => void;
  pills?: {
    icon: IconType;
    number: number;
  }[];
};

const Tile = ({ id, children, onClick, pills }: TileProps) => {
  const ref = useRef(null);

  return (
    <div className={styles.container} onClick={onClick}>
      <div id={id} className={styles.tile} ref={ref}>
        {children}
      </div>
    </div>
  );
};

export default Tile;
