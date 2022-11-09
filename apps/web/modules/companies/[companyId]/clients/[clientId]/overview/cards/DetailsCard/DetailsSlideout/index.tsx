import { useContext, useMemo, useState, useEffect } from "react";

import { useRouter } from "next/router";

import { searchCompanies } from "@ordinly/api-abstraction/companies";

import {
  getCountries,
  getRegions,
  getCities,
} from "@ordinly/api-abstraction/location";

import { Slideout } from "@components/Slideout";
import { Form } from "@components/Form";
import { Field } from "@components/Field";
import { Input } from "@components/Input";
import { TextArea } from "@components/TextArea";
import { SearchSelect } from "@components/SearchSelect";
import { Select } from "@components/Select";

import ClientContext from "@contexts/ClientContext";
import NotificationContext from "@contexts/NotificationContext";

import { updateClientDetails } from "@ordinly/api-abstraction/companies";

import DeleteClientModal from "./DeleteClientModal";

import { isPostalCode } from "@components/Form/validation";

import styles from "./DetailsSlideout.module.css";

const DetailsSlideout = () => {
  const { client, fetchClient } = useContext(ClientContext);
  const { notification } = useContext(NotificationContext);

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

  const [saving, setSaving] = useState(false);

  const details = useMemo(() => {
    const { name, description, address, companyId } = client || {};

    return { name, description, address, companyId };
  }, [client]);

  console.log(details);

  const router = useRouter();

  const closeSlideout = () => {
    const temp = router.query;

    delete temp["update-client-details"];

    router.replace({ pathname: router.pathname, query: { ...temp } });
  };

  const openDeleteClientModal = () => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, "delete-client": true },
    });
  };

  const onSave = async (values) => {
    try {
      setSaving(true);

      const response = await updateClientDetails({
        ...values,
        clientId: client._id,
        companyId: router.query["companyId"],
      });

      if ("error" in response) {
        throw response;
      } else {
        await fetchClient();

        router.replace(router.asPath);
      }
    } catch (caught) {
      const { error = "There was an error updating this client" } = caught;

      notification({
        variant: "error",
        title: "Error updating this client",
        message: error,
      });
    }

    setSaving(false);
  };

  return (
    <>
      {details ? (
        <Form
          onSubmit={onSave}
          render={({ form, handleSubmit }) => {
            return (
              <Slideout
                id="update-client-details-slideout"
                title="Update client details"
                open={router?.query?.hasOwnProperty("update-client-details")}
                onClose={closeSlideout}
                saving={saving}
                dirty={form.getState().dirty}
                actions={[
                  {
                    variant: "danger",
                    text: "Delete client",
                    onClick: openDeleteClientModal,
                  },
                  {
                    text: "Save",
                    onClick: handleSubmit,
                    type: "submit",
                  },
                ]}
              >
                {details.companyId ? (
                  <Field
                    title="Company"
                    name="companyId"
                    required
                    component={SearchSelect}
                    id="new-client-company-select"
                    onFetchData={searchCompanies}
                    entity="companies"
                    initialSearchTerm={details.name}
                    initialValue={details.companyId}
                    disabled
                  />
                ) : (
                  <Field
                    title="Name"
                    name="name"
                    initialValue={details?.name}
                    required
                    component={Input}
                    id="new-client-name-input"
                  />
                )}

                <Field
                  title="Description"
                  name="description"
                  component={TextArea}
                  id="update-client-details-description-textarea"
                  initialValue={details?.description}
                />

                {!details.companyId ? (
                  <>
                    <div className="side-by-side">
                      <Field
                        title="Country"
                        name="address.country"
                        component={Select}
                        initialValue={details?.address?.country}
                        options={countries.map(({ iso, name }) => ({
                          value: iso,
                          label: name,
                        }))}
                        onChange={async (newCountry) => {
                          form.change("region", undefined);

                          const response = await getRegions({
                            countryId: newCountry,
                          });

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
                        initialValue={details?.address?.region}
                        options={regions.map(({ name }) => ({
                          value: name,
                          label: name,
                        }))}
                        onChange={async (newRegion) => {
                          form.change("city", undefined);

                          const response = await getCities({
                            regionId: newRegion,
                            countryId:
                              form.getFieldState("address.country").value,
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
                        initialValue={details?.address?.city}
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
                        initialValue={details?.address?.postalCode}
                        validate={(value) =>
                          isPostalCode(
                            value,
                            form?.getFieldState("address.country")?.value
                          )
                        }
                        id="new-client-postal-code-input"
                      />
                    </div>

                    <Field
                      title="Street address"
                      name="address.streetAddress"
                      component={Input}
                      initialValue={details?.address?.streetAddress}
                      id="new-client-address-input"
                    />
                  </>
                ) : null}

                <DeleteClientModal />
              </Slideout>
            );
          }}
        />
      ) : null}
    </>
  );
};

export default DetailsSlideout;
