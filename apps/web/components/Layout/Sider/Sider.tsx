import { useContext, useEffect } from "react";

import { useRouter } from "next/router";

import { useSpring, animated } from "@react-spring/web";

import { ProfilePicture } from "@components/ProfilePicture";

import NavigationContext from "@contexts/NavigationContext";
import UserContext from "@contexts/UserContext";
import CompaniesContext from "@contexts/CompaniesContext";

import styles from "./Sider.module.css";

import { SiderLink } from "./SiderLink";
import { AddNewCompanySlideout } from "@modules/companies/AddNewCompanySlideout";

const Sider = () => {
  const { navigation } = useContext(NavigationContext);
  const { user } = useContext(UserContext);
  const { companies, refreshCompanies } = useContext(CompaniesContext);

  const router = useRouter();

  const transition = useSpring({
    from: { x: -400 },
    to: { x: 0 },
  });

  useEffect(() => {
    (async () => {
      await refreshCompanies();
    })();
  }, [user]);

  const changeTopLevel = async ({ entity }) => {
    await router.push(`/my-work/${entity}`);
  };

  const openAddNewCompanySlideout = (companyId = undefined) => {
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        "add-new-company": true,
      },
    });
  };

  return (
    <animated.aside
      className={styles.sideNavigationContainer}
      style={transition}
    >
      <div className={styles.top}>
        <div className={styles.content}>
          <nav className={styles.companies}>
            <li
              title="Personal"
              className={`${styles.companyItem} ${
                router.pathname.split("/")[2] === "personal"
                  ? styles.active
                  : ""
              }`}
            >
              <ProfilePicture
                _id={user?._id}
                variant="user"
                size="small"
                onClick={() =>
                  !(router.pathname.split("/")[2] === "personal") &&
                  changeTopLevel({ entity: "personal" })
                }
              />
            </li>

            {companies.map(({ name, _id, active, profilePicture }) => (
              <li
                title={name}
                className={`${styles.addNew} ${styles.companyItem} ${
                  router.query.companyId === _id ? styles.active : ""
                }`}
                onClick={() => {
                  if (!(router.query.companyId === _id)) {
                    changeTopLevel({ entity: `companies/${_id}` });
                  }
                }}
              >
                {profilePicture ? (
                  <ProfilePicture _id={_id} variant="company" size="small" />
                ) : (
                  <div
                    className={`${styles.companyItem} ${
                      router.query.companyId === _id ? styles.active : ""
                    }`}
                  >
                    {name[0]}
                  </div>
                )}
              </li>
            ))}

            <li
              className={`${styles.addNew} ${styles.companyItem}`}
              onClick={() => openAddNewCompanySlideout()}
              title="Add new company"
            >
              +
            </li>
          </nav>

          <nav className={styles.navigation}>
            <ul className={styles.list}>
              {navigation?.map(({ href, title, icon }) => (
                <SiderLink key={href} href={href} title={title} icon={icon} />
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <AddNewCompanySlideout fetchData={refreshCompanies} />
    </animated.aside>
  );
};

export default Sider;
