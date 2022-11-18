export type PDFDocument = PDFKit.PDFDocument;

export type QuoteType = {
  name: string;
  isEstimate: boolean;
  client: string;
  quoteNumber: string;
  quoteDate: Date;
  contactId?: string;
  contact?: {
    _id: string;
    name: string;
    email?: string;
    phoneNumber?: string;
  };
  address: {
    country: string;
    region: string;
    city: string;
    postalCode: string;
    streetAddress: string;
  };
  items: {
    description: string;
    quantity: number;
    price: number;
    additionalNotes: string;
  }[];
};
