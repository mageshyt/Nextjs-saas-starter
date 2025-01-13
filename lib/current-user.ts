"use server";

import { auth } from "@clerk/nextjs/server";
import { cache } from "react";
import { db } from "./db";

export const currentUserProfile = cache(async () => {
  try {
    const { userId } = await auth()
    console.log('userId', userId)
    if (!userId) {
      return null
    }

    const user = await db.user.findUnique({
      where: {
        user_id: userId
      }
    })

    return user

  }
  catch (error) {
    console.log(
      "[SERVER] CURRENT USER ERROR", error
    )
    return null
  }

});
