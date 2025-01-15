import { env } from "@/env";


export const plans = [
  {
    title: "Basic",
    monthlyPrice: 10,
    yearlyPrice: 100,
    description: "Essential features you need to get started",
    features: ["Example Feature Number 1", "Example Feature Number 2", "Example Feature Number 3"],
    priceIdMonthly: env.NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC_MONTHLY,
    priceIdYearly: env.NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC_YEARLY,
    actionLabel: "Get Started",
  },
  {
    title: "Pro",
    monthlyPrice: 25,
    yearlyPrice: 250,
    description: "Perfect for owners of small & medium businessess",
    features: ["Example Feature Number 1", "Example Feature Number 2", "Example Feature Number 3"],
    actionLabel: "Get Started",
    priceIdMonthly: env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY,
    priceIdYearly: env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_YEARLY,
    popular: true,
  },
  {
    title: "Enterprise",
    price: "Custom",
    description: "Dedicated support and infrastructure to fit your needs",
    features: ["Example Feature Number 1", "Example Feature Number 2", "Example Feature Number 3", "Super Exclusive Feature"],
    actionLabel: "Contact Sales",
    priceIdMonthly: env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY,
    priceIdYearly: env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_YEARLY,
    exclusive: true,
  },
]
