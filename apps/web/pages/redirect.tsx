import { useEffect } from "react";

import { useRouter } from "next/router";

const Redirect = () => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("url")) {
      router.replace({
        pathname: localStorage.getItem("url"),
        query: Object.fromEntries(
          window.location.search
            .substring(1)
            .split("&")
            .reduce((total, current) => {
              const [key, value] = current.split("=");

              return [...total, [key, value]];
            }, [])
        ),
      });

      localStorage.removeItem("url");
    } else {
      router.replace({
        pathname: `/dashboard`,
      });
    }
  }, []);
  return <></>;
};

export default Redirect;
