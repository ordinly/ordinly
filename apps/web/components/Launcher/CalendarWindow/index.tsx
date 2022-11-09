import { useContext } from "react";

import CompaniesContext from "@contexts/CompaniesContext";

import { AutoSave, Form } from "@components/Form";
import { Calendar } from "@components/Calendar";

import Window from "../Window";

import Sidenav from "./Sidenav";

import GoogleButton from "./GoogleButton";

import styles from "./CalendarWindow.module.css";

const CalendarWindow = ({ onClose, open }) => {
  const { companies } = useContext(CompaniesContext);

  const onChange = (values) => {};

  return (
    <Form
      onSubmit={onChange}
      mutators={{
        checkAll: ([companyId, newValue], state, { changeValue }) => {
          changeValue(state, companyId, () =>
            companies.find(({ _id }) => _id === companyId)
          );
        },
      }}
      render={({ form, handleSubmit }) => {
        return (
          <Window onClose={onClose} open={open}>
            <div className={styles.container}>
              <Sidenav form={form} />

              <div className={styles.content}>
                <Calendar events={[]} onChangeMonth={() => {}} />
              </div>

              <AutoSave onSave={handleSubmit} />
            </div>
          </Window>
        );
      }}
    />
  );
};

export default CalendarWindow;
