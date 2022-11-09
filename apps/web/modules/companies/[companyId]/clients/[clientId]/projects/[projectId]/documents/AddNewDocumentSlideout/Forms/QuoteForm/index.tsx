import { Field } from "@components/Field";
import { Input } from "@components/Input";
import { Select } from "@components/Select";

import { required } from "@components/Form/validation";

import InvoiceItemList from "../../../InvoiceItemList";
import { Checkbox } from "@components/Checkbox";

const currentDate = new Date();

const InvoiceForm = ({
  form,
  client,
  countries,
  regions,
  cities,
  onChangeCountry,
  onChangeRegion,
}) => {
  return (
    <>
      <h3>General details</h3>

      <Field
        title="Client"
        name="client"
        component={Input}
        validate={required}
        id="new-quote-recipient-input"
        initialValue={client?.name}
      />

      <Field
        label="Is estimate"
        name="isEstimate"
        component={Checkbox}
        id="new-quote-recipient-input"
        initialValue={false}
      />

      <Field
        title={`${
          form.getFieldState("isEstimate")?.value ? "Estimate" : "Quote"
        } number`}
        name="quoteNumber"
        component={Input}
        validate={required}
        id="new-quote-number-input"
      />

      <Field
        title={`${
          form.getFieldState("isEstimate")?.value ? "Estimate" : "Quote"
        } date`}
        name="quoteDate"
        component={Input}
        validate={required}
        htmlType="date"
        id="add-quote-issue-date-input"
        initialValue={currentDate}
      />

      <Field
        title="Contact (optional)"
        name="contactId"
        component={Select}
        id="new-quote-contact-select"
        options={client?.contacts?.map(({ name, _id }) => ({
          label: name,
          value: _id,
        }))}
      />

      <h3>Address</h3>

      <div className="side-by-side">
        <Field
          title="Country"
          name="address.country"
          component={Select}
          validate={required}
          options={countries.map(({ iso, name }) => ({
            value: iso,
            label: name,
          }))}
          onChange={onChangeCountry}
          id="new-client-country-input"
          initialValue={client?.address?.country}
        />

        <Field
          title="Region"
          name="address.region"
          component={Select}
          validate={required}
          options={regions.map(({ name }) => ({
            value: name,
            label: name,
          }))}
          onChange={onChangeRegion}
          id="new-client-region-input"
          initialValue={client?.address?.region}
        />
      </div>

      <div className="side-by-side">
        <Field
          title="City"
          name="address.city"
          component={Select}
          options={cities.map(({ name }) => ({
            value: name,
            label: name,
          }))}
          validate={required}
          id="new-client-city-input"
          initialValue={client?.address?.city}
        />

        <Field
          title="ZIP / Postal code"
          name="address.postalCode"
          component={Input}
          validate={required}
          id="new-client-postal-code-input"
          initialValue={client?.address?.postalCode}
        />
      </div>

      <Field
        title="Street address"
        name="address.streetAddress"
        component={Input}
        validate={required}
        id="new-client-address-input"
        initialValue={client?.address?.streetAddress}
      />

      <h3>Items</h3>

      <InvoiceItemList form={form} />
    </>
  );
};

export default InvoiceForm;
