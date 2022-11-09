import { useContext } from "react";

import SettingsContext from "@contexts/SettingsContext";

import { ContentSwitcher } from "@components/ContentSwitcher";

import styles from "./ViewToggle.module.css";

const ViewToggle = () => {
  const { view, changeView } = useContext(SettingsContext);

  return (
    <div className={styles.container}>
      <ContentSwitcher
        id="view-content-switcher"
        onChange={changeView}
        value={view as string}
        items={[
          {
            id: "card-switcher",
            icon: "cards",
            value: "cards",
          },
          {
            id: "table-switcher",
            icon: "table",
            value: "table",
          },
        ]}
      />
    </div>
  );
};

export default ViewToggle;
