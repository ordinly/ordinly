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

import { getCountries, getRegions, getCities } from "@ordinly/api-abstraction";
import { getProjectInvoice, updateInvoice } from "@ordinly/api-abstraction";

import { required } from "@components/Form/validation";

import downloadBlob from "@util/downloadBlob";

import InvoiceItemList from "../InvoiceItemList";
import DeleteInvoiceModal from "./DeleteInvoiceModal";

import styles from "./UpdateInvoiceSlideout.module.css";

const UpdateInvoiceSlideout = () => {
  const { company } = useContext(CompanyContext);
  const { client } = useContext(ClientContext);
  const { fetchProject } = useContext(ProjectContext);
  const { notification } = useContext(NotificationContext);

  const [saving, setSaving] = useState(false);
  const [invoice, setInvoice] = useState(null);
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
        const { invoice: invoiceResponse } = await getProjectInvoice({
          companyId: company._id,
          clientId: client._id,
          invoiceId: router.query["invoice-id"] as string,
          projectId: router.query["projectId"] as string,
        });

        setInvoice(invoiceResponse);
      }
    })();
  }, [company, client, router.query]);

  const openDeleteInvoiceModal = () => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, "delete-invoice": true },
    });
  };

  const onSubmit = async (values) => {
    setSaving(true);
    try {
      await updateInvoice({
        companyId: router.query.companyId as string,
        clientId: router.query.clientId as string,
        invoiceId: router.query["invoice-id"] as string,
        projectId: router.query["projectId"] as string,
        invoice: values,
      });

      await fetchProject();
    } catch (caught) {
      const { error = "There was an error updating this invoice" } = caught;

      notification({
        variant: "error",
        title: "Error updating invoice",
        message: error,
      });
    }
    setSaving(false);
  };

  const onClose = (form) => {
    const temp = { ...router.query };

    delete temp["update-invoice"];
    delete temp["invoice-id"];

    router.push({ pathname: router.pathname, query: temp });

    form.restart();
  };

  return (
    <Form
      onSubmit={onSubmit}
      mutators={{ ...arrayMutators }}
      initialValues={invoice}
      render={({ handleSubmit, form }) => {
        return (
          <Slideout
            id="update-invoice-slideout"
            title="Update invoice"
            open={!!router.query["update-invoice"]}
            onClose={() => onClose(form)}
            saving={saving}
            dirty={form.getState().dirty}
            actions={[
              {
                text: "Delete invoice",
                onClick: openDeleteInvoiceModal,
                variant: "danger",
              },
              {
                text: "Download invoice",
                icon: "downloadFile",
                variant: "secondary",
                onClick: () => {
                  downloadBlob({
                    href: `/api/files/invoices/company${invoice.key}`,
                    name: `${invoice.invoiceNumber}-${invoice.client}.pdf`,
                  });
                },
              },
              {
                text: "Update invoice",
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
                  id="update-invoice-recipient-input"
                />

                <Field
                  title="Invoice number"
                  name="invoiceNumber"
                  component={Input}
                  validate={required}
                  id="update-invoice-number-input"
                />

                <div className={"side-by-side"}>
                  <Field
                    title="Issue date"
                    name="issueDate"
                    component={Input}
                    validate={required}
                    htmlType="date"
                    id="update-invoice-issue-date-input"
                  />

                  <Field
                    title="Due date"
                    name="dueDate"
                    component={Input}
                    validate={required}
                    htmlType="date"
                    id="update-invoice-due-date-input"
                  />
                </div>

                <Field
                  title="Tax rate"
                  name="taxRate"
                  component={Input}
                  id="update-invoice-tax-rate-input"
                />

                <Field
                  title="Contact (optional)"
                  name="contactId"
                  component={Select}
                  id="update-invoice-contact-select"
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
                    id="update-client-country-input"
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
                    id="update-client-region-input"
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
                    id="update-client-city-input"
                  />

                  <Field
                    title="ZIP / Postal code"
                    name="address.postalCode"
                    component={Input}
                    validate={required}
                    id="update-client-postal-code-input"
                  />
                </div>

                <Field
                  title="Street address"
                  name="address.streetAddress"
                  component={Input}
                  validate={required}
                  id="update-client-address-input"
                />

                <h3>Items</h3>

                <InvoiceItemList form={form} />

                <DeleteInvoiceModal invoice={invoice} />
              </div>
            </div>
          </Slideout>
        );
      }}
    />
  );
};

export default UpdateInvoiceSlideout;
