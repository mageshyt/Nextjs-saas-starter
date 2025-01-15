const { PrismaClient } = require("@prisma/client");


const db = new PrismaClient();

async function main() {
    await db.subscriptionPlan.createMany({
        data: [
            {
                name: 'Basic Plan',
                description: 'Basic subscription plan',
                amount: 10,
                currency: 'USD',
                interval: 'MONTHLY',
            },
            {
                name: 'Pro Plan',
                description: 'Pro subscription plan with additional features',
                amount: 25,
                currency: 'USD',
                interval: 'MONTHLY',
            },
            {
                name: 'Basic Annual Plan',
                description: 'Basic Annual subscription plan with a discount',
                amount: 99.99,
                currency: 'USD',
                interval: 'YEARLY',
            },
            {
                name: 'Pro Annual Plan',
                description: 'Pro Annual subscription plan with additional features',
                amount: 249.99,
                currency: 'USD',
                interval: 'YEARLY',
            },
        ],
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });