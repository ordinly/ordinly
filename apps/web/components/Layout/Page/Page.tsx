import { useTransition, animated } from "@react-spring/web";

import { useRouter } from "next/router";

import useScreenSize from "@hooks/useScreenSize";

import { CompaniesProvider } from "@contexts/CompaniesContext";

import { Header } from "../Header";
import { Sider } from "../Sider";
import { Footer } from "../Footer";

import styles from "./Page.module.css";

const Page = ({ children, withTopNav = true, withSideNav = true }) => {
  const router = useRouter();

  const { width, height } = useScreenSize();

  return (
    <CompaniesProvider>
      <div className={styles.pageContainer}>
        {withTopNav && <Header />}

        <div className={styles.contentContainer}>
          {withSideNav && width > 1000 ? <Sider /> : null}

          <main className={styles.main}>{children}</main>
        </div>

        {withTopNav && width <= 1000 ? <Footer /> : null}
      </div>
    </CompaniesProvider>
  );
};

export default Page;
