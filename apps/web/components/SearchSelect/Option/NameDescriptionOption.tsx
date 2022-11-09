import styles from "./Option.module.css";

const NameDescriptionOption = ({ _id, name, description }: any) => {
  return (
    <>
      <p className={styles.name}>{name}</p>
    </>
  );
};

export default NameDescriptionOption;
