import { useEffect, useState, useCallback, useMemo } from "react";

import { useRouter } from "next/router";

import { Portal } from "@components/Portal";
import { Menu } from "@components/Menu";
import { Button } from "@components/Button";

import sleep from "@util/sleep";

import styles from "./Walkthrough.module.css";

const Walkthrough = ({ onClose, walkthrough }) => {
  const [inTransit, setInTransit] = useState(false);
  const [windowPosition, setWindowPosition] = useState(null);

  const router = useRouter();

  const step = useMemo(() => {
    return parseInt(router.query.step as string) - 1;
  }, [router.query]);

  const parentPosition = useMemo(() => {
    return document
      .getElementById(walkthrough[step]?.element)
      ?.getBoundingClientRect();
  }, [walkthrough, step]);

  useEffect(() => {
    if (parentPosition) {
      setWindowPosition({
        top: parentPosition.top - 8,
        left: parentPosition.left - 8,
        width: parentPosition.width + 16,
        height: parentPosition.height + 16,
      });
    }
  }, [parentPosition]);

  const onNextClick = useCallback(async () => {
    if (step < walkthrough?.length - 1) {
      setInTransit(true);

      if (walkthrough[step]?.onNext) {
        await walkthrough[step]?.onNext();
      } else {
        await sleep(0);
      }

      router.replace({
        pathname: "",
        query: {
          ...window.location.search
            .substring(1, window.location.search.length)
            .split("&")
            .reduce((total, entry) => {
              const [key, value] = entry.split("=");
              return { ...total, [key]: value };
            }, {}),
          ...router.query,
          step: step + 2,
        },
      });

      setInTransit(false);
    } else {
      const temp = router.query;
      delete temp["walkthrough"];
      delete temp["step"];

      router.replace({ pathname: router.pathname, query: temp });
      onClose();
    }
  }, [step]);

  const onBackClick = useCallback(async () => {
    setInTransit(true);

    if (walkthrough[step].onBack) {
      await walkthrough[step].onBack();
    } else {
      await sleep(0);
    }

    router.replace({
      pathname: "",
      query: {
        ...router.query,
        step: step,
      },
    });

    setInTransit(false);
  }, [step]);

  useEffect(() => {
    router.replace({ pathname: "", query: { ...router.query, step: 1 } });
  }, []);

  return (
    <Portal>
      <div
        id="walkthrough-window"
        className={styles.window}
        style={windowPosition}
      />
      {!inTransit ? (
        <Menu
          id="walkthrough-info"
          mountId="walkthrough-window"
          onClose={onClose}
          closeOnClick={false}
          align="center"
          position={walkthrough[step]?.position || "bottom"}
          yOffset={8}
        >
          <div className={styles.menu}>
            <p className={styles.text}>{walkthrough[step]?.text}</p>

            <div className={styles.actions}>
              <span className={styles.backButton}>
                {step > 0 ? <Button text="Back" onClick={onBackClick} /> : null}
              </span>

              <span className={styles.steps}>
                {walkthrough.length > 1 ? (
                  <>
                    {step + 1}/{walkthrough.length}
                  </>
                ) : null}
              </span>

              <span className={styles.nextButton}>
                <Button
                  text={step < walkthrough.length - 1 ? "Next" : "Done"}
                  onClick={onNextClick}
                />
              </span>
            </div>
          </div>
        </Menu>
      ) : null}
    </Portal>
  );
};

export default Walkthrough;
