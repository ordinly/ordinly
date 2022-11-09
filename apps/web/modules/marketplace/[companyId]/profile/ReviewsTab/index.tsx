import { RatingStars } from "@components/RatingStars";

import formatDate from "@util/formatDate";

import styles from "./ReviewsTab.module.css";

const ProgressBar = ({ percentage }) => (
  <div className={styles.outer}>
    <div className={styles.inner} style={{ width: `${percentage}%` }}></div>
  </div>
);

const ReviewsTab = ({ statistics = {}, reviews = [] }) => {
  return (
    <div className={styles.container}>
      {reviews.length ? (
        <>
          <div className={styles.statistics}>
            <ul>
              <li className={styles.listItem}>
                5 star <ProgressBar percentage={statistics[5]} />
                {statistics[5]}%
              </li>
              <li className={styles.listItem}>
                4 star <ProgressBar percentage={statistics[4]} />
                {statistics[4]}%
              </li>
              <li className={styles.listItem}>
                3 star <ProgressBar percentage={statistics[3]} />
                {statistics[3]}%
              </li>
              <li className={styles.listItem}>
                2 star <ProgressBar percentage={statistics[2]} />
                {statistics[2]}%
              </li>
              <li className={styles.listItem}>
                1 star <ProgressBar percentage={statistics[1]} />
                {statistics[1]}%
              </li>
            </ul>
          </div>

          <div className={styles.reviews}>
            {reviews.map(({ details, user, createdAt, rating }) => (
              <div className={styles.review}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewUserImage} />

                  <div>
                    <h4 className={styles.name}>
                      {user.name}{" "}
                      <span className={styles.date}>
                        ({formatDate(new Date(createdAt))})
                      </span>
                    </h4>

                    <RatingStars value={rating} disabled />
                  </div>
                </div>

                <p className={styles.details}>{details}</p>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ReviewsTab;
