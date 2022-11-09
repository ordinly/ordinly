export type PDFDocument = PDFKit.PDFDocument;

export type InvoiceType = {
  name: string;
  client: string;
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  contactId?: string;
  taxRate?: number;
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
