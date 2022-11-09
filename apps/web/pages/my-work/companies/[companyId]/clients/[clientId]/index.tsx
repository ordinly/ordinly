import { useEffect } from "react";

import { useRouter } from "next/router";

const ClientBaseRoute = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.hasOwnProperty("companyId")) {
      router.replace({
        pathname: `/my-work/companies/[companyId]/clients/[clientId]/overview`,
        query: router.query,
      });
    }
  }, [router.query]);
  return <></>;
};

export default ClientBaseRoute;
