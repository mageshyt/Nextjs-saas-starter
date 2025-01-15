
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string(),
    WEBHOOK_SECRET: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
    CLERK_SECRET_KEY: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    BASE_URL: z.string(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string(),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
    NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC_MONTHLY: z.string(),
    NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC_YEARLY: z.string(),
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY: z.string(),
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_YEARLY: z.string(),
    
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC_MONTHLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC_MONTHLY,
    NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC_YEARLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC_YEARLY,
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY,
    NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_YEARLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_YEARLY,
    BASE_URL: process.env.BASE_URL,
  },
});
