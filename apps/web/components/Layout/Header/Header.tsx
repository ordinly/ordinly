import { useContext } from "react";

import Link from "next/link";

import { useRouter } from "next/router";

import UserContext from "@contexts/UserContext";

import { Button, ButtonWithMenu } from "@components/Button";

import { logout } from "@ordinly/api-abstraction/users";

import styles from "./Header.module.css";

import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const onLogin = () => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, login: true },
    });
  };

  const onSignUp = () => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, "sign-up": true },
    });
  };

  const onLogout = async () => {
    try {
      await logout();

      await setUser(undefined);

      router.push({
        pathname: "/landing",
        query: { form: "login", tab: "about" },
      });
    } catch (caught) {
      console.error(caught);
    }
  };

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <Link href="/landing">Ordinly</Link>
        </h1>

        <ul className={styles.list}>
          {user ? (
            <li
              className={`${styles.link} ${
                router.pathname.split("/")[1] === "my-work" ? styles.active : ""
              }`}
            >
              <Link href="/my-work/personal/dashboard">My work</Link>
            </li>
          ) : (
            <>
              <li
                className={`${styles.link} ${
                  router.pathname.includes("/features") ? styles.active : ""
                }`}
              >
                <Link href={"/landing/features"}>Features</Link>
              </li>
            </>
          )}

          <li
            className={`${styles.link} ${
              router.pathname.split("/")[1] === "marketplace"
                ? styles.active
                : ""
            }`}
          >
            <Link href="/marketplace">Marketplace</Link>
          </li>
        </ul>
      </div>

      <div>
        {user ? (
          <ButtonWithMenu
            icon="menu"
            onClick={() => {}}
            htmlTitle="menu"
            iconSize={15}
            menu={() => {
              return (
                <div className={styles.menu}>
                  <Button
                    variant="ghost"
                    text="View account"
                    onClick={() => router.push("/my-work/personal/account")}
                  />

                  <hr />

                  <Button
                    variant="ghost"
                    text="Log out"
                    icon="logout"
                    onClick={onLogout}
                  />
                </div>
              );
            }}
            buttonId="walkthrough-button"
            menuId="walkthrough-menu"
          />
        ) : (
          <div className="side-by-side">
            <Button text="Log In" onClick={onLogin} />
            <Button text="Sign Up" onClick={onSignUp} />
          </div>
        )}
      </div>

      <LoginModal />
      <SignUpModal />
    </header>
  );
};

export default Header;
