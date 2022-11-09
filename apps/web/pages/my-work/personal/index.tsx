import { useEffect } from "react";

import { useRouter } from "next/router";

const PersonalBaseRoute = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace({
      pathname: `/my-work/personal/dashboard`,
      query: router.query,
    });
  }, []);

  return <></>;
};

export default PersonalBaseRoute;
