import { useRouter } from "next/router";

import { RatingStars } from "@components/RatingStars";
import { Tag } from "@components/Tag";
import { ProfilePicture } from "@components/ProfilePicture";

import styles from "./CompanySearchTile.module.css";

import type { CompanySearchTileProps } from "./types";

const CompanySearchTile = (company: CompanySearchTileProps) => {
  const { _id, name, description, tags, rating } = company;

  const router = useRouter();

  const onTileClick = () => {
    router.push({
      pathname: "/marketplace/[companyId]",
      query: { companyId: _id },
    });
  };

  return (
    <div className={styles.container} onClick={onTileClick}>
      <div className={styles.tile}>
        <ProfilePicture _id={_id} size="large" />

        <div className={styles.info}>
          <h3 className={styles.title}>{name}</h3>

          <div className={styles.ratingContainer}>
            <RatingStars
              numberOfReviews={rating?.numberOfReviews}
              value={rating?.rating}
              disabled={true}
            />
          </div>

          <p className={styles.subtitle}>{description}</p>

          <div className={styles.tagsContainer}>
            {tags.map((label, index) => (
              <Tag id={`${name}-${label}-${index}`} label={label} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySearchTile;
