import Head from "next/head";
import Link from "next/link";

import { useRouter } from "next/router";

import { Button } from "@components/Button";

import styles from "./landing.module.css";

import UnderConstruction from "@assets/landing/general/under-construction.svg";
import QAEngineers from "@assets/landing/general/qa-engineers.svg";
import TeamUp from "@assets/landing/general/team-up.svg";
import WorkingFromAnywhere from "@assets/landing/general/working-from-anywhere.svg";

export default function Home() {
  const router = useRouter();

  const onSignUp = () => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, "sign-up": true },
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Ordinly</title>
      </Head>

      <section className={`${styles.section} ${styles.top}`}>
        <div className={styles.topContent}>
          <h1 className={styles.title}>
            Complex Projects.
            <br />
            Simple Management.
          </h1>

          <p className={styles.subtitle}>
            Join now to start managing you projects in a more intuitive way.
          </p>

          <Button text="Sign Up" size="large" onClick={onSignUp} />
        </div>

        <UnderConstruction />
      </section>

      <div className={styles.content}>
        <div className={styles.column}>
          <section className={styles.section}>
            <div>
              <h2 className={styles.header}>
                Start-to-Finish project management.
              </h2>

              <p className={styles.text}>
                From finding jobs to getting paid and everything in-between. We
                make it easy to manage your projects at every step of the
                process.
              </p>

              <div className={styles.learnMoreLink}>
                <Link href="/landing/features">Learn More</Link>
              </div>
            </div>

            <QAEngineers />
          </section>

          <section className={styles.section}>
            <div>
              <h2 className={styles.header}>Collaborate however you want.</h2>

              <p className={styles.text}>
                Not every company or project is the same, so why settle for a
                solution that doesn't fit your needs? Ordinly lets you organize
                your teams however you want.
              </p>

              <div className={styles.learnMoreLink}>
                <Link href="/landing/features">Learn More</Link>
              </div>
            </div>

            <TeamUp />
          </section>

          <section className={styles.section}>
            <div>
              <h2 className={styles.header}>Goes wherever you do.</h2>

              <p className={styles.text}>
                Built with on-the-go work in mind, we make sure that every
                feature we have on the desktop is available on every supported
                platform.
              </p>

              <div className={styles.learnMoreLink}>
                <Link href="/landing/features">Learn More</Link>
              </div>
            </div>

            <WorkingFromAnywhere />
          </section>
        </div>
      </div>
    </div>
  );
}
