import { useEffect } from "react";

import { useRouter } from "next/router";

const CompanyBaseRoute = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.hasOwnProperty("companyId")) {
      router.replace({
        pathname: `/my-work/companies/[companyId]/overview`,
        query: router.query,
      });
    }
  }, [router.query]);
  return <></>;
};

export default CompanyBaseRoute;
