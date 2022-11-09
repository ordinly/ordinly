import { useEffect, useRef } from "react";

export const useObserve = (element: any, callback: (arg: any) => void) => {
  const current = element?.current;

  const observer = useRef<any>(null);

  const observe = () => {
    if (element?.current && observer) {
      observer?.current?.observe(element.current);
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
