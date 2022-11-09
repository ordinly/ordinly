import styles from "./Features.module.css";

const Feature = ({ title, text, icon: IconComponent }) => {
  return (
    <div className={styles.feature}>
      <div>
        <h1 className={styles.title}>{title}</h1>

        <p className={styles.text}>{text}</p>
      </div>

      <IconComponent />
    </div>
  );
};

export default Feature;
