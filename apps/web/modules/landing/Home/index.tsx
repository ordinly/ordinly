import { useEffect, useContext } from "react";

import { useRouter } from "next/router";

import Header from "./Header";

import SignUp from "./SignUp";
import Login from "./Login";

import UserContext from "@contexts/UserContext";

import { persistentLogin } from "@ordinly/api-abstraction";

import styles from "./Home.module.css";

const Home = () => {
  const router = useRouter();

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      if (user) {
        router.replace("/my-work/personal/dashboard");
      } else {
        try {
          const { user: newUser } = await persistentLogin();

          if (newUser) {
            setUser(newUser);
          }
        } catch (caught) {
          setUser(null);
        }
      }
    })();
  }, [user]);

  useEffect(() => {
    const query = router.query;

    if (!query["tab"]) {
      query["tab"] = "about";
    }

    if (!query["form"]) {
      query["form"] = "sign-up";
    }

    router.push({
      pathname: router.pathname,
      query,
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />

        <div className={styles.page}></div>
      </div>

      {router.query["form"] === "sign-up" && <SignUp />}
      {router.query["form"] === "login" && <Login />}
    </div>
  );
};

export default Home;
