import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Card } from "@components/Card";
import { ProfilePicture } from "@components/ProfilePicture";
import { Info } from "@components/Info";

import UserContext from "@contexts/UserContext";

import DetailsSlideout from "./DetailsSlideout";

import styles from "./DetailsCard.module.css";

const DetailsCard = () => {
  const { user } = useContext(UserContext);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const router = useRouter();

  useEffect(() => {
    setBackgroundImage(
      `url("http${
        process.env.NEXT_PUBLIC_NODE_ENV === "production" ? "s" : ""
      }://${window?.location.hostname}/api/user/${user?._id}/profile-picture")`
    );
  }, [user]);

  const openDetailsSlideout = async () => {
    await router.replace({
      pathname: router.pathname,
      query: { ...router.query, "update-account-details": true },
    });
  };

  return (
    <>
      <Card title="Account Details" onEditClick={openDetailsSlideout}>
        <div className={styles.infoContainer}>
          <ProfilePicture _id={user?._id} variant="user" />

          <Info
            data={{
              "Full name": user?.name,
              Email: user?.email,
            }}
          />
        </div>
      </Card>

      <DetailsSlideout />
    </>
  );
};

export default DetailsCard;
