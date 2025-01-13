"use server"

import { db } from "@/lib/db";

interface createUserInput {
  email: string;
  first_name?: string;
  last_name?: string;
  profile_image_url?: string;
  user_id: string;
}
export const CreateOrUpdateUser = async ({
  email,
  first_name,
  last_name,
  profile_image_url,
  user_id

}: createUserInput) => {
  try {

    await db.user.upsert({
      where: { user_id },
      update: {
        email,
        first_name,
        last_name,
        profile_image_url,
      },
      create: {
        email,
        first_name,
        last_name,
        profile_image_url,
        user_id,
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
