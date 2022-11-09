import styles from "./Checkbox.module.css";

const Checkbox = ({
  value,
  onChange,
  disabled = false,
  id = Math.floor(Math.random() * 1000),
  label = undefined,
}: {
  value: boolean;
  onChange?: (newValue: boolean) => void;
  disabled?: boolean;
  id?: number | string;
  label?: string;
}) => {
  const onClick = ({ target: { checked } }) => {
    if (onChange) {
      onChange(checked);
    }
  };

  return (
    <>
      <input
        id={id.toString()}
        disabled={disabled}
        className={`${styles.checkbox} ${disabled ? styles.disabled : ""}`}
        checked={value}
        type="checkbox"
        onChange={onClick}
      />

      {label ? (
        <label className={styles.label} htmlFor={id.toString()}>
          {label}
        </label>
      ) : null}
    </>
  );
};

export default Checkbox;
