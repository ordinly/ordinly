export type CompanySearchTileProps = {
  _id: string;
  name: string;
  description?: string;
  profilePicture?: { key: string; name: string };
  rating: { rating: number; numberOfReviews: number };
  tags: { label: string; color: string }[];
};
