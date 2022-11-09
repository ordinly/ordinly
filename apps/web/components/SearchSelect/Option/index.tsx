import { Icon } from "@components/Icon";

import CompanyOption from "./CompanyOption";
import NameDescriptionOption from "./NameDescriptionOption";
import UserOption from "./UserOption";

import styles from "./Option.module.css";

const Option = ({
  entity,
  onSelect,
  selected,
  _id,
  push,
  remove,
  ...restProps
}: {
  [key: string]: any;
}) => {
  const onSelection = () => {
    if (entity === "companies:project") {
      onSelect({ companyId: _id, permissions: {} });
    } else {
      console.log(restProps);
      onSelect(_id);
    }
  };

  return (
    <div
      className={`${styles.option} ${selected ? styles.selected : ""}`}
      onClick={onSelection}
    >
      {["companies", "companies:project"].includes(entity) ? (
        <CompanyOption _id={_id} {...restProps} />
      ) : null}

      {["clients", "roles", "teams"].includes(entity) ? (
        <NameDescriptionOption _id={_id} {...restProps} />
      ) : null}

      {["users", "workers"].includes(entity) ? (
        <UserOption
          _id={entity === "workers" ? restProps.userId : _id}
          {...restProps}
        />
      ) : null}

      {selected ? (
        <div className={styles.selectedIcon}>
          <Icon icon="check" size={15} />
        </div>
      ) : null}
    </div>
  );
};

export default Option;
