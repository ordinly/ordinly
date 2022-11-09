import { useState, createContext, useContext } from "react";

import { useRouter } from "next/router";

import NotificationContext from "@contexts/NotificationContext";

import { getCompany } from "@ordinly/api-abstraction/companies";

import type { Company, Permissions } from "@ordinly/api-abstraction/companies";

const CompanyContext = createContext<{
  company: any;
  fetchCompany: () => void;
  permissions: any | undefined;
}>(null);

export default CompanyContext;

export const CompanyProvider = ({ children }) => {
  const { notification } = useContext(NotificationContext);

  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState<Company>(null);
  const [permissions, setPermissions] = useState();

  const router = useRouter();

  const fetchCompany = async () => {
    try {
      if (!loading) {
        setLoading(true);

        if (router.query.companyId) {
          const response = await getCompany({
            companyId: router.query.companyId,
          });

          if ("company" in response) {
            setCompany(response.company);
            setPermissions(response.company.permissions);
          }
        }
      }
    } catch ({ error }) {
      notification({
        variant: "error",
        title: "Error fetching this company",
        message: error,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <CompanyContext.Provider value={{ company, fetchCompany, permissions }}>
      {children}
    </CompanyContext.Provider>
  );
};
