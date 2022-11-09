import express from "express";

import { config } from "dotenv";

import { enableSubscription, missedPayment } from "@contexts/stripe/actions";

config();

const router = express.Router({ mergeParams: true });

//@ts-ignore - Req is not used, and doesn't need to be
router.route("/").post(async (req, res) => {
  try {
    const event = req.body;

    // Handle the event
    switch (event.type) {
      case "setup_intent.created":
        //const newSetupIntent = event.data.object;
        // Setup is created
        break;
      case "setup_intent.succeeded":
        //const successfulSetupIntent = event.data.object;
        // Setup is successful
        break;
      case "customer.created":
        //const newCustomer = event.data.object;
        // Customer is created
        break;
      case "customer.updated":
        //const updatedCustomer = event.data.object;
        // Customer is updated
        break;
      case "payment_method.attached":
        //const attachedPaymentMethod = event.data.object;
        // Payment method is attached
        break;
      case "invoice.created":
        //const createdInvoice = event.data.object;
        // Invoice is created
        break;
      case "invoice.finalized":
        //const finalizedInvoice = event.data.object;
        // Invoice is finalized
        break;
      case "invoice.payment_succeeded":
        //const successfulInvoice = event.data.object;
        // Invoice pyment has succeeded
        break;
      case "customer.subscription.created":
        const newCustomerSubscription = event.data.object;

        const {
          id: subscriptionId,
          customer: customerId,
          metadata: { companyId: newCustomerSubscriptionCompanyId },
        } = newCustomerSubscription;

        await enableSubscription({
          subscriptionId,
          customerId,
          companyId: newCustomerSubscriptionCompanyId,
        });

        // Payment is successful and the subscription is created.
        // You should provision the subscription and save the customer ID to your database.
        break;
      case "invoice.paid":
        //const successfulSubscriptionPayment = event.data.object;
        // Continue to provision the subscription as payments continue to be made.
        // Store the status in your database and check when a user accesses your service.
        // This approach helps you avoid hitting rate limits.
        //console.log("invoice.paid", successfulSubscriptionPayment);
        break;
      case "invoice.payment_failed":
        const failedSubscriptionPayment = event.data.object;

        const {
          metadata: { companyId: failedSubscriptionPaymentCompanyId },
        } = failedSubscriptionPayment;

        await missedPayment({
          companyId: failedSubscriptionPaymentCompanyId,
        });
        // The payment failed or the customer does not have a valid payment method.
        // The subscription becomes past_due. Notify your customer and send them to the
        // customer portal to update their payment information.

        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).send({ received: true });
  } catch (caught: any) {
    console.error(caught);
    const {
      status = 500,
      error = "We weren't able to complete this request",
    } = caught;

    res.status(status).send({ error });
  }
});

export { router };
