export type RatingStarsProps = {
  numberOfReviews?: number;
  value: number;
  onChange?: (newValue: number) => void;
  disabled?: boolean;
  size?: number;
};
