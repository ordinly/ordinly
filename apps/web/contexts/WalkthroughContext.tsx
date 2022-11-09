import React, { useState, createContext } from "react";

const WalkthroughContext = createContext<{
  walkthroughs: WalkthroughMenu;
  setWalkthroughs: React.Dispatch<React.SetStateAction<WalkthroughMenu>>;
}>(null);

export default WalkthroughContext;

export type Walkthrough = {
  text: string;
  element?: string;
  position?: "left" | "right" | "bottom" | "top";
  onNext?: (element: Node) => void;
  onBack?: (element: Node) => void;
}[];

export type WalkthroughMenu = {
  id: string;
  text: string;
  walkthrough: Walkthrough;
  onClose?: () => void;
}[];

export const WalkthroughProvider = ({ children }) => {
  const [walkthroughs, setWalkthroughs] = useState<WalkthroughMenu>(null);

  return (
    <WalkthroughContext.Provider value={{ walkthroughs, setWalkthroughs }}>
      {children}
    </WalkthroughContext.Provider>
  );
};
