import { useEffect, useState } from "react";

import { Field } from "@components/Field";
import { Input } from "@components/Input";
import { Select } from "@components/Select";

import {
  getCountries,
  getRegions,
  getCities,
} from "@ordinly/api-abstraction/location";

import { isPostalCode, required } from "@components/Form/validation";

const AddressStep = ({ form }) => {
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getCountries();

      if (!("error" in response)) {
        setCountries(response.countries);
      }
    })();
  }, []);

  return (
    <>
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
          onChange={async (newCountry) => {
            form.change("region", undefined);

            const response = await getRegions({ countryId: newCountry });

            if (!("error" in response)) {
              setRegions(response.regions);
            }
          }}
          validateFields={["address.postalCode"]}
          id="new-client-country-input"
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
          onChange={async (newRegion) => {
            form.change("city", undefined);

            const response = await getCities({
              regionId: newRegion,
              countryId: form.getFieldState("address.country").value,
            });

            if (!("error" in response)) {
              setCities(response.cities);
            }
          }}
          id="new-client-region-input"
        />
      </div>

      <div className="side-by-side">
        <Field
          title="City"
          name="address.city"
          component={Select}
          validate={required}
          options={cities.map(({ name }) => ({
            value: name,
            label: name,
          }))}
          id="new-client-city-input"
        />

        <Field
          title="ZIP / Postal code"
          name="address.postalCode"
          component={Input}
          validate={(value) =>
            required(value) ||
            isPostalCode(value, form?.getFieldState("address.country")?.value)
          }
          id="new-client-postal-code-input"
        />
      </div>

      <Field
        title="Street address"
        name="address.streetAddress"
        component={Input}
        validate={required}
        id="new-client-address-input"
      />
    </>
  );
};

export default AddressStep;
