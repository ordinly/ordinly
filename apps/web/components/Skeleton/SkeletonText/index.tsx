import styles from "./SkeletonText.module.css";

const SkeletonText = ({ variant = "p", rows = 1 }) => {
  return (
    <>
      {Array(rows).map(() => (
        <div className={`skeleton ${styles[variant]}`} />
      ))}
    </>
  );
};

export default SkeletonText;
