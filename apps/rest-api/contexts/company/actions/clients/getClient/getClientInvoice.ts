import { Company } from "@db/restAPIConnection/schemas/Company";
import { Invoice } from "@db/restAPIConnection/schemas/Invoice";

import { getCompanyUserPermissions } from "@contexts/company/actions";

import type { APIResponse } from "@contexts/shared/types";

type GetClientInvoiceProps = {
  userId: string;
  clientId: string;
  companyId: string;
  invoiceId: string;
};

type GetClientInvoiceResponse = {
  invoice: {
    client: string;
    invoiceNumber: string;
    issueDate: Date;
    dueDate: Date;
    contact?: {
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
    contactId: string;
    key: string;
    projectId: string;
  };
};

export default async ({
  userId,
  companyId,
  clientId,
  invoiceId,
}: GetClientInvoiceProps): APIResponse<GetClientInvoiceResponse> => {
  try {
    const company = await Company.findOne({
      _id: companyId,
    });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const { permissions: userPermissions } = getCompanyUserPermissions({
      company,
      userId: userId,
    });

    console.log(userPermissions);

    const invoice = await Invoice.findOne({ clientId, _id: invoiceId });

    if (!invoice) {
      throw { status: 404, error: "Invoice not found" };
    }

    return {
      status: 200,
      message: "Invoice fetched",
      invoice: {
        client: invoice?.client,
        invoiceNumber: invoice?.invoiceNumber,
        issueDate: invoice?.issueDate,
        dueDate: invoice?.dueDate,
        contact: invoice?.contact,
        address: invoice.address,
        items: invoice.items,
        contactId: invoice.contactId,
        key: invoice.key,
        projectId: invoice.projectId,
      },
    };
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching your invoices",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
