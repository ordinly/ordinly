import { useEffect, useRef } from "react";

const useObserve = (element, callback) => {
  const current = element?.current;

  const observer = useRef(null);

  const observe = () => {
    if (element?.current && observer) {
      observer?.current.observe(element.current);
    }
  };

  useEffect(() => {
    if (current && observer?.current) {
      observer?.current.unobserve(current);
    }

    observer.current = new ResizeObserver(callback);

    observe();

    return () => {
      if (element?.current) {
        observer?.current?.unobserve(element?.current);
      }
    };
  }, [current]);
};

export default useObserve;
