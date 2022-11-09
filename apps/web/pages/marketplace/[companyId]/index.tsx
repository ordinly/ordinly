import { useEffect } from "react";

import { useRouter } from "next/router";

const ProfileBaseRoute = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace({
      pathname: `/marketplace/[companyId]/profile`,
      query: router.query,
    });
  }, []);

  return <></>;
};

export default ProfileBaseRoute;
