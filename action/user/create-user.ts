"use server"

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

interface createUserInput {
  email: string;
  first_name?: string;
  last_name?: string;
  profile_image_url?: string;
  user_id: string;
  type: "CREATE" | "UPDATE"
}
export const CreateOrUpdateUser = async ({
  email,
  first_name,
  last_name,
  profile_image_url,
  user_id,
  type

}: createUserInput) => {
  try {

    let stripe_id = "";

    if (type == "CREATE") {
      const stripeAccount = await stripe.customers.create({
        email,
        name: `${first_name} ${last_name}`,
        metadata: {
          user_id: user_id,
          email,
        },

      });

      console.log("Stripe account created", stripeAccount);

      stripe_id = stripeAccount.id;
    }

    console.log("Creating user:", stripe_id);



    await db.user.upsert({
      where: { user_id },
      update: {
        email,
        name: `${first_name} ${last_name ?? ""}`,
        profile_image_url,
      },
      create: {
        email,
        name: `${first_name} ${last_name ?? ""}`,
        profile_image_url,
        user_id,
        stripeCustomerId: stripe_id.toString(),
      },
    });

    return {
      message: "User created",
    }

  }
  catch (error) {
    console.error("Error creating user", error);
    return { error: "Error creating user" };
  }

}
