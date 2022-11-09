import { useState, useEffect } from "react";

import { debounce } from "lodash";

export const useScreenSize = () => {
  const [screen, setScreen] = useState({
    //@ts-ignore
    width: process.browser ? window.innerWidth : 0,
    //@ts-ignore
    height: process.browser ? window.innerHeight : 0,
  });

  const handleWindowResize = debounce(() => {
    setScreen({
      //@ts-ignore
      width: process.browser ? window.innerWidth : 0,
      //@ts-ignore
      height: process.browser ? window.innerHeight : 0,
    });
  }, 150);

  useEffect(() => {
    //@ts-ignore
    if (process.browser) {
      window.addEventListener("resize", handleWindowResize);

      return () => window.removeEventListener("resize", handleWindowResize);
    }
  }, []);

  return screen;
};
