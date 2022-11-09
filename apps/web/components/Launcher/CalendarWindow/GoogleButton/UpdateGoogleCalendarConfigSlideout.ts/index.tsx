import { useContext, useState, useEffect } from "react";

import { useRouter } from "next/router";

import { Slideout } from "@components/Slideout";
import { Form } from "@components/Form";
import { Field } from "@components/Field";
import { Toggle } from "@components/Toggle";
import { Portal } from "@components/Portal";

import UserContext from "@contexts/UserContext";
import NotificationContext from "@contexts/NotificationContext";

import {
  getGoogleCalendars,
  updateGoogleCalendarConfig,
  connectGoogleAccount,
} from "@ordinly/api-abstraction";

import styles from "./UpdateGoogleCalendarConfigSlideout.module.css";

const UpdateGoogleCalendarConfigSlideout = () => {
  const { notification } = useContext(NotificationContext);
  const { user } = useContext(UserContext);

  const router = useRouter();

  const getAuthURL = async () => {
    const { url } = await connectGoogleAccount({
      scope: [
        ...user.integrations.google.scope,
        "https://www.googleapis.com/auth/gmail.modify",
      ],
    });

    if (url) {
      localStorage.setItem("url", router.asPath.split("?")[0]);

      window.location.href = url;
    }
  };

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
          title: "Google calendar config successfully updated",
        });

        closeSlideout(form);
      }
    } catch (caught) {
      const {
        error = "There was an error updating your Google calendar config",
      } = caught;

      notification({
        variant: "error",
        title: "There was an error updating your Google calendar config",
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
    <Portal>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form }) => {
          const [calendars, setCalendars] = useState([]);

          useEffect(() => {
            (async () => {
              try {
                if (user) {
                  const {
                    calendars: newCalendars,
                  } = await getGoogleCalendars();

                  setCalendars(newCalendars);
                }
              } catch (caught) {
                await getAuthURL();
              }
            })();
          }, []);

          const onToggleCalendar = async (calendarId) => {};

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
    </Portal>
  );
};

export default UpdateGoogleCalendarConfigSlideout;
