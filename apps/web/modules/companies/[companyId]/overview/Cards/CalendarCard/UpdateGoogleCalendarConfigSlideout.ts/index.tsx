import { useContext, useState, useEffect } from "react";

import { useRouter } from "next/router";

import { Slideout } from "@components/Slideout";
import { Form } from "@components/Form";
import { Field } from "@components/Field";
import { Toggle } from "@components/Toggle";

import UserContext from "@contexts/UserContext";
import NotificationContext from "@contexts/NotificationContext";

import {
  getGoogleCalendars,
  updateGoogleCalendarConfig,
} from "@ordinly/api-abstraction";

import styles from "./UpdateGoogleCalendarConfigSlideout.module.css";

const UpdateGoogleCalendarConfigSlideout = () => {
  const { notification } = useContext(NotificationContext);
  const { user } = useContext(UserContext);

  const router = useRouter();

  const onSubmit = async (values, form) => {
    try {
      const response = await updateGoogleCalendarConfig({
        syncedCalendars: Object.entries(values).reduce(
          (total, [key, value]) => {
            if (value) {
              return [...total, key.replaceAll("|", ".")];
            }

            return total;
          },
          []
        ),
      });

      if ("error" in response) {
        throw response;
      } else {
        notification({
          variant: "success",
          title: "Company successfully created",
        });

        closeSlideout(form);
      }
    } catch (caught) {
      const { error = "There was an error creating this company" } = caught;

      notification({
        variant: "error",
        title: "Error creating this company",
        message: error,
      });
    }
  };

  const closeSlideout = (form) => {
    form.restart();
    const temp = router.query;
    delete temp["update-calendar-config"];
    router.replace({ pathname: router.pathname, query: { ...temp } });
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form }) => {
        const [calendars, setCalendars] = useState([]);

        useEffect(() => {
          (async () => {
            if (user) {
              const { calendars: newCalendars } = await getGoogleCalendars();

              setCalendars(newCalendars);
            }
          })();
        }, []);

        const onToggleCalendar = async (calendarId) => {
          console.log(calendarId);
        };

        return (
          <Slideout
            id="update-calendar-config-slideout"
            title="Manage Google calendar configuration"
            open={router?.query?.hasOwnProperty("update-calendar-config")}
            onClose={() => closeSlideout(form)}
            dirty={form.getState().dirty}
            actions={[
              {
                text: "Update configuration",
                onClick: handleSubmit,
                id: "update-calendar-config-slideout-submit-button",
                type: "submit",
              },
            ]}
          >
            <h3>Synced Google calendars</h3>

            {calendars?.map(
              ({
                backgroundColor,
                colorId,
                description,
                foregroundColor,
                id,
                primary,
                summary,
              }) => (
                <Field
                  inline
                  name={id.replaceAll(".", "|")}
                  initialValue={user?.integrations?.google?.calendar?.syncedCalendars.includes(
                    id
                  )}
                  component={({ value, onChange }) => (
                    <div className={styles.toggleContainer}>
                      <Toggle
                        id={id}
                        toggled={value}
                        onChange={(newValue) => onChange(newValue)}
                      />{" "}
                      <p className={styles.toggleLabel}>{summary}</p>
                    </div>
                  )}
                />
              )
            )}
          </Slideout>
        );
      }}
    />
  );
};

export default UpdateGoogleCalendarConfigSlideout;
