import { useMemo } from "react";

import { FieldArray } from "@components/Field";
import { Button } from "@components/Button";

import InvoiceItem from "./InvoiceItem";

import styles from "./InvoiceItemList.module.css";

const initialValue = [
  { name: undefined, quantity: undefined, price: undefined },
];

const InvoiceItemList = ({
  form: {
    getFieldState,
    mutators: { push },
  },
}: any) => {
  const onAddItem = () => {
    push("items", undefined);
  };

  return (
    <div className={styles.container}>
      <div className={styles.fieldContainer}>
        <FieldArray name="items" initialValue={initialValue}>
          {({ fields }) =>
            fields.map((name, index) => (
              <InvoiceItem
                name={name}
                onRemoveItem={index ? () => fields.remove(index) : null}
                value={getFieldState("items")?.value[index]}
              />
            ))
          }
        </FieldArray>
      </div>

      <div className={styles.summary}>
        <div>
          <Button
            text="Add another invoice item"
            onClick={onAddItem}
            variant="outline"
            icon="add"
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceItemList;
