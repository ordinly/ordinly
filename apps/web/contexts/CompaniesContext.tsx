import React, { useState, createContext, useContext } from "react";

import { WorkCompany, getCompanies } from "@ordinly/api-abstraction/companies";

import NotificationContext from "@contexts/NotificationContext";
import UserContext from "@contexts/UserContext";

const CompaniesContext = createContext<{
  companies: WorkCompany[];
  refreshCompanies?: () => void;
}>(null);

export default CompaniesContext;

export const CompaniesProvider = ({ children }) => {
  const { notification } = useContext(NotificationContext);
  const { user } = useContext(UserContext);

  const [companies, setCompanies] = useState([]);

  const refreshCompanies = async () => {
    try {
      if (user) {
        const response = await getCompanies();

        if ("error" in response) {
          throw response;
        } else {
          const { companies: newCompanies } = response;

          setCompanies(newCompanies);
        }
      }
    } catch ({ error }) {
      notification({
        variant: "error",
        title: "Unable to fetch companies",
        message: error,
      });
    }
  };

  return (
    <>
      <CompaniesContext.Provider value={{ refreshCompanies, companies }}>
        {children}
      </CompaniesContext.Provider>
    </>
  );
};
