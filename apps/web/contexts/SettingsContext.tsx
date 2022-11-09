import { createContext, useState, useEffect } from "react";

type Views = "cards" | "table";

const SettingsContext = createContext<{
  view: Views;
  changeView: (newView: Views) => void;
}>(null);

export default SettingsContext;

export const SettingsProvider = ({ children }) => {
  const [view, setView] = useState<Views>("cards");

  useEffect(() => {
    changeView(localStorage.getItem("ordinly-view") as Views);
  }, []);

  const changeView = (newView) => {
    if (newView !== localStorage.getItem("ordinly-view")) {
      localStorage.setItem("ordinly-view", newView);
    }

    setView(newView);
  };

  return (
    <SettingsContext.Provider value={{ view, changeView }}>
      {children}
    </SettingsContext.Provider>
  );
};
