import { useState, useContext, useEffect } from "react";

import { useTrail, animated } from "@react-spring/web";

import { Icon } from "@components/Icon";
import { Portal } from "@components/Portal";
import { Badge } from "@components/Badge";

import UserContext from "@contexts/UserContext";
import ChatContext from "@contexts/ChatContext";

import CalendarWindow from "./CalendarWindow";

import styles from "./Launcher.module.css";

const Launcher = () => {
  const { user } = useContext(UserContext);

  const { unreads } = useContext(ChatContext);

  const [expanded, setExpanded] = useState(false);

  const [open, setOpen] = useState(null);

  const toggle = () => {
    if (expanded) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  };

  const openWindow = (window) => {
    if (expanded) {
      setOpen(window);
    }
  };

  const closeWindow = () => {
    setOpen(null);
  };

  const items = [
    {
      component: (
        <button
          className={styles.button}
          onClick={() => openWindow("calendar")}
        >
          <Icon icon="calendar" />
        </button>
      ),
    },
    /*
    {
      component: (
        <button
          className={styles.button}
          onClick={toggle}
        >
          <Icon icon="message" />
        </button>
      ),
    },
    */
  ];

  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: expanded ? 1 : 0,
    x: 0,
    y: expanded ? 0 : 50,
    height: expanded ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });

  return (
    <Portal>
      {user ? (
        <>
          <div className={styles.container}>
            {trail.map(({ height, ...style }, index) => (
              <animated.div
                style={{ ...style, pointerEvents: expanded ? "all" : "none" }}
              >
                {items[index].component}
              </animated.div>
            ))}

            <button
              className={`${styles.button} ${!expanded ? styles.rotated : ""}`}
              onClick={toggle}
            >
              <Icon icon="caret-down" />
            </button>
          </div>
        </>
      ) : null}

      <CalendarWindow open={open === "calendar"} onClose={closeWindow} />
    </Portal>
  );
};

export default Launcher;
