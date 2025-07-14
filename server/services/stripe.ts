import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function createCustomer(email: string, name?: string) {
  return await stripe.customers.create({
    email,
    name,
  });
}

export async function createSubscription(customerId: string, priceId: string) {
  return await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    expand: ['latest_invoice.payment_intent'],
  });
}

export async function handleWebhook(signature: string, body: any) {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  if (!endpointSecret) {
    throw new Error('Missing Stripe webhook secret');
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err) {
    throw new Error(`Webhook signature verification failed: ${err}`);
  }

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      const subscription = event.data.object;
      // Handle subscription updates
      break;
    case 'customer.subscription.deleted':
      // Handle subscription cancellation
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return { received: true };
}

export { stripe };
