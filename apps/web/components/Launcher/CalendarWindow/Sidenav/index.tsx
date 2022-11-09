import { useContext } from "react";

import CompaniesContext from "@contexts/CompaniesContext";

import CompanyItem from "./CompanyItem";

import styles from "./Sidenav.module.css";

const Sidenav = ({ form }) => {
  const { companies } = useContext(CompaniesContext);

  return (
    <div className={styles.sideNav}>
      <h2 className={styles.title}>Companies</h2>

      <ul>
        {companies?.length &&
          companies.map((company) => <CompanyItem {...company} form={form} />)}
      </ul>
    </div>
  );
};

export default Sidenav;
