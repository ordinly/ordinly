import React from "react";

import Feature from "./Feature";

import styles from "./Features.module.css";

const Features = ({
  sections,
}: {
  sections: { title: string; text: string; icon: React.ReactNode }[];
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        {sections.map((props) => (
          <Feature {...props} />
        ))}
      </div>
    </div>
  );
};

export default Features;
