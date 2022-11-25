import { useEffect, useState, useRef, useCallback, useMemo } from "react";

import { Portal } from "@components/Portal";

import styles from "./Menu.module.css";

import { MenuProps } from "./types";

const getTop = ({ position, parentPosition, menuPosition, offset }) => {
  if (position === "left" || position === "right") {
    return (
      parentPosition.top +
      parentPosition.height / 2 -
      menuPosition.height / 2 -
      offset
    );
  }

  if (position === "bottom") {
    return parentPosition.top + parentPosition.height + offset;
  }

  if (position === "top") {
    return parentPosition.top - menuPosition.height - offset;
  }
};

const getLeft = ({ position, align, parentPosition, menuPosition, offset }) => {
  if (position === "top" || position === "bottom") {
    if (align === "left") {
      return parentPosition.left - offset;
    }

    if (align === "center") {
      return (
        parentPosition.right -
        parentPosition.width / 2 -
        menuPosition.width / 2 -
        offset
      );
    }

    if (align === "right") {
      return parentPosition.right - menuPosition.width + offset;
    }
  }

  if (position === "left") {
    return parentPosition.left - menuPosition.width - offset;
  }

  if (position === "right") {
    return parentPosition.right + menuPosition.width + offset;
  }
};

const Menu = ({
  id,
  children,
  align = "right",
  onClose,
  mountId,
  closeOnClick = true,
  position = "bottom",
  xOffset = 0,
  yOffset = 0,
  fluid = false,
  focusOnOpen = false,
  focusOnClose = true,
  menuRef,
}: MenuProps) => {
  const ref = menuRef || useRef(menuRef);

  const [menuPosition, setMenuPosition] = useState(null);

  const setLocation = useCallback(() => {
    const parentPosition = document
      .getElementById(mountId)
      .getBoundingClientRect();

    const {
      top,
      left,
      right,
      bottom,
      width,
      height,
      x,
      y,
    } = document.getElementById(id).getBoundingClientRect();

    const newMenuPosition = {
      top,
      left,
      right,
      bottom,
      width: fluid ? parentPosition.width : width,
      height,
      x,
      y,
    };

    setMenuPosition({
      top: getTop({
        position,
        parentPosition,
        menuPosition: newMenuPosition,
        offset: yOffset,
      }),
      left: getLeft({
        position,
        parentPosition,
        menuPosition: newMenuPosition,
        align,
        offset: xOffset,
      }),
      width: fluid ? parentPosition.width : width,
    });
  }, [mountId, id, position, align, fluid]);

  const handleKeyPress = useCallback(
    ({ key }) => {
      const focusableElements = Array.prototype.slice.call(
        ref?.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      );

      const currentElement = focusableElements?.findIndex(
        (el) => el === document.activeElement
      );

      switch (key) {
        case "ArrowUp":
          focusableElements[
            currentElement === 0
              ? focusableElements.length - 1
              : currentElement - 1
          ].focus();
          break;
        case "ArrowDown":
          focusableElements[
            currentElement === focusableElements.length - 1
              ? 0
              : currentElement + 1
          ].focus();
          break;
        case "Escape":
          onClose();
          break;
      }
    },
    [ref]
  );

  const handleClickOutside = useCallback(
    (event) => {
      if (onClose && ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    },
    [ref]
  );

  useEffect(() => {
    setTimeout(() => setLocation(), 0);

    if (process.browser) {
      if (ref?.current && focusOnOpen) {
        setTimeout(() => {
          const focusableElements = ref?.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );

          focusableElements[0]?.focus();
        }, 0);
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);

        if (focusOnClose) {
          document.getElementById(mountId)?.focus();
        }
      };
    }
  }, [ref]);

  useEffect(() => {
    const onWindowBlur = () => {
      onClose();
    };

    window.addEventListener("resize", onClose);

    window.addEventListener("blur", onWindowBlur);

    return () => {
      window.removeEventListener("resize", onClose);

      window.removeEventListener("blur", onWindowBlur);
    };
  }, []);

  return (
    <>
      <Portal>
        <div id={id} ref={ref}>
          {menuPosition ? (
            <div
              className={menuPosition ? styles.menu : undefined}
              style={menuPosition ? menuPosition : undefined}
              onClick={() => {
                if (closeOnClick) {
                  onClose();
                }
              }}
              onKeyDown={handleKeyPress}
            >
              {children}
            </div>
          ) : null}
        </div>
      </Portal>
    </>
  );
};

export default Menu;
