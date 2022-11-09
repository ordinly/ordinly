import { useState, useEffect } from "react";

import { debounce } from "lodash";

const useScreenSize = () => {
  const [screen, setScreen] = useState({
    width: process.browser ? window.innerWidth : 0,
    height: process.browser ? window.innerHeight : 0,
  });

  const handleWindowResize = debounce(() => {
    setScreen({
      width: process.browser ? window.innerWidth : 0,
      height: process.browser ? window.innerHeight : 0,
    });
  }, 150);

  useEffect(() => {
    if (process.browser) {
      window.addEventListener("resize", handleWindowResize);

      return () => window.removeEventListener("resize", handleWindowResize);
    }
  }, []);

  return screen;
};

export default useScreenSize;
