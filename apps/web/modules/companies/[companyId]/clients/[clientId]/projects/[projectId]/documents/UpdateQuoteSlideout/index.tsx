import { useContext, useState, useEffect } from "react";

import { useRouter } from "next/router";

import arrayMutators from "final-form-arrays";

import CompanyContext from "@contexts/CompanyContext";
import ClientContext from "@contexts/ClientContext";
import ProjectContext from "@contexts/ProjectContext";
import NotificationContext from "@contexts/NotificationContext";

import { Slideout } from "@components/Slideout";
import { Form } from "@components/Form";
import { Field } from "@components/Field";
import { Input } from "@components/Input";
import { Select } from "@components/Select";
import { Checkbox } from "@components/Checkbox";

import {
  getCountries,
  getRegions,
  getCities,
} from "@ordinly/api-abstraction/location";
import {
  getProjectQuote,
  updateQuote,
} from "@ordinly/api-abstraction/companies";

import { required } from "@components/Form/validation";

import downloadBlob from "@util/downloadBlob";

import QuoteItemList from "../InvoiceItemList";
import DeleteQuoteModal from "./DeleteQuoteModal";

import styles from "./UpdateQuoteSlideout.module.css";

const UpdateQuoteSlideout = () => {
  const { company } = useContext(CompanyContext);
  const { client } = useContext(ClientContext);
  const { fetchProject } = useContext(ProjectContext);
  const { notification } = useContext(NotificationContext);

  const [saving, setSaving] = useState(false);
  const [quote, setQuote] = useState(null);
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const countriesResponse = await getCountries();

      if (!("error" in countriesResponse)) {
        setCountries(countriesResponse.countries);

        if (client?.address?.country) {
          const regionsResponse = await getRegions({
            countryId: client?.address?.country,
          });

          setRegions(regionsResponse.regions);
        }
      }
    })();
  }, [company, client, router.query]);

  useEffect(() => {
    (async () => {
      if (company && client && router.query) {
        const { quote: quoteResponse } = await getProjectQuote({
          companyId: company._id,
          clientId: client._id,
          quoteId: router.query["quote-id"] as string,
          projectId: router.query["projectId"] as string,
        });

        setQuote(quoteResponse);
      }
    })();
  }, [company, client, router.query]);

  const openDeleteQuoteModal = () => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, "delete-quote": true },
    });
  };

  const onSubmit = async (values) => {
    setSaving(true);
    try {
      await updateQuote({
        companyId: router.query.companyId as string,
        clientId: router.query.clientId as string,
        quoteId: router.query["quote-id"] as string,
        projectId: router.query["projectId"] as string,
        quote: values,
      });

      await fetchProject();
    } catch (caught) {
      const { error = "There was an error updating this quote" } = caught;

      notification({
        variant: "error",
        title: "Error updating quote",
        message: error,
      });
    }
    setSaving(false);
  };

  const onClose = (form) => {
    const temp = { ...router.query };

    delete temp["update-quote"];
    delete temp["quote-id"];

    router.push({ pathname: router.pathname, query: temp });

    form.restart();
  };

  return (
    <Form
      onSubmit={onSubmit}
      mutators={{ ...arrayMutators }}
      initialValues={quote}
      render={({ handleSubmit, form }) => {
        return (
          <Slideout
            id="update-quote-slideout"
            title="Update quote"
            open={!!router.query["update-quote"]}
            onClose={() => onClose(form)}
            saving={saving}
            dirty={form.getState().dirty}
            actions={[
              {
                text: "Delete quote",
                onClick: openDeleteQuoteModal,
                variant: "danger",
              },
              {
                text: "Download quote",
                icon: "downloadFile",
                variant: "secondary",
                onClick: () => {
                  downloadBlob({
                    href: `/api/files/quotes/company${quote.key}`,
                    name: `${quote.quoteNumber}-${quote.client}.pdf`,
                  });
                },
              },
              {
                text: "Update quote",
                icon: "add",
                onClick: handleSubmit,
                type: "submit",
              },
            ]}
          >
            <div className={styles.container}>
              <div className={styles.form}>
                <Field
                  title="Client"
                  name="client"
                  component={Input}
                  validate={required}
                  id="new-quote-recipient-input"
                  initialValue={client?.name}
                />

                <Field
                  title="Is estimate"
                  name="isEstimate"
                  component={Checkbox}
                  id="new-quote-recipient-input"
                  initialValue={false}
                />

                <Field
                  title={`${
                    form.getFieldState("isEstimate")?.value
                      ? "Estimate"
                      : "Quote"
                  } number`}
                  name="quoteNumber"
                  component={Input}
                  validate={required}
                  id="new-quote-number-input"
                />

                <Field
                  title={`${
                    form.getFieldState("isEstimate")?.value
                      ? "Estimate"
                      : "Quote"
                  } date`}
                  name="quoteDate"
                  component={Input}
                  validate={required}
                  htmlType="date"
                  id="add-quote-issue-date-input"
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
                    onChange={async (newCountry) => {
                      const response = await getRegions({
                        countryId: newCountry,
                      });

                      if (!("error" in response)) {
                        setRegions(response.regions);

                        form.change("region", client?.address?.region);
                      }
                    }}
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
                    initialValue={client?.address?.region}
                  />
                </div>

                <div className="side-by-side">
                  <Field
                    title="City"
                    name="address.city"
                    component={Select}
                    validate={required}
                    id="new-client-city-input"
                    initialValue={client?.address?.city}
                    options={cities.map(({ name }) => ({
                      value: name,
                      label: name,
                    }))}
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

                <QuoteItemList form={form} />

                <DeleteQuoteModal quote={quote} />
              </div>
            </div>
          </Slideout>
        );
      }}
    />
  );
};

export default UpdateQuoteSlideout;
