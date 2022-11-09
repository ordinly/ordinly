import { useContext } from "react";

import { useRouter } from "next/router";

import CompanyContext from "@contexts/CompanyContext";
import CompaniesContext from "@contexts/CompaniesContext";
import NotificationContext from "@contexts/NotificationContext";

import { Modal } from "@components/Modal";

import { leaveCompany } from "@ordinly/api-abstraction/companies";

import styles from "./LeaveCompanyModal.module.css";

const LeaveCompanyModal = () => {
  const { refreshCompanies } = useContext(CompaniesContext);
  const { notification } = useContext(NotificationContext);
  const { company } = useContext(CompanyContext);

  const router = useRouter();

  const onClose = () => {
    const temp = { ...router.query };

    delete temp["leave-company-modal"];

    router.push({ pathname: router.pathname, query: temp });
  };

  const onLeaveCompany = async () => {
    try {
      await leaveCompany({ companyId: company?._id });

      await refreshCompanies();

      router.push({ pathname: "/my-work/personal" });
    } catch (caught) {
      const { error = "There was an error removing you from this company" } =
        caught || {};

      notification({
        variant: "error",
        title: "Error leaving company",
        message: error,
      });
    }
  };

  return (
    <Modal
      id="leave-company-modal"
      title="Leave company?"
      onClose={onClose}
      open={!!router?.query["leave-company-modal"]}
      actions={[
        {
          text: "Leave company",
          onClick: onLeaveCompany,
          variant: "danger",
        },
      ]}
    >
      <p className={styles.modalText}>
        Are you sure you want to leave{" "}
        <span className={styles.bold}>{company?.name}</span>?
      </p>
    </Modal>
  );
};

export default LeaveCompanyModal;
