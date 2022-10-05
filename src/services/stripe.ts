import Stripe from "stripe";
import packageInfo from "../../package.json";

const { version } = packageInfo;

export const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: "2022-08-01",
  appInfo: {
    name: "Ignews",
    version,
  },
});
