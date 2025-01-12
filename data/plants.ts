
 
export const plans = [
  {
    title: "Basic",
    monthlyPrice: 10,
    yearlyPrice: 100,
    description: "Essential features you need to get started",
    features: ["Example Feature Number 1", "Example Feature Number 2", "Example Feature Number 3"],
    priceIdMonthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
    priceIdYearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
    actionLabel: "Get Started",
  },
  {
    title: "Pro",
    monthlyPrice: 25,
    yearlyPrice: 250,
    description: "Perfect for owners of small & medium businessess",
    features: ["Example Feature Number 1", "Example Feature Number 2", "Example Feature Number 3"],
    actionLabel: "Get Started",
    priceIdMonthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
    priceIdYearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
    popular: true,
  },
  {
    title: "Enterprise",
    price: "Custom",
    description: "Dedicated support and infrastructure to fit your needs",
    features: ["Example Feature Number 1", "Example Feature Number 2", "Example Feature Number 3", "Super Exclusive Feature"],
    actionLabel: "Contact Sales",
    priceIdMonthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
    priceIdYearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
    exclusive: true,
  },
]
