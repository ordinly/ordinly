import { useRouter } from "next/router";

import { useTransition, animated } from "@react-spring/web";

import { CloseButton } from "@components/CloseButton";
import { Button } from "@components/Button";
import { Stepper } from "@components/Stepper";
import { Tabs } from "@components/Tabs";
import { Portal } from "@components/Portal";

import styles from "./Slideout.module.css";

import type { SlideoutProps } from "./types";

const Slideout = ({
  title,
  onClose,
  actions,
  open,
  children,
  id,
  closeOnBackdropClick = true,
  saving = false,
  dirty = false,
  steps,
  tabs,
}: SlideoutProps) => {
  const router = useRouter();

  const transition = useTransition(open, {
    from: { x: 500, y: 0, opacity: 0.5 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 500, y: 0, opacity: 0.5 },
  });

  const onChangeStep = (newStep) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, step: newStep },
    });
  };

  const stepTransition = useTransition(router.query["step"], {
    from: { x: 500, y: 0, opacity: 0.5 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { display: "none" },
  });

  const onChangeTab = (newTab) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, tab: newTab },
    });
  };

  const tabTransition = useTransition(router.query["tab"], {
    from: { x: 500, y: 0, opacity: 0.5 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { display: "none" },
  });

  return transition((style, item) => (
    <Portal>
      {item && (
        <div
          className={`${styles.background} ${open ? styles.open : ""}`}
          onClick={() => {
            if (closeOnBackdropClick) {
              onClose();
            }
          }}
        >
          <animated.dialog
            id={id}
            className={`${styles.slideout} ${open ? styles.open : ""}`}
            open={open}
            onClick={(event) => {
              event.stopPropagation();
            }}
            style={style}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>
                {title}{" "}
                {saving ? (
                  <span className={styles.saving}>Saving...</span>
                ) : null}
              </h2>

              <CloseButton onClick={onClose} id={`${id}-close-button`} />
            </div>

            {children ? (
              <div
                className={`${styles.content} ${
                  !steps?.length && !tabs?.length ? styles.fullHeight : ""
                }`}
              >
                {children}
              </div>
            ) : null}

            {steps?.length && router.query["step"] ? (
              <>
                <div className={styles.tabsContainer}>
                  <Stepper
                    steps={steps}
                    current={Number(router.query["step"])}
                  />
                </div>

                {stepTransition((tabStyle, item) => (
                  <>
                    {item && (
                      <animated.div
                        className={`${styles.content} ${styles.fullHeight}`}
                        style={tabStyle}
                      >
                        {steps[Number(router.query["step"])]?.content}
                      </animated.div>
                    )}
                  </>
                ))}
              </>
            ) : tabs?.length && router.query["tab"] ? (
              <>
                <div className={styles.tabsContainer}>
                  <Tabs
                    id=""
                    value={router.query["tab"] as string}
                    tabs={tabs}
                    onChange={onChangeTab}
                  />
                </div>

                {tabTransition((tabStyle, item) => (
                  <>
                    {item && (
                      <animated.div
                        className={`${styles.content} ${styles.fullHeight}`}
                        style={tabStyle}
                      >
                        {
                          tabs[
                            tabs?.findIndex(
                              ({ id }) => id === router.query["tab"]
                            )
                          ]?.content
                        }
                      </animated.div>
                    )}
                  </>
                ))}
              </>
            ) : null}

            <div className={styles.actionsContainer}>
              <Button
                text={dirty ? "Cancel" : "Close"}
                variant="outline"
                onClick={onClose}
              />

              {Number(router.query["step"]) > 0 && (
                <Button
                  text="Back"
                  variant="secondary"
                  onClick={() => onChangeStep(Number(router.query["step"]) - 1)}
                />
              )}

              {actions?.map((action, index) => (
                <Button key={`${action.id}-${index}`} {...action} />
              ))}
            </div>
          </animated.dialog>
        </div>
      )}
    </Portal>
  ));
};

export default Slideout;
