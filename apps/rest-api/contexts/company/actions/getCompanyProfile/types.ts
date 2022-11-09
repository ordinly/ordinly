export type GetCompanyProfileProps = { companyId: string };

export type CompanyProfile = {
  _id: string;
  owner: string;
  name: string;
  description?: string;
  profilePicture: { key: string; name: string };
  emailAddress: string;
  phoneNumber: string;
  address: {
    country: string;
    region: string;
    city: string;
    postalCode: string;
    streetAddress: string;
  };
  team?: { name: string; role: string; description: string }[];
  projects?: { name: string; description: string; showcase: [] }[];
  priceBook?: {
    name: string;
    description: string;
    price: { from: number; to: string };
  }[];
  posts?: { title: string; text: string; attachments: [] }[];
  careers?: {
    title: string;
    description: string;
    payRange: { from: number; to: number };
  }[];
};
