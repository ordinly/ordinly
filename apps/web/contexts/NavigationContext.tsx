import { useState, createContext } from "react";

import type { Dispatch, SetStateAction } from "react";

import type { IconType } from "@components/Icon";

type NavigationContextType = {
  navigation: NavigationItem[];
  setNavigation: Dispatch<SetStateAction<NavigationItem[]>>;
};

const NavigationContext = createContext<NavigationContextType>(null);

export type NavigationItem = {
  href?: string;
  title: string;
  icon: IconType;
  onClick?: () => void;
};

export default NavigationContext;

export const NavigationProvider = ({ children }) => {
  const [navigation, setNavigation] = useState<NavigationItem[]>([]);

  return (
    <NavigationContext.Provider value={{ navigation, setNavigation }}>
      {children}
    </NavigationContext.Provider>
  );
};
