import { useEffect } from "react";

import { useRouter } from "next/router";

const ProjectBaseRoute = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.hasOwnProperty("companyId")) {
      router.replace({
        pathname: `/my-work/companies/[companyId]/clients/[clientId]/projects/[projectId]/overview`,
        query: router.query,
      });
    }
  }, [router.query]);
  return <></>;
};

export default ProjectBaseRoute;
