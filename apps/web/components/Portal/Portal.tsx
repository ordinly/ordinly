import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

import type { PortalProps } from "./types";

const Portal = ({ node, children }: PortalProps) => {
  const mountNode = useMemo(() => {
    if (process.browser) {
      return node || document.getElementsByTagName("body")[0];
    }
  }, [process.browser]);

  const mountElement = useMemo(() => {
    if (process.browser) {
      return document.createElement("div");
    }
  }, [process.browser]);

  useEffect(() => {
    mountNode.appendChild(mountElement);

    return () => {
      mountNode.removeChild(mountElement);
    };
  }, [mountElement, mountNode]);

  return children && mountElement ? createPortal(children, mountElement) : null;
};

export default Portal;
