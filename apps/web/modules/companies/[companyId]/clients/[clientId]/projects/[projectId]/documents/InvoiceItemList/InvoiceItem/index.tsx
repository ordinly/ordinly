import { Field } from "@components/Field";
import { Input } from "@components/Input";
import { TextArea } from "@components/TextArea";
import { Button } from "@components/Button";

import { required } from "@components/Form/validation";

import styles from "./InvoiceItem.module.css";

const InvoiceItem = ({ name, value, onRemoveItem }) => {
  return (
    <div className={styles.container}>
      <Field
        title="Description"
        name={`${name}.description`}
        component={Input}
        validate={required}
        id="new-invoice-item-description-input"
      />

      <div className="side-by-side">
        <div className={styles.price}>
          <Field
            title="Quantity"
            name={`${name}.quantity`}
            component={Input}
            validate={required}
            id="new-invoice-item-quantity-input"
          />
        </div>

        <div className={styles.price}>
          <Field
            title="Price"
            name={`${name}.price`}
            component={Input}
            validate={required}
            id="new-invoice-item-price-input"
          />
        </div>

        <div className={styles.price}>
          <label className={styles.title}>Total</label>

          <div>
            {value?.quantity && value?.price
              ? `$${value?.quantity * value?.price}`
              : ""}
          </div>
        </div>
      </div>

      <Field
        title="Additional notes"
        name={`${name}.additionalNotes`}
        component={TextArea}
        rows={2}
        id="new-invoice-item-notes-textarea"
      />

      {onRemoveItem ? (
        <div className={styles.button}>
          <Button
            id="remove-new-invoice-item-button"
            text="Remove invoice item"
            icon="trash"
            onClick={onRemoveItem}
            variant="ghost"
          />
        </div>
      ) : (
        <div style={{ width: "33.33px" }} />
      )}
    </div>
  );
};

export default InvoiceItem;
