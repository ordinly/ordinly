import { useRef, useEffect, useCallback, useState } from "react";

import styles from "./TableCell.module.css";

const TableCell = ({
  children,
  style,
  sticky,
  tableId,
  showHeader = false,
}: {
  children: JSX.Element | string;
  style?: React.CSSProperties;
  sticky?: boolean;
  tableId?: string;
  showHeader?: boolean;
}) => {
  const [ref, setRef] = useState(null);

  const updateRef = useCallback((node) => {
    if (node !== null) {
      setRef(node);
    }
  }, []);

  const scrollHandler = useCallback(
    ({ target }) => {
      if (sticky) {
        ref.classList.toggle(
          styles.pinned,
          !youngerSiblings.some((elem) =>
            [...elem.classList].includes(styles.pinned)
          ) &&
            ref?.getBoundingClientRect()?.left <=
              target.getBoundingClientRect()?.left + left
        );
      }
    },
    [ref]
  );

  useEffect(() => {
    if (ref && tableId) {
      document
        .getElementById(tableId)
        ?.addEventListener("scroll", scrollHandler);

      return () =>
        document
          .getElementById(tableId)
          ?.removeEventListener("scroll", scrollHandler);
    }
  }, [ref]);

  const siblings = ref
    ? [...ref?.parentNode?.childNodes].filter((node) => {
        return getComputedStyle(node).position === "sticky";
      })
    : [];

  const olderSiblings = siblings?.slice(0, siblings.indexOf(ref));

  const youngerSiblings = siblings?.slice(siblings.indexOf(ref) + 1);

  const left = olderSiblings.reduce((total, node) => {
    return (total += node.clientWidth);
  }, 0);

  return (
    <>
      {showHeader ? (
        <th
          ref={updateRef}
          style={{ left: `${left}px`, ...style }}
          className={`${styles.cell} ${sticky ? styles.sticky : ""}`}
        >
          {children}
        </th>
      ) : (
        <td
          ref={updateRef}
          style={{ left: `${left}px`, ...style }}
          className={`${styles.cell} ${sticky ? styles.sticky : ""}`}
        >
          {children}
        </td>
      )}
    </>
  );
};

export default TableCell;
