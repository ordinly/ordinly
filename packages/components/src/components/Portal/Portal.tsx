import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

import type { PortalProps } from "./types";

const Portal = ({ node, children }: PortalProps) => {
  const mountNode = useMemo(() => {
    //@ts-ignore
    if (process.browser) {
      return node || document.getElementsByTagName("body")[0];
    }
    //@ts-ignore
  }, [process.browser]);

  const mountElement = useMemo(() => {
    //@ts-ignore
    if (process.browser) {
      return document.createElement("div");
    }
    //@ts-ignore
  }, [process.browser]);

  useEffect(() => {
    //@ts-ignore
    mountNode.appendChild(mountElement);

    return () => {
      //@ts-ignore
      mountNode.removeChild(mountElement);
    };
  }, [mountElement, mountNode]);

  return children && mountElement ? createPortal(children, mountElement) : null;
};

export default Portal;
